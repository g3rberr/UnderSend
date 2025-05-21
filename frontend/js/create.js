// Create post page functionality
document.addEventListener("DOMContentLoaded", () => {
  const fileUpload = document.getElementById("file-upload")
  const uploadArea = document.getElementById("upload-area")
  const uploadPreview = document.getElementById("upload-preview")
  const previewImage = document.getElementById("preview-image")
  const removeUpload = document.getElementById("remove-upload")
  const sharePost = document.getElementById("share-post")
  const captionInput = document.getElementById("caption")
  const locationInput = document.getElementById("location")

  // Handle file upload
  fileUpload.addEventListener("change", (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    // Create object URL for preview
    const objectURL = URL.createObjectURL(file)
    previewImage.src = objectURL

    // Show preview, hide upload area
    uploadArea.style.display = "none"
    uploadPreview.style.display = "block"
  })

  // Handle drag and drop
  uploadArea.addEventListener("dragover", (event) => {
    event.preventDefault()
    uploadArea.classList.add("drag-over")
  })

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("drag-over")
  })

  uploadArea.addEventListener("drop", (event) => {
    event.preventDefault()
    uploadArea.classList.remove("drag-over")

    const file = event.dataTransfer.files[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    // Create object URL for preview
    const objectURL = URL.createObjectURL(file)
    previewImage.src = objectURL

    // Show preview, hide upload area
    uploadArea.style.display = "none"
    uploadPreview.style.display = "block"
  })

  // Handle remove upload
  removeUpload.addEventListener("click", () => {
    // Clear file input
    fileUpload.value = ""

    // Hide preview, show upload area
    uploadPreview.style.display = "none"
    uploadArea.style.display = "flex"
  })

  // Handle share post
  sharePost.addEventListener("click", () => {
    // Check if image is selected
    if (uploadArea.style.display !== "none") {
      alert("Please select an image to share.")
      return
    }

    // Get caption and location
    const caption = captionInput.value.trim()
    const location = locationInput.value.trim()

    // In a real app, you would upload the image and create a post
    // For this demo, we'll just show a success message and redirect
    alert("Post shared successfully!")
    window.location.href = "index.html"
  })
})
