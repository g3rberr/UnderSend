// Following functionality
document.addEventListener("DOMContentLoaded", () => {
  const followingTabs = document.querySelectorAll(".following-tab");
  const followersList = document.getElementById("followers-list");
  const followingList = document.getElementById("following-list");
  const followingSearch = document.getElementById("following-search");
  const followingTitle = document.getElementById("following-title");
  
  // Get username from URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username") || "username"; // Default to current user
  const tab = urlParams.get("tab") || "followers"; // Default to followers tab
  
  // Update title with username
  followingTitle.textContent = `${username}'s Connections`;
  
  // Sample data for followers and following
  const followers = [
    {
      id: 1,
      username: "jane_doe",
      name: "Jane Doe",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      isFollowing: true
    },
    {
      id: 2,
      username: "john_smith",
      name: "John Smith",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      isFollowing: false
    },
    {
      id: 3,
      username: "alex_jones",
      name: "Alex Jones",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      isFollowing: true
    },
    {
      id: 4,
      username: "sarah_parker",
      name: "Sarah Parker",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      isFollowing: false
    },
    {
      id: 5,
      username: "mike_johnson",
      name: "Mike Johnson",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      isFollowing: true
    }
  ];
  
  const following = [
    {
      id: 1,
      username: "jane_doe",
      name: "Jane Doe",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    },
    {
      id: 3,
      username: "alex_jones",
      name: "Alex Jones",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    },
    {
      id: 5,
      username: "mike_johnson",
      name: "Mike Johnson",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    },
    {
      id: 6,
      username: "emma_wilson",
      name: "Emma Wilson",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    },
    {
      id: 7,
      username: "david_brown",
      name: "David Brown",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    }
  ];
  
  // Render followers list
  function renderFollowers(filter = "") {
    const filteredFollowers = followers.filter(follower => 
      follower.username.toLowerCase().includes(filter.toLowerCase()) || 
      follower.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredFollowers.length === 0) {
      followersList.innerHTML = `
        <div class="following-empty">
          <div class="following-empty-icon">
            <i class="fas fa-user-friends"></i>
          </div>
          <p>No followers found</p>
        </div>
      `;
      return;
    }
    
    followersList.innerHTML = "";
    
    filteredFollowers.forEach(follower => {
      const followerItem = document.createElement("div");
      followerItem.className = "following-item";
      followerItem.innerHTML = `
        <div class="following-avatar">
          <img src="${follower.avatar}" alt="${follower.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
        </div>
        <div class="following-info">
          <div class="following-username">${follower.username}</div>
          <div class="following-name">${follower.name}</div>
        </div>
        <div class="following-action">
          <button class="btn btn-sm ${follower.isFollowing ? 'btn-primary' : 'btn-outline'}" data-id="${follower.id}">
            ${follower.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      `;
      
      // Add event listener to follow/unfollow button
      const followButton = followerItem.querySelector(".following-action button");
      followButton.addEventListener("click", function() {
        const id = parseInt(this.getAttribute("data-id"));
        const follower = followers.find(f => f.id === id);
        
        if (follower) {
          follower.isFollowing = !follower.isFollowing;
          
          if (follower.isFollowing) {
            this.textContent = "Following";
            this.classList.replace("btn-outline", "btn-primary");
            
            // Add to following list if not already there
            if (!following.some(f => f.id === id)) {
              following.push({
                id: follower.id,
                username: follower.username,
                name: follower.name,
                avatar: follower.avatar
              });
              
              // Re-render following list if it's visible
              if (followingList.style.display !== "none") {
                renderFollowing(followingSearch.value);
              }
            }
          } else {
            this.textContent = "Follow";
            this.classList.replace("btn-primary", "btn-outline");
            
            // Remove from following list
            const index = following.findIndex(f => f.id === id);
            if (index !== -1) {
              following.splice(index, 1);
              
              // Re-render following list if it's visible
              if (followingList.style.display !== "none") {
                renderFollowing(followingSearch.value);
              }
            }
          }
        }
      });
      
      followersList.appendChild(followerItem);
    });
  }
  
  // Render following list
  function renderFollowing(filter = "") {
    const filteredFollowing = following.filter(follow => 
      follow.username.toLowerCase().includes(filter.toLowerCase()) || 
      follow.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredFollowing.length === 0) {
      followingList.innerHTML = `
        <div class="following-empty">
          <div class="following-empty-icon">
            <i class="fas fa-user-friends"></i>
          </div>
          <p>No following found</p>
        </div>
      `;
      return;
    }
    
    followingList.innerHTML = "";
    
    filteredFollowing.forEach(follow => {
      const followingItem = document.createElement("div");
      followingItem.className = "following-item";
      followingItem.innerHTML = `
        <div class="following-avatar">
          <img src="${follow.avatar}" alt="${follow.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
        </div>
        <div class="following-info">
          <div class="following-username">${follow.username}</div>
          <div class="following-name">${follow.name}</div>
        </div>
        <div class="following-action">
          <button class="btn btn-sm btn-primary" data-id="${follow.id}">Following</button>
        </div>
      `;
      
      // Add event listener to unfollow button
      const unfollowButton = followingItem.querySelector(".following-action button");
      unfollowButton.addEventListener("click", function() {
        const id = parseInt(this.getAttribute("data-id"));
        
        // Remove from following list
        const index = following.findIndex(f => f.id === id);
        if (index !== -1) {
          following.splice(index, 1);
          
          // Update follower's isFollowing status
          const follower = followers.find(f => f.id === id);
          if (follower) {
            follower.isFollowing = false;
            
            // Re-render followers list if it's visible
            if (followersList.style.display !== "none") {
              renderFollowers(followingSearch.value);
            }
          }
          
          // Re-render following list
          renderFollowing(followingSearch.value);
        }
      });
      
      // Add hover effect to change button text
      unfollowButton.addEventListener("mouseenter", function() {
        this.textContent = "Unfollow";
        this.classList.replace("btn-primary", "btn-danger");
      });
      
      unfollowButton.addEventListener("mouseleave", function() {
        this.textContent = "Following";
        this.classList.replace("btn-danger", "btn-primary");
      });
      
      followingList.appendChild(followingItem);
    });
  }
  
  // Switch between tabs
  followingTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      // Remove active class from all tabs
      followingTabs.forEach(t => t.classList.remove("active"));
      
      // Add active class to clicked tab
      this.classList.add("active");
      
      const tabName = this.getAttribute("data-tab");
      
      if (tabName === "followers") {
        followersList.style.display = "block";
        followingList.style.display = "none";
        renderFollowers(followingSearch.value);
      } else {
        followersList.style.display = "none";
        followingList.style.display = "block";
        renderFollowing(followingSearch.value);
      }
      
      // Update URL without reloading the page
      const url = new URL(window.location);
      url.searchParams.set("tab", tabName);
      window.history.pushState({}, "", url);
    });
  });
  
  // Search functionality
  followingSearch.addEventListener("input", function() {
    const filter = this.value;
    
    if (followersList.style.display !== "none") {
      renderFollowers(filter);
    } else {
      renderFollowing(filter);
    }
  });
  
  // Initialize
  // Set active tab based on URL parameter
  followingTabs.forEach(t => {
    if (t.getAttribute("data-tab") === tab) {
      t.click();
    }
  });
});