document.addEventListener("DOMContentLoaded", () => {
  const postDetailContainer = document.getElementById("post-detail-container")
  const shareModal = document.getElementById("share-modal")
  const shareModalClose = document.getElementById("share-modal-close")
  const copyLinkButton = document.getElementById("copy-link")
  const shareSearchInput = document.getElementById("share-search-input")
  const shareContacts = document.getElementById("share-contacts")

  // Add CSS styles for post detail layout
  const styleElement = document.createElement("style")
  styleElement.textContent = `
    .post-detail {
      display: flex;
      max-width: 935px;
      margin: 0 auto;
      border: 1px solid var(--border);
      background-color: var(--bg-primary);
      border-radius: 3px;
    }
    
    .post-detail-image {
      flex: 0 0 60%;
      max-width: 60%;
      background-color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .post-detail-image img {
      width: 100%;
      height: auto;
      object-fit: contain;
      max-height: 600px;
    }
    
    .post-detail-content {
      flex: 0 0 40%;
      max-width: 40%;
      display: flex;
      flex-direction: column;
      border-left: 1px solid var(--border);
    }
    
    .post-detail-header {
      padding: 16px;
      border-bottom: 1px solid var(--border);
    }
    
    .post-detail-comments-wrapper {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    
    .post-detail-comments {
      height: 100%;
      overflow-y: auto;
      padding: 16px;
    }
    
    .post-detail-actions {
      padding: 8px 16px;
      border-top: 1px solid var(--border);
    }
    
    .post-add-comment {
      padding: 16px;
      border-top: 1px solid var(--border);
    }
    
    /* Mobile styles */
    @media (max-width: 767px) {
      .post-detail {
        flex-direction: column;
      }
      
      .post-detail-image, .post-detail-content {
        flex: 0 0 100%;
        max-width: 100%;
        border-left: none;
      }
      
      .post-detail-comments-wrapper {
        display: none;
      }
      
      .post-detail-comments {
        max-height: none;
      }
      
      .comment-item {
        margin-bottom: 16px;
      }
      
      /* Show comments in modal on mobile */
      .modal.open .post-detail-comments-wrapper {
        display: block;
      }
    }
  `
  document.head.appendChild(styleElement)

  const post = {
    id: 1,
    username: "johndoe",
    userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    location: "New York",
    image: "https://placehold.co/400",
    likes: 100,
    timestamp: "2 hours ago",
    caption: "This is a sample post.",
    comments: [
      {
        username: "janedoe",
        userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        text: "Great post!",
        timestamp: "1 hour ago",
        likes: 5,
      },
      {
        username: "peterpan",
        userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        text: "I agree!",
        timestamp: "30 minutes ago",
        likes: 2,
      },
    ],
    isLiked: false,
    isSaved: true,
  }

  function renderPostDetail() {
    postDetailContainer.innerHTML = `
      <div class="post-detail">
        <div class="post-detail-image">
          <img src="${post.image}" alt="Post" onerror="this.src='https://placehold.co/400'">
        </div>
        <div class="post-detail-content">
          <div class="post-detail-header">
            <div class="post-user">
              <a href="profile.html?username=${post.username}" class="post-avatar">
                <img src="${post.userImage}" alt="${post.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
              </a>
              <div>
                <a href="profile.html?username=${post.username}" class="post-username">${post.username}</a>
                ${post.location ? `<span class="post-location">${post.location}</span>` : ""}
              </div>
            </div>
            <button class="post-more"><i class="fas fa-ellipsis-h"></i></button>
          </div>
          
          <div class="post-detail-comments-wrapper">
            <div class="post-detail-comments" id="post-comments">
              <!-- Post caption -->
              <div class="comment-item">
                <div class="comment-avatar">
                  <img src="${post.userImage}" alt="${post.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
                </div>
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-username">${post.username}</span>
                    <span class="comment-time">${post.timestamp}</span>
                  </div>
                  <p class="comment-text">${post.caption}</p>
                </div>
              </div>
              
              <!-- Comments -->
              ${
                post.comments && post.comments.length > 0
                  ? post.comments
                      .map(
                        (comment) => `
                  <div class="comment-item">
                    <div class="comment-avatar">
                      <img src="${comment.userImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}" alt="${comment.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
                    </div>
                    <div class="comment-content">
                      <div class="comment-header">
                        <span class="comment-username">${comment.username}</span>
                        <span class="comment-time">${comment.timestamp || "Just now"}</span>
                      </div>
                      <p class="comment-text">${comment.text}</p>
                      <div class="comment-actions">
                        <button class="comment-action">Reply</button>
                        <span class="comment-likes">${comment.likes || 0} likes</span>
                      </div>
                    </div>
                  </div>
                `,
                      )
                      .join("")
                  : '<div class="no-comments">No comments yet</div>'
              }
            </div>
          </div>
          
          <div class="post-detail-actions">
            <div class="post-actions">
              <div class="post-actions-left">
                <button class="post-action ${post.isLiked ? "liked" : ""}" data-action="like">
                  <i class="${post.isLiked ? "fas" : "far"} fa-heart"></i>
                </button>
                <button class="post-action" data-action="comment">
                  <i class="far fa-comment"></i>
                </button>
                <button class="post-action" data-action="share" id="share-button">
                  <i class="far fa-paper-plane"></i>
                </button>
              </div>
              <button class="post-action ${post.isSaved ? "liked" : ""}" data-action="save">
                <i class="${post.isSaved ? "fas" : "far"} fa-bookmark"></i>
              </button>
            </div>
            
            <div class="post-likes">
              ${post.likes} likes
            </div>
            
            <div class="post-time">
              ${post.timestamp}
            </div>
          </div>
          
          <div class="post-add-comment">
            <input type="text" placeholder="Add a comment..." id="comment-input">
            <button id="post-comment-btn">Post</button>
          </div>
        </div>
      </div>
    `

    // Add event listeners
    setupEventListeners()
  }

  function setupEventListeners() {
    // Like button
    const likeButton = postDetailContainer.querySelector('[data-action="like"]')
    if (likeButton) {
      likeButton.addEventListener("click", function () {
        const icon = this.querySelector("i")

        if (icon.classList.contains("far")) {
          icon.classList.replace("far", "fas")
          this.classList.add("liked")
          post.isLiked = true
          post.likes++
        } else {
          icon.classList.replace("fas", "far")
          this.classList.remove("liked")
          post.isLiked = false
          post.likes--
        }

        // Update likes count
        postDetailContainer.querySelector(".post-likes").textContent = `${post.likes} likes`
      })
    }

    // Save button
    const saveButton = postDetailContainer.querySelector('[data-action="save"]')
    if (saveButton) {
      saveButton.addEventListener("click", function () {
        const icon = this.querySelector("i")

        if (icon.classList.contains("far")) {
          icon.classList.replace("far", "fas")
          this.classList.add("liked")
          post.isSaved = true
        } else {
          icon.classList.replace("fas", "far")
          this.classList.remove("liked")
          post.isSaved = false
        }
      })
    }

    // Comment button
    const commentButton = postDetailContainer.querySelector('[data-action="comment"]')
    if (commentButton) {
      commentButton.addEventListener("click", () => {
        if (window.innerWidth <= 767) {
          openMobileCommentsModal()
        } else {
          document.getElementById("comment-input").focus()
        }
      })
    }

    // Share button
    const shareButton = document.getElementById("share-button")
    if (shareButton) {
      shareButton.addEventListener("click", () => {
        // Placeholder for openShareModal function
        alert("Share functionality is not implemented yet.")
      })
    }

    // Add comment
    const commentInput = document.getElementById("comment-input")
    const postCommentBtn = document.getElementById("post-comment-btn")

    if (commentInput && postCommentBtn) {
      postCommentBtn.addEventListener("click", () => {
        addComment(commentInput.value)
      })

      commentInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          addComment(this.value)
        }
      })
    }

    // Setup mobile view
    setupMobileView()
  }

  function addComment(text) {
    if (!text.trim()) return

    // Create new comment
    const newComment = {
      username: "username", // Current user
      userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      text: text.trim(),
      timestamp: "Just now",
      likes: 0,
    }

    // Add to post comments
    if (!post.comments) {
      post.comments = []
    }
    post.comments.push(newComment)

    // Add to DOM
    const commentsContainer = document.getElementById("post-comments")

    // Remove "no comments" message if it exists
    const noComments = commentsContainer.querySelector(".no-comments")
    if (noComments) {
      noComments.remove()
    }

    // Create comment element
    const commentElement = document.createElement("div")
    commentElement.className = "comment-item"
    commentElement.innerHTML = `
      <div class="comment-avatar">
        <img src="${newComment.userImage}" alt="${newComment.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
      </div>
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-username">${newComment.username}</span>
          <span class="comment-time">${newComment.timestamp}</span>
        </div>
        <p class="comment-text">${newComment.text}</p>
        <div class="comment-actions">
          <button class="comment-action">Reply</button>
          <span class="comment-likes">${newComment.likes} likes</span>
        </div>
      </div>
    `

    // Add to container
    commentsContainer.appendChild(commentElement)

    // Scroll to the new comment
    commentsContainer.scrollTop = commentsContainer.scrollHeight

    // Clear input
    document.getElementById("comment-input").value = ""
  }

  // Add this function after the setupEventListeners function
  function setupMobileView() {
    // Check if we're on mobile
    if (window.innerWidth <= 767) {
      // Create comments modal for mobile if it doesn't exist
      if (!document.getElementById("mobile-comments-modal")) {
        const mobileCommentsModal = document.createElement("div")
        mobileCommentsModal.id = "mobile-comments-modal"
        mobileCommentsModal.className = "modal"
        mobileCommentsModal.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h2>Comments</h2>
              <button class="modal-close" id="mobile-comments-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" id="mobile-comments-container">
              <!-- Comments will be loaded here -->
            </div>
          </div>
        `
        document.body.appendChild(mobileCommentsModal)

        // Add event listener to close button
        document.getElementById("mobile-comments-close").addEventListener("click", () => {
          mobileCommentsModal.classList.remove("open")
          document.body.classList.remove("modal-open")
        })

        // Close when clicking outside
        mobileCommentsModal.addEventListener("click", (e) => {
          if (e.target === mobileCommentsModal) {
            mobileCommentsModal.classList.remove("open")
            document.body.classList.remove("modal-open")
          }
        })
      }

      // Update comment button to open modal on mobile
      const commentButton = document.querySelector('[data-action="comment"]')
      if (commentButton) {
        commentButton.addEventListener("click", openMobileCommentsModal)
      }
    }
  }

  // Add this function to open mobile comments modal
  function openMobileCommentsModal() {
    if (window.innerWidth > 767) return

    const mobileCommentsModal = document.getElementById("mobile-comments-modal")
    const mobileCommentsContainer = document.getElementById("mobile-comments-container")

    if (!mobileCommentsModal || !mobileCommentsContainer) return

    // Clone comments from post detail
    const commentsContent = document.getElementById("post-comments").cloneNode(true)

    // Clear container and add comments
    mobileCommentsContainer.innerHTML = ""
    mobileCommentsContainer.appendChild(commentsContent)

    // Show modal
    mobileCommentsModal.classList.add("open")
    document.body.classList.add("modal-open")
  }

  // Add window resize listener to handle responsive layout
  window.addEventListener("resize", setupMobileView)

  // Initialize
  renderPostDetail()
  setupMobileView()
})

