// Apps and websites functionality
document.addEventListener("DOMContentLoaded", () => {
  const appTabs = document.querySelectorAll(".app-tab");
  const appLists = document.querySelectorAll(".apps-list");
  const removeButtons = document.querySelectorAll(".app-item .btn-danger");
  const reconnectButtons = document.querySelectorAll(".app-item .btn-primary");
  
  // Switch between tabs
  appTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      // Remove active class from all tabs
      appTabs.forEach(t => t.classList.remove("active"));
      
      // Add active class to clicked tab
      this.classList.add("active");
      
      // Hide all app lists
      appLists.forEach(list => {
        list.style.display = "none";
      });
      
      // Show the selected app list
      const tabName = this.getAttribute("data-tab");
      document.getElementById(`${tabName}-apps`).style.display = "block";
    });
  });
  
  // Handle remove buttons
  removeButtons.forEach(button => {
    button.addEventListener("click", function() {
      const appItem = this.closest(".app-item");
      const appName = appItem.querySelector(".app-name").textContent;
      
      if (confirm(`Are you sure you want to remove ${appName}?`)) {
        // In a real app, this would send a request to the server
        // For demo purposes, we'll just move the app to the removed list
        
        // Clone the app item
        const clonedItem = appItem.cloneNode(true);
        
        // Update the date and button
        clonedItem.querySelector(".app-date").textContent = `Removed on ${new Date().toLocaleDateString()}`;
        const newButton = clonedItem.querySelector(".btn");
        newButton.classList.replace("btn-danger", "btn-primary");
        newButton.textContent = "Reconnect";
        
        // Add event listener to the new button
        newButton.addEventListener("click", handleReconnect);
        
        // Add to removed list
        document.getElementById("removed-apps").appendChild(clonedItem);
        
        // Remove from active list
        appItem.remove();
        
        // Show a notification
        showNotification(`${appName} has been removed`);
      }
    });
  });
  
  // Handle reconnect buttons
  reconnectButtons.forEach(button => {
    button.addEventListener("click", handleReconnect);
  });
  
  function handleReconnect() {
    const appItem = this.closest(".app-item");
    const appName = appItem.querySelector(".app-name").textContent;
    
    // In a real app, this would send a request to the server
    // For demo purposes, we'll just move the app to the active list
    
    // Clone the app item
    const clonedItem = appItem.cloneNode(true);
    
    // Update the date and button
    clonedItem.querySelector(".app-date").textContent = `Connected on ${new Date().toLocaleDateString()}`;
    const newButton = clonedItem.querySelector(".btn");
    newButton.classList.replace("btn-primary", "btn-danger");
    newButton.textContent = "Remove";
    
    // Add event listener to the new button
    newButton.addEventListener("click", function() {
      const appItem = this.closest(".app-item");
      const appName = appItem.querySelector(".app-name").textContent;
      
      if (confirm(`Are you sure you want to remove ${appName}?`)) {
        // Clone the app item
        const clonedItem = appItem.cloneNode(true);
        
        // Update the date and button
        clonedItem.querySelector(".app-date").textContent = `Removed on ${new Date().toLocaleDateString()}`;
        const newButton = clonedItem.querySelector(".btn");
        newButton.classList.replace("btn-danger", "btn-primary");
        newButton.textContent = "Reconnect";
        
        // Add event listener to the new button
        newButton.addEventListener("click", handleReconnect);
        
        // Add to removed list
        document.getElementById("removed-apps").appendChild(clonedItem);
        
        // Remove from active list
        appItem.remove();
        
        // Show a notification
        showNotification(`${appName} has been removed`);
      }
    });
    
    // Add to active list
    document.getElementById("active-apps").appendChild(clonedItem);
    
    // Remove from current list
    appItem.remove();
    
    // Show a notification
    showNotification(`${appName} has been reconnected`);
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
  
  // Browse apps buttons
  const browseButtons = document.querySelectorAll(".app-category .btn");
  browseButtons.forEach(button => {
    button.addEventListener("click", function() {
      const category = this.closest(".app-category").querySelector(".app-category-title").textContent;
      
      // In a real app, this would navigate to a page with apps in this category
      // For demo purposes, we'll just show a notification
      showNotification(`Browsing ${category} apps`);
    });
  });
});