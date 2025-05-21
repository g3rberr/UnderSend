// Edit profile functionality
document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profile-form");
  const profilePreview = document.getElementById("profile-preview");
  const fileInput = document.getElementById("avatar-upload");
  const avatarPreview = document.getElementById("avatar-preview");
  
  // Если необходимые элементы не существуют на странице, прекращаем выполнение скрипта
  if (!profileForm || !profilePreview) {
    return; // Выходим из функции, если элементы не найдены
  }

  // Default user data
  const defaultUser = {
    username: "defaultUser",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    name: "",
    bio: "",
    website: "",
    email: "",
    phone: "",
    gender: ""
  };

  // Load user data from localStorage or use default data
  function loadUserData() {
    // Try to get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || defaultUser;
    
    // Ensure we have the necessary properties
    const user = {
      ...defaultUser,
      ...userData
    };
    
    // Fill form fields
    document.getElementById("username").value = user.username;
    document.getElementById("name").value = user.name || "";
    document.getElementById("bio").value = user.bio || "";
    document.getElementById("website").value = user.website || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phone || "";
    
    // Set gender select
    const genderSelect = document.getElementById("gender");
    if (genderSelect) {
      if (user.gender) {
        genderSelect.value = user.gender;
      } else {
        genderSelect.selectedIndex = 0;
      }
    }
    
    // Set avatar preview
    if (avatarPreview) {
      avatarPreview.src = user.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
      avatarPreview.onerror = function() {
        this.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
      };
    }
    
    // Update profile preview
    updateProfilePreview(user);
  }
  
  // Update profile preview
  function updateProfilePreview(user) {
    if (!profilePreview) return;
    
    profilePreview.innerHTML = `
      <div class="profile-preview-header">
        <div class="profile-preview-avatar">
          <img src="${user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}" alt="${user.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
        </div>
        <div class="profile-preview-info">
          <h3 class="profile-preview-username">${user.username}</h3>
          ${user.name ? `<div class="profile-preview-name">${user.name}</div>` : ''}
        </div>
      </div>
      <div class="profile-preview-bio">
        ${user.bio ? `<p>${user.bio}</p>` : ''}
        ${user.website ? `<a href="${user.website}" class="profile-preview-website" target="_blank">${user.website}</a>` : ''}
      </div>
    `;
  }
  
  // Handle form input changes
  function handleFormChange() {
    const formData = new FormData(profileForm);
    const userData = {
      username: formData.get("username"),
      name: formData.get("name"),
      bio: formData.get("bio"),
      website: formData.get("website"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      avatar: avatarPreview.src
    };
    
    // Update preview
    updateProfilePreview(userData);
  }
  
  // Handle avatar upload
  if (fileInput && avatarPreview) {
    fileInput.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          avatarPreview.src = e.target.result;
          handleFormChange();
        };
        
        reader.readAsDataURL(this.files[0]);
      }
    });
  }
  
  // Handle form submission
  if (profileForm) {
    profileForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const formData = new FormData(profileForm);
      const userData = {
        username: formData.get("username"),
        name: formData.get("name"),
        bio: formData.get("bio"),
        website: formData.get("website"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
        avatar: avatarPreview.src
      };
      
      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      
      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "alert alert-success";
      successMessage.textContent = "Profile updated successfully!";
      
      profileForm.prepend(successMessage);
      
      // Remove message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    });
  }
  
  // Add event listeners to form inputs
  const formInputs = profileForm.querySelectorAll("input, textarea, select");
  formInputs.forEach(input => {
    input.addEventListener("input", handleFormChange);
  });
  
  // Initialize
  loadUserData();
});
