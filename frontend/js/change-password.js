// Change password functionality
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("change-password-form");
  const currentPasswordInput = document.getElementById("current-password");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const strengthMeterFill = document.getElementById("strength-meter-fill");
  const strengthText = document.getElementById("strength-text");
  const changePasswordBtn = document.getElementById("change-password-btn");
  
  // Password requirement elements
  const reqLength = document.getElementById("req-length");
  const reqUppercase = document.getElementById("req-uppercase");
  const reqLowercase = document.getElementById("req-lowercase");
  const reqNumber = document.getElementById("req-number");
  const reqSpecial = document.getElementById("req-special");
  
  // Error message elements
  const currentPasswordError = document.getElementById("current-password-error");
  const newPasswordError = document.getElementById("new-password-error");
  const confirmPasswordError = document.getElementById("confirm-password-error");
  
  // Toggle password visibility
  const passwordToggles = document.querySelectorAll(".password-toggle");
  passwordToggles.forEach(toggle => {
    toggle.addEventListener("click", function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector("i");
      
      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });
  
  // Check password strength
  function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = "";
    
    // Check length
    if (password.length >= 8) {
      strength += 1;
      reqLength.querySelector("i").classList.replace("fa-times-circle", "fa-check-circle");
      reqLength.classList.add("requirement-met");
    } else {
      reqLength.querySelector("i").classList.replace("fa-check-circle", "fa-times-circle");
      reqLength.classList.remove("requirement-met");
    }
    
    // Check uppercase
    if (/[A-Z]/.test(password)) {
      strength += 1;
      reqUppercase.querySelector("i").classList.replace("fa-times-circle", "fa-check-circle");
      reqUppercase.classList.add("requirement-met");
    } else {
      reqUppercase.querySelector("i").classList.replace("fa-check-circle", "fa-times-circle");
      reqUppercase.classList.remove("requirement-met");
    }
    
    // Check lowercase
    if (/[a-z]/.test(password)) {
      strength += 1;
      reqLowercase.querySelector("i").classList.replace("fa-times-circle", "fa-check-circle");
      reqLowercase.classList.add("requirement-met");
    } else {
      reqLowercase.querySelector("i").classList.replace("fa-check-circle", "fa-times-circle");
      reqLowercase.classList.remove("requirement-met");
    }
    
    // Check numbers
    if (/[0-9]/.test(password)) {
      strength += 1;
      reqNumber.querySelector("i").classList.replace("fa-times-circle", "fa-check-circle");
      reqNumber.classList.add("requirement-met");
    } else {
      reqNumber.querySelector("i").classList.replace("fa-check-circle", "fa-times-circle");
      reqNumber.classList.remove("requirement-met");
    }
    
    // Check special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
      reqSpecial.querySelector("i").classList.replace("fa-times-circle", "fa-check-circle");
      reqSpecial.classList.add("requirement-met");
    } else {
      reqSpecial.querySelector("i").classList.replace("fa-check-circle", "fa-times-circle");
      reqSpecial.classList.remove("requirement-met");
    }
    
    // Calculate percentage for the strength meter
    const percentage = (strength / 5) * 100;
    strengthMeterFill.style.width = `${percentage}%`;
    
    // Set color and text based on strength
    if (strength === 0) {
      strengthMeterFill.style.backgroundColor = "#ff4d4d";
      feedback = "Very Weak";
    } else if (strength === 1) {
      strengthMeterFill.style.backgroundColor = "#ff4d4d";
      feedback = "Weak";
    } else if (strength === 2) {
      strengthMeterFill.style.backgroundColor = "#ffa64d";
      feedback = "Fair";
    } else if (strength === 3) {
      strengthMeterFill.style.backgroundColor = "#ffff4d";
      feedback = "Good";
    } else if (strength === 4) {
      strengthMeterFill.style.backgroundColor = "#4dff4d";
      feedback = "Strong";
    } else {
      strengthMeterFill.style.backgroundColor = "#4dff4d";
      feedback = "Very Strong";
    }
    
    strengthText.textContent = feedback;
    return strength;
  }
  
  // Validate form
  function validateForm() {
    let isValid = true;
    
    // Validate current password
    if (!currentPasswordInput.value) {
      currentPasswordError.textContent = "Please enter your current password";
      isValid = false;
    } else {
      currentPasswordError.textContent = "";
    }
    
    // Validate new password
    if (!newPasswordInput.value) {
      newPasswordError.textContent = "Please enter a new password";
      isValid = false;
    } else if (checkPasswordStrength(newPasswordInput.value) < 3) {
      newPasswordError.textContent = "Password is too weak";
      isValid = false;
    } else {
      newPasswordError.textContent = "";
    }
    
    // Validate confirm password
    if (!confirmPasswordInput.value) {
      confirmPasswordError.textContent = "Please confirm your new password";
      isValid = false;
    } else if (confirmPasswordInput.value !== newPasswordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match";
      isValid = false;
    } else {
      confirmPasswordError.textContent = "";
    }
    
    return isValid;
  }
  
  // Check password strength on input
  newPasswordInput.addEventListener("input", function() {
    checkPasswordStrength(this.value);
  });
  
  // Validate confirm password on input
  confirmPasswordInput.addEventListener("input", function() {
    if (this.value !== newPasswordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match";
    } else {
      confirmPasswordError.textContent = "";
    }
  });
  
  // Handle form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send the data to the server
      // For demo purposes, we'll just show a success message
      
      // Create success message
      const successMessage = document.createElement("div");
      successMessage.className = "alert alert-success";
      successMessage.textContent = "Password changed successfully!";
      
      // Insert before form
      form.parentNode.insertBefore(successMessage, form);
      
      // Clear form
      form.reset();
      
      // Reset strength meter and requirements
      strengthMeterFill.style.width = "0%";
      strengthText.textContent = "Password strength";
      
      document.querySelectorAll(".password-requirements li").forEach(li => {
        li.querySelector("i").classList.replace("fa-check-circle", "fa-times-circle");
        li.classList.remove("requirement-met");
      });
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  });
});