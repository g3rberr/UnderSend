// Theme settings functionality - только темная тема
document.addEventListener("DOMContentLoaded", () => {
  // Находим все опции темы
  const themeOptions = document.querySelectorAll(".theme-option");
  
  // Скрываем все опции, кроме темной темы
  themeOptions.forEach(option => {
    const dataTheme = option.getAttribute("data-theme");
    
    if (dataTheme === "dark") {
      option.classList.add("active");
    } else {
      option.style.display = "none";
    }
  });
  
  // Удаляем обработчики событий для опций темы
  themeOptions.forEach(option => {
    option.replaceWith(option.cloneNode(true));
  });
  
  // Добавляем сообщение о том, что тема не может быть изменена
  const themeContainer = document.querySelector(".theme-options");
  if (themeContainer) {
    const message = document.createElement("p");
    message.textContent = "Dark theme is permanently enabled.";
    message.style.textAlign = "center";
    message.style.marginTop = "10px";
    themeContainer.appendChild(message);
  }
});
