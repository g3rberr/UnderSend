// Feed functionality
document.addEventListener("DOMContentLoaded", () => {
  const feedContainer = document.getElementById("feed-container");
  
  // Если элемент feed-container не существует на странице, прекращаем выполнение скрипта
  if (!feedContainer) {
    return; // Выходим из функции, если элемент не найден
  }
  
  const commentsModal = document.getElementById("comments-modal");
  const commentsContainer = document.getElementById("comments-container");
  const commentInput = document.getElementById("comment-input");
  const postCommentBtn = document.getElementById("post-comment-btn");

  // Добавляем модальное окно для функции "поделиться"
  const shareModalHTML = `
    <div class="modal" id="share-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Share Post</h2>
          <button class="modal-close" id="share-modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="share-options">
            <div class="share-option" id="copy-link">
              <div class="share-icon">
                <i class="fas fa-link"></i>
              </div>
              <span>Copy Link</span>
            </div>
            <div class="share-option">
              <div class="share-icon">
                <i class="fab fa-facebook"></i>
              </div>
              <span>Facebook</span>
            </div>
            <div class="share-option">
              <div class="share-icon">
                <i class="fab fa-twitter"></i>
              </div>
              <span>Twitter</span>
            </div>
            <div class="share-option">
              <div class="share-icon">
                <i class="fab fa-whatsapp"></i>
              </div>
              <span>WhatsApp</span>
            </div>
            <div class="share-option">
              <div class="share-icon">
                <i class="fab fa-telegram"></i>
              </div>
              <span>Telegram</span>
            </div>
          </div>
          
          <div class="share-divider">
            <span>or send to</span>
          </div>
          
          <div class="share-search">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search..." id="share-search-input">
          </div>
          
          <div class="share-contacts" id="share-contacts">
            <!-- Contacts will be loaded dynamically -->
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Добавляем модальное окно в DOM, если его еще нет
  if (!document.getElementById("share-modal")) {
    document.body.insertAdjacentHTML("beforeend", shareModalHTML);
  }
  
  // Получаем ссылки на элементы модального окна
  const shareModal = document.getElementById("share-modal");
  const shareModalClose = document.getElementById("share-modal-close");
  const copyLinkButton = document.getElementById("copy-link");
  const shareSearchInput = document.getElementById("share-search-input");
  const shareContacts = document.getElementById("share-contacts");

  let currentPostId = null;

  // Sample posts data (replace with your actual data source)
  const posts = window.posts || [
    {
      id: 1,
      username: "john_doe",
      userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      location: "New York",
      image: "https://placehold.co/400",
      likes: 150,
      isLiked: false,
      isSaved: false,
      caption: "Enjoying the city views!",
      comments: [
        { username: "jane_doe", text: "Awesome shot!" },
        { username: "peter_pan", text: "I love New York!" },
      ],
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      username: "jane_doe",
      userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      location: "Paris",
      image: "https://placehold.co/400",
      likes: 200,
      isLiked: true,
      isSaved: true,
      caption: "Bonjour from Paris!",
      comments: [{ username: "john_doe", text: "Beautiful!" }],
      timestamp: "1 day ago",
    },
  ];

  // Render posts in the feed
  function renderFeed() {
    feedContainer.innerHTML = "";

    posts.forEach((post) => {
      const postElement = createPostElement(post);
      feedContainer.appendChild(postElement);
    });
  }

  // Create a post element
  function createPostElement(post) {
    const postElement = document.createElement("article");
    postElement.className = "post";

    // Post header
    const postHeader = document.createElement("div");
    postHeader.className = "post-header";
    postHeader.innerHTML = `
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
    `;

    // Post image
    const postImage = document.createElement("div");
    postImage.className = "post-image";
    postImage.innerHTML = `<a href="post-detail.html?id=${post.id}"><img src="${post.image}" alt="Post content" onerror="this.src='https://placehold.co/400'"></a>`;

    // Post actions
    const postActions = document.createElement("div");
    postActions.className = "post-actions";
    postActions.innerHTML = `
      <div class="post-actions-left">
        <button class="post-action ${post.isLiked ? "liked" : ""}" data-post-id="${post.id}" data-action="like">
          <i class="${post.isLiked ? "fas" : "far"} fa-heart"></i>
        </button>
        <button class="post-action" data-post-id="${post.id}" data-action="comment">
          <i class="far fa-comment"></i>
        </button>
        <button class="post-action" data-post-id="${post.id}" data-action="share">
          <i class="far fa-paper-plane"></i>
        </button>
      </div>
      <button class="post-action ${post.isSaved ? "liked" : ""}" data-post-id="${post.id}" data-action="save">
        <i class="${post.isSaved ? "fas" : "far"} fa-bookmark"></i>
      </button>
    `;

    // Post likes
    const postLikes = document.createElement("div");
    postLikes.className = "post-likes";
    postLikes.textContent = `${post.likes} likes`;

    // Post caption
    const postCaption = document.createElement("div");
    postCaption.className = "post-caption";
    postCaption.innerHTML = `
      <a href="profile.html?username=${post.username}" class="post-username">${post.username}</a>
      <span>${post.caption}</span>
    `;

    // Post comments
    const postComments = document.createElement("div");
    postComments.className = "post-comments-preview";

    if (post.comments && post.comments.length > 0) {
      let commentsHTML = "";

      if (post.comments.length > 1) {
        commentsHTML += `<button class="view-comments" data-post-id="${post.id}">View all ${post.comments.length} comments</button>`;
      }

      post.comments.slice(0, 1).forEach((comment) => {
        commentsHTML += `
          <div class="post-comment">
            <a href="profile.html?username=${comment.username}" class="post-username">${comment.username}</a>
            <span>${comment.text}</span>
          </div>
        `;
      });

      postComments.innerHTML = commentsHTML;
    }

    // Post time
    const postTime = document.createElement("div");
    postTime.className = "post-time";
    postTime.textContent = post.timestamp;

    // Post add comment
    const postAddComment = document.createElement("div");
    postAddComment.className = "post-add-comment";
    postAddComment.innerHTML = `
      <input type="text" placeholder="Add a comment...">
      <button>Post</button>
    `;

    // Append all elements to post
    postElement.appendChild(postHeader);
    postElement.appendChild(postImage);
    postElement.appendChild(postActions);
    postElement.appendChild(postLikes);
    postElement.appendChild(postCaption);
    postElement.appendChild(postComments);
    postElement.appendChild(postTime);
    postElement.appendChild(postAddComment);

    return postElement;
  }

  // Open comments modal
  function openCommentsModal(postId) {
    // Проверяем, существует ли модальное окно комментариев
    if (!commentsModal || !commentsContainer) return;
    
    currentPostId = postId;
    const post = posts.find((p) => p.id === postId);

    if (!post) return;

    commentsContainer.innerHTML = "";

    // Add post caption as first comment
    const captionComment = document.createElement("div");
    captionComment.className = "comment-item";
    captionComment.innerHTML = `
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
    `;
    commentsContainer.appendChild(captionComment);

    // Add separator
    const separator = document.createElement("hr");
    separator.style.margin = "15px 0";
    separator.style.borderColor = "var(--border)";
    commentsContainer.appendChild(separator);

    // Add all comments
    if (post.comments && post.comments.length > 0) {
      post.comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.className = "comment-item";
        commentElement.innerHTML = `
          <div class="comment-avatar">
            <img src="${comment.userImage || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}" alt="${comment.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-username">${comment.username}</span>
              <span class="comment-time">${comment.timestamp || 'Just now'}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
            <div class="comment-actions">
              <button class="comment-action">Reply</button>
              <span class="comment-likes">${comment.likes || 0} likes</span>
            </div>
          </div>
        `;
        commentsContainer.appendChild(commentElement);
      });
    }

    // Show modal
    commentsModal.classList.add("open");
    document.body.classList.add("modal-open");

    // Clear input
    if (commentInput) {
      commentInput.value = "";

      // Focus input
      setTimeout(() => {
        commentInput.focus();
      }, 100);
    }
  }

  // Close comments modal
  function closeCommentsModal() {
    if (!commentsModal) return;
    
    commentsModal.classList.remove("open");
    document.body.classList.remove("modal-open");
    currentPostId = null;
  }

  // Open share modal
  function openShareModal(postId) {
    currentPostId = postId;
    const post = posts.find((p) => p.id === postId);
    
    if (!post) return;
    
    // Load contacts
    loadShareContacts();
    
    // Show modal
    shareModal.classList.add("open");
    document.body.classList.add("modal-open");
  }
  
  // Close share modal
  function closeShareModal() {
    shareModal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
  
  // Load share contacts
  function loadShareContacts() {
    // Get contacts from chats
    const contacts = window.chats || [];
    
    // Clear contacts container
    shareContacts.innerHTML = "";
    
    // Add contacts
    contacts.forEach(contact => {
      const contactElement = document.createElement("div");
      contactElement.className = "share-contact";
      contactElement.innerHTML = `
        <div class="share-contact-avatar">
          <img src="${contact.avatar}" alt="${contact.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
        </div>
        <div class="share-contact-info">
          <span class="share-contact-name">${contact.username}</span>
        </div>
        <button class="btn btn-primary btn-sm share-contact-btn">Send</button>
      `;
      
      // Add event listener to send button
      const sendButton = contactElement.querySelector(".share-contact-btn");
      sendButton.addEventListener("click", function() {
        // In a real app, this would send the post to the contact
        // For demo purposes, we'll just show a notification
        showNotification(`Post shared with ${contact.username}`);
        
        // Update button
        this.textContent = "Sent";
        this.disabled = true;
      });
      
      // Add to container
      shareContacts.appendChild(contactElement);
    });
  }
  
  // Filter contacts
  function filterContacts(query) {
    const contacts = shareContacts.querySelectorAll(".share-contact");
    
    contacts.forEach(contact => {
      const name = contact.querySelector(".share-contact-name").textContent.toLowerCase();
      
      if (name.includes(query.toLowerCase())) {
        contact.style.display = "flex";
      } else {
        contact.style.display = "none";
      }
    });
  }
  
  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      
      // Remove from DOM after animation
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Copy link to clipboard
  function copyLinkToClipboard() {
    const post = posts.find((p) => p.id === currentPostId);
    if (!post) return;
    
    const postUrl = `${window.location.origin}/post-detail.html?id=${currentPostId}`;
    
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = postUrl;
    document.body.appendChild(tempInput);
    
    // Select and copy
    tempInput.select();
    document.execCommand("copy");
    
    // Remove the temporary input
    document.body.removeChild(tempInput);
    
    // Show notification
    showNotification("Link copied to clipboard");
  }

  // Add a new comment
  function addComment(text) {
    if (!currentPostId || !text.trim()) return;

    const post = posts.find((p) => p.id === currentPostId);
    if (!post) return;

    // Create new comment
    const newComment = {
      id: post.comments ? post.comments.length + 1 : 1,
      username: "username", // Current user
      userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      text: text.trim(),
      timestamp: "Just now",
      likes: 0,
    };

    // Add to post comments
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(newComment);

    // Add to modal
    if (commentsContainer) {
      const commentElement = document.createElement("div");
      commentElement.className = "comment-item";
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
      `;
      commentsContainer.appendChild(commentElement);

      // Scroll to bottom
      commentsContainer.scrollTop = commentsContainer.scrollHeight;
    }

    // Clear input
    if (commentInput) {
      commentInput.value = "";
    }

    // Update feed
    renderFeed();
  }

  // Initialize feed
  renderFeed();

  // Add event listeners for like and save buttons
  feedContainer.addEventListener("click", (event) => {
    const target = event.target.closest(".post-action");
    if (target) {
      const postId = Number(target.dataset.postId);
      const action = target.dataset.action;

      if (action === "like") {
        const post = posts.find((p) => p.id === postId);
        if (post) {
          post.isLiked = !post.isLiked;
          post.likes += post.isLiked ? 1 : -1;
          renderFeed();
        }
      } else if (action === "save") {
        const post = posts.find((p) => p.id === postId);
        if (post) {
          post.isSaved = !post.isSaved;
          renderFeed();
        }
      } else if (action === "comment") {
        openCommentsModal(postId);
      } else if (action === "share") {
        openShareModal(postId);
      }
    }

    // Check for view comments button
    const viewCommentsBtn = event.target.closest(".view-comments");
    if (viewCommentsBtn) {
      const postId = Number(viewCommentsBtn.dataset.postId);
      openCommentsModal(postId);
    }
  });

  // Проверяем существование элементов перед добавлением обработчиков событий
  if (commentsModal) {
    // Close modal when clicking the close button
    const modalCloseBtn = document.querySelector(".modal-close");
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeCommentsModal);
    }

    // Close modal when clicking outside the content
    commentsModal.addEventListener("click", (event) => {
      if (event.target === commentsModal) {
        closeCommentsModal();
      }
    });
  }

  // Post comment button
  if (postCommentBtn && commentInput) {
    postCommentBtn.addEventListener("click", () => {
      addComment(commentInput.value);
    });

    // Post comment on Enter
    commentInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        addComment(commentInput.value);
      }
    });
  }
  
  // Share modal event listeners
  if (shareModal) {
    // Close modal when clicking the close button
    if (shareModalClose) {
      shareModalClose.addEventListener("click", closeShareModal);
    }
    
    // Close modal when clicking outside the content
    shareModal.addEventListener("click", function(e) {
      if (e.target === this) {
        closeShareModal();
      }
    });
    
    // Copy link button
    if (copyLinkButton) {
      copyLinkButton.addEventListener("click", copyLinkToClipboard);
    }
    
    // Search input
    if (shareSearchInput) {
      shareSearchInput.addEventListener("input", function() {
        filterContacts(this.value);
      });
    }
  }
});