// User profile functionality
document.addEventListener("DOMContentLoaded", () => {
  const followBtn = document.getElementById("follow-btn");
  const messageBtn = document.getElementById("message-btn");
  const profileUsername = document.getElementById("profile-username");
  const profileName = document.getElementById("profile-name");
  const profileBio = document.getElementById("profile-bio");
  const profileWebsite = document.getElementById("profile-website");
  const profileImage = document.getElementById("profile-image");
  const postsCount = document.getElementById("posts-count");
  const followersCount = document.getElementById("followers-count");
  const followingCount = document.getElementById("following-count");
  const postsGrid = document.getElementById("posts-grid");
  const reelsGrid = document.getElementById("reels-grid");
  const taggedGrid = document.getElementById("tagged-grid");
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".profile-tab-content");
  
  // Get username from URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username") || "john_doe";
  
  // Sample user data
  const userData = {
    username: username,
    name: "John Doe",
    bio: "Photographer | Traveler | Coffee Enthusiast",
    website: "johndoe.com",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    postsCount: 42,
    followersCount: 1200,
    followingCount: 567,
    isFollowing: false
  };
  
  // Sample posts data
  const posts = [];
  for (let i = 1; i <= 12; i++) {
    posts.push({
      id: i,
      image: "https://placehold.co/400",
      likes: Math.floor(Math.random() * 1000) + 50,
      comments: Math.floor(Math.random() * 100) + 5
    });
  }
  
  // Sample reels data
  const reels = [];
  for (let i = 1; i <= 6; i++) {
    reels.push({
      id: i,
      image: "https://placehold.co/400",
      views: Math.floor(Math.random() * 10000) + 1000
    });
  }
  
  // Sample tagged posts data
  const taggedPosts = [];
  for (let i = 1; i <= 9; i++) {
    taggedPosts.push({
      id: i,
      image: "https://placehold.co/400",
      likes: Math.floor(Math.random() * 500) + 20
    });
  }
  
  // Update profile information
  function updateProfileInfo() {
    profileUsername.textContent = userData.username;
    profileName.textContent = userData.name;
    profileBio.textContent = userData.bio;
    profileWebsite.textContent = userData.website;
    profileWebsite.href = userData.website.startsWith("http") ? userData.website : `https://${userData.website}`;
    profileImage.src = userData.avatar;
    postsCount.textContent = userData.postsCount;
    followersCount.textContent = formatCount(userData.followersCount);
    followingCount.textContent = formatCount(userData.followingCount);
    document.title = `${userData.username} - Deepsend`;
    
    // Update follow button
    if (userData.isFollowing) {
      followBtn.textContent = "Following";
      followBtn.classList.remove("btn-primary");
      followBtn.classList.add("btn-outline");
    } else {
      followBtn.textContent = "Follow";
      followBtn.classList.add("btn-primary");
      followBtn.classList.remove("btn-outline");
    }
  }
  
  // Format count (e.g. 1200 -> 1.2K)
  function formatCount(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return count.toString();
  }
  
  // Render posts
  function renderPosts() {
    postsGrid.innerHTML = "";
    
    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = "profile-post";
      postElement.innerHTML = `
        <a href="post-detail.html?id=${post.id}">
          <img src="${post.image}" alt="Post" onerror="this.src='https://placehold.co/400'">
          <div class="profile-post-overlay">
            <div class="profile-post-likes">
              <i class="fas fa-heart"></i> ${post.likes}
              <i class="fas fa-comment" style="margin-left: 15px;"></i> ${post.comments}
            </div>
          </div>
        </a>
      `;
      
      postsGrid.appendChild(postElement);
    });
  }
  
  // Render reels
  function renderReels() {
    reelsGrid.innerHTML = "";
    
    reels.forEach(reel => {
      const reelElement = document.createElement("div");
      reelElement.className = "profile-post";
      reelElement.innerHTML = `
        <a href="reel-detail.html?id=${reel.id}">
          <img src="${reel.image}" alt="Reel" onerror="this.src='https://placehold.co/400'">
          <div class="profile-post-overlay">
            <div class="profile-post-likes">
              <i class="fas fa-play"></i> ${formatCount(reel.views)}
            </div>
          </div>
          <div class="reel-indicator">
            <i class="fas fa-film"></i>
          </div>
        </a>
      `;
      
      reelsGrid.appendChild(reelElement);
    });
  }
  
  // Render tagged posts
  function renderTaggedPosts() {
    taggedGrid.innerHTML = "";
    
    taggedPosts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = "profile-post";
      postElement.innerHTML = `
        <a href="post-detail.html?id=${post.id}">
          <img src="${post.image}" alt="Tagged Post" onerror="this.src='https://placehold.co/400'">
          <div class="profile-post-overlay">
            <div class="profile-post-likes">
              <i class="fas fa-heart"></i> ${post.likes}
            </div>
          </div>
        </a>
      `;
      
      taggedGrid.appendChild(postElement);
    });
  }
  
  // Handle follow button click
  followBtn.addEventListener("click", function() {
    userData.isFollowing = !userData.isFollowing;
    
    if (userData.isFollowing) {
      userData.followersCount++;
      showNotification(`You are now following ${userData.username}`);
    } else {
      userData.followersCount--;
      showNotification(`You unfollowed ${userData.username}`);
    }
    
    updateProfileInfo();
  });
  
  // Handle message button click
  messageBtn.addEventListener("click", function() {
    window.location.href = `messages.html?username=${userData.username}`;
  });
  
  // Handle tab clicks
  tabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove("active"));
      
      // Add active class to clicked tab
      this.classList.add("active");
      
      // Hide all tab contents
      tabContents.forEach(content => {
        content.style.display = "none";
      });
      
      // Show selected tab content
      const tabName = this.getAttribute("data-tab");
      document.getElementById(`${tabName}-content`).style.display = "block";
      
      // Update URL hash
      window.location.hash = tabName;
    });
  });
  
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
  
  // Initialize
  updateProfileInfo();
  renderPosts();
  renderReels();
  renderTaggedPosts();
  
  // Set active tab based on URL hash
  const hash = window.location.hash.substring(1);
  if (hash) {
    const activeTab = document.querySelector(`.tab[data-tab="${hash}"]`);
    if (activeTab) {
      activeTab.click();
    }
  }
  
  // Add notification and reel indicator styles if not already present
  if (!document.querySelector('style#profile-styles')) {
    const profileStyles = document.createElement('style');
    profileStyles.id = 'profile-styles';
    profileStyles.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--card);
        color: var(--foreground);
        padding: 12px 20px;
        border-radius: 30px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        transform: translate(-50%, 20px);
      }
      
      .notification.show {
        opacity: 1;
        transform: translate(-50%, 0);
      }
      
      .reel-indicator {
        position: absolute;
        top: 10px;
        right: 10px;
        color: white;
        font-size: 1.25rem;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }
    `;
    document.head.appendChild(profileStyles);
  }
});