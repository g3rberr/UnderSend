// Explore page functionality
document.addEventListener("DOMContentLoaded", () => {
  const exploreGrid = document.getElementById("explore-grid");
  
  // Если элемент explore-grid не существует на странице, прекращаем выполнение скрипта
  if (!exploreGrid) {
    return; // Выходим из функции, если элемент не найден
  }
  
  const exploreTabs = document.querySelectorAll(".explore-tab");

  // Sample data for explore posts (replace with actual data fetching)
  const explorePosts = window.explorePosts || [
    { image: "https://placehold.co/400", username: "user1", likes: 150 },
    { image: "https://placehold.co/400", username: "user2", likes: 200 },
    { image: "https://placehold.co/400", username: "user3", likes: 100 },
    { image: "https://placehold.co/400", username: "user4", likes: 250 },
    { image: "https://placehold.co/400", username: "user5", likes: 180 },
  ];

  // Render explore grid
  function renderExploreGrid(posts) {
    exploreGrid.innerHTML = "";

    posts.forEach((post) => {
      const exploreItem = document.createElement("div");
      exploreItem.className = "explore-item";
      exploreItem.innerHTML = `
        <img src="${post.image}" alt="Explore post" onerror="this.src='https://placehold.co/400'">
        <div class="explore-overlay">
          <div class="explore-info">
            <span class="explore-username">${post.username}</span>
            <div class="explore-likes">
              <i class="fas fa-heart"></i> ${post.likes}
            </div>
          </div>
        </div>
      `;
      exploreGrid.appendChild(exploreItem);
    });
  }

  // Initialize with "For You" tab
  renderExploreGrid(explorePosts);

  // Add event listeners for tabs
  exploreTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      exploreTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const tabName = this.dataset.tab;

      // In a real app, you would fetch different content based on the selected tab
      // For this demo, we'll just shuffle the posts for different tabs
      if (tabName === "trending") {
        renderExploreGrid([...explorePosts].reverse());
      } else if (tabName === "tags" || tabName === "places") {
        // Show a message for tags and places tabs
        exploreGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 50px;">
            <h2>Coming Soon</h2>
            <p>We're working on this feature. Check back later!</p>
          </div>
        `;
      } else {
        renderExploreGrid(explorePosts);
      }
    });
  });
});
