// Settings page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Get all toggle switches
  const toggleSwitches = document.querySelectorAll('input[type="checkbox"]')

  // Add event listeners for toggle switches
  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const settingName = this.id
      const isEnabled = this.checked

      // In a real app, you would save this setting to a database or local storage
      console.log(`Setting "${settingName}" is now ${isEnabled ? "enabled" : "disabled"}`)

      // Show feedback
      const feedback = document.createElement("div")
      feedback.className = "settings-feedback"
      feedback.textContent = `${settingName.replace(/-/g, " ")} ${isEnabled ? "enabled" : "disabled"}`

      document.body.appendChild(feedback)

      // Remove feedback after 2 seconds
      setTimeout(() => {
        feedback.remove()
      }, 2000)
    })
  })

  // Handle logout button
  const logoutButton = document.querySelector(".btn-danger")
  logoutButton.addEventListener("click", () => {
    // In a real app, you would clear session data and redirect to login page
    // For this demo, we'll just show a confirmation dialog and redirect to index
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "index.html"
    }
  })
})
