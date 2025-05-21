// Theme functionality - только темная тема
document.addEventListener("DOMContentLoaded", () => {
  // Применяем темную тему при загрузке страницы
  function applyDarkTheme() {
    document.documentElement.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }

  // Всегда применяем темную тему
  applyDarkTheme();

  // Удаляем все переключатели темы, так как они больше не нужны
  const themeToggles = document.querySelectorAll(".theme-toggle, #theme-toggle");
  themeToggles.forEach(toggle => {
    if (toggle.parentNode) {
      // Если это чекбокс внутри label, удаляем весь label
      if (toggle.type === "checkbox" && toggle.parentNode.tagName === "LABEL") {
        toggle.parentNode.remove();
      } else {
        // Иначе удаляем только сам переключатель
        toggle.remove();
      }
    }
  });

  // Удаляем кнопки переключения темы
  const themeButtons = document.querySelectorAll(".theme-button");
  themeButtons.forEach(button => {
    button.remove();
  });

  // Скрываем настройки темы, если они есть
  const themeSettings = document.querySelectorAll(".theme-options, .theme-option");
  themeSettings.forEach(setting => {
    setting.style.display = "none";
  });

  // Скрываем карточку настроек темы, если она есть
  const themeSettingsCard = document.querySelector(".settings-card:has(.theme-options)");
  if (themeSettingsCard) {
    themeSettingsCard.style.display = "none";
  }
});
