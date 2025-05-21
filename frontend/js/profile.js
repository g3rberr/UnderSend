// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  const profileContainer = document.getElementById("profile-container");
  
  // Если элемент profile-container не существует на странице, прекращаем выполнение скрипта
  if (!profileContainer) {
    return; // Выходим из функции, если элемент не найден
  }
  
  // Default user data
  const defaultUser = {
    username: "defaultUser",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    name: "",
    bio: "",
    website: "",
    posts: 0,
    followers: 0,
    following: 0,
    isCurrentUser: true
  };
  
  // Default posts
  const defaultPosts = [
    { username: "defaultUser", image: "https://placehold.co/400", likes: 10 },
    { username: "defaultUser", image: "https://placehold.co/400", likes: 20 }
  ];
  
  // Load user data from localStorage or use default data
  function loadUserData() {
    // Try to get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || defaultUser;
    
    // Ensure we have the necessary properties
    const user = {
      ...defaultUser,
      ...userData,
      isCurrentUser: true
    };
    
    // Render profile
    renderProfile(user);
  }
  
  // Render profile content
  function renderProfile(user) {
    profileContainer.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">
          <img src="${user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}" alt="${user.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
        </div>
        <div class="profile-info">
          <div class="profile-actions">
            <h1 class="profile-username">${user.username}</h1>
            <div class="profile-buttons">
              ${user.isCurrentUser ? 
                `<a href="edit-profile.html" class="btn btn-primary">Edit Profile</a>
                 <a href="settings.html" class="btn-icon"><i class="fas fa-cog"></i></a>` : 
                `<button class="btn btn-primary">${user.isFollowing ? 'Following' : 'Follow'}</button>
                 <button class="btn-icon"><i class="fas fa-ellipsis-h"></i></button>`
              }
            </div>
          </div>
          <div class="profile-stats">
            <div class="stat">
              <span class="stat-value">${user.posts || 0}</span> posts
            </div>
            <div class="stat">
              <span class="stat-value">${user.followers || 0}</span> followers
            </div>
            <div class="stat">
              <span class="stat-value">${user.following || 0}</span> following
            </div>
          </div>
          <div class="profile-bio">
            <div class="profile-name">${user.name || ''}</div>
            <p>${user.bio || ''}</p>
            ${user.website ? `<a href="${user.website}" class="profile-website" target="_blank">${user.website}</a>` : ''}
          </div>
        </div>
      </div>
      
      <div class="profile-tabs">
        <div class="tabs">
          <button class="tab active"><i class="fas fa-th"></i> Posts</button>
          <button class="tab"><i class="fas fa-bookmark"></i> Saved</button>
          <button class="tab"><i class="fas fa-tag"></i> Tagged</button>
        </div>
      </div>
      
      <div class="profile-grid" id="profile-posts">
        <!-- Posts will be loaded dynamically -->
      </div>
    `;
    
    // Load posts
    loadProfilePosts(user.username);
  }
  
  // Load profile posts
  function loadProfilePosts(username) {
    const profilePosts = document.getElementById("profile-posts");
    if (!profilePosts) return;
    
    // Get posts for current user (if posts is defined)
    let userPosts = [];
    
    // Try to get posts from window.posts (if defined by data.js)
    if (typeof window.posts !== 'undefined') {
      userPosts = window.posts.filter(post => post.username === username);
    } else if (typeof defaultPosts !== 'undefined') {
      userPosts = defaultPosts.filter(post => post.username === username);
    }
    
    if (userPosts.length === 0) {
      profilePosts.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px;">
          <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 20px; color: var(--muted-foreground);"></i>
          <h2>No Posts Yet</h2>
          <p>When you share photos, they will appear here.</p>
        </div>
      `;
      return;
    }
    
    // Render posts
    userPosts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = "profile-post";
      postElement.innerHTML = `
        <img src="${post.image}" alt="Post" onerror="this.src='https://placehold.co/400'">
        <div class="profile-post-overlay">
          <div class="profile-post-likes">
            <i class="fas fa-heart"></i> ${post.likes}
          </div>
        </div>
      `;
      profilePosts.appendChild(postElement);
    });
  }
  
  // Initialize
  loadUserData();
  
  // Handle tab switching
  document.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (tab) {
      // Remove active class from all tabs
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      
      // Add active class to clicked tab
      tab.classList.add("active");
      
      // In a real app, you would load different content based on the selected tab
    }
  });
});
