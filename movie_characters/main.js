document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const menu = document.querySelector(".menu");

    // Обработчик клика по бургеру
    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active"); // Анимация иконки
        menu.classList.toggle("active"); // Показ/скрытие меню
    });

    // Закрытие меню при клике на ссылку
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            burgerMenu.classList.remove("active");
            menu.classList.remove("active");
        });
    });
});
// Список заголовков для отслеживания
const sections = [
    { id: 'Topic1', message: 'Раздел "Вступление"' },
    { id: 'Topic2', message: 'Раздел "Видео"' },
    { id: 'Topic3', message: 'Раздел "Происхождение и эволюция киногероев"' },
    { id: 'Topic4', message: 'Раздел "Типы киногероев"' },
    { id: 'Top-movies', message: 'Раздел "Топ фильмов"' },
    { id: 'Term', message: 'Раздел "Термины"' }
];

// Для хранения уже показанных сообщений
const shownNotifications = new Set();

// Контейнер для уведомлений
const scrollNotifications = document.getElementById('scrollNotifications');

// Функция для отображения уведомления
function showScrollNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'scroll-notification';
    notification.textContent = message;

    scrollNotifications.appendChild(notification);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Отслеживание прокрутки страницы
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2; // Центр экрана

    sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;

            // Показываем уведомление, если элемент находится в области видимости
            if (scrollPosition >= elementTop && !shownNotifications.has(section.id)) {
                showScrollNotification(section.message);
                shownNotifications.add(section.id); // Помечаем, что уведомление уже было показано
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail img");
    const largeImage = document.querySelector(".large-image");
    const heroLink = document.querySelector(".hero-link");
  
    // Обработчик клика по миниатюрам
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        const src = thumbnail.getAttribute("src"); // Получаем путь к изображению
        const url = thumbnail.getAttribute("data-url"); // Получаем ссылку
  
        // Обновляем большое изображение и ссылку
        largeImage.src = src;
        heroLink.href = url;
      });
    });
  });
  
