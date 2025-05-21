// Private profile functionality
document.addEventListener("DOMContentLoaded", () => {
  const requestBtn = document.getElementById("request-btn");
  const profileUsername = document.getElementById("profile-username");
  const profileName = document.getElementById("profile-name");
  const profileBio = document.getElementById("profile-bio");
  const profileImage = document.getElementById("profile-image");
  
  // Get username from URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username") || "private_user";
  
  // Sample user data
  const userData = {
    username: username,
    name: "Private User",
    bio: "This account is private",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    isPrivate: true,
    requestSent: false
  };
  
  // Update profile information
  function updateProfileInfo() {
    profileUsername.textContent = userData.username;
    profileName.textContent = userData.name;
    profileBio.textContent = userData.bio;
    profileImage.src = userData.avatar;
    document.title = `${userData.username} - UnderSend`;
    
    // Update request button
    if (userData.requestSent) {
      requestBtn.textContent = "Requested";
      requestBtn.classList.add("pending");
      requestBtn.disabled = true;
    } else {
      requestBtn.textContent = "Request to Follow";
      requestBtn.classList.remove("pending");
      requestBtn.disabled = false;
    }
  }
  
  // Handle request button click
  requestBtn.addEventListener("click", function() {
    if (!userData.requestSent) {
      userData.requestSent = true;
      
      // Show notification
      showNotification("Request sent");
      
      // Update button
      updateProfileInfo();
    }
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
  
  // Add notification styles if not already present
  if (!document.querySelector('style#notification-styles')) {
    const notificationStyles = document.createElement('style');
    notificationStyles.id = 'notification-styles';
    notificationStyles.textContent = `
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
    `;
    document.head.appendChild(notificationStyles);
  }
});