
const notificationIcon = document.getElementById('notificationIcon');
const notificationDropdown = document.getElementById('notificationDropdown');
const unreadCount = document.getElementById('unreadCount');
const notificationItems = document.querySelectorAll('.notification-dropdown li');
const notificationDetail = document.getElementById('notificationDetail');
const notificationText = document.getElementById('notificationText');

let notificationCounter = 3;
let stopCounter = false;

// Функция добавления кнопок закрытия ко всем уведомлениям
function addCloseButtons() {
    const notifications = document.querySelectorAll('.notification-dropdown li'); // Находим все уведомления
    notifications.forEach(notification => {
        // Проверяем, есть ли уже кнопка закрытия
        if (!notification.querySelector('.close-btn')) {
            const closeButton = document.createElement('button');
            closeButton.textContent = '×'; // Текст кнопки
            closeButton.className = 'close-btn'; // Класс кнопки
            closeButton.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: transparent;
                border: none;
                font-size: 16px;
                cursor: pointer;
                color: red;
            `;
            notification.style.position = 'relative'; // Устанавливаем `position: relative` для родителя
            notification.appendChild(closeButton);
        }
    });
}

// Делегирование событий для кнопок закрытия
notificationDropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-btn')) {
        const notification = e.target.parentElement;
        notification.remove(); // Удаляем уведомление
        updateUnreadCount(); // Обновляем счетчик
    }
});

// Вызываем функцию для добавления кнопок после загрузки страницы
addCloseButtons();
updateUnreadCount(); // Обновляем счетчик
// Функция для обновления количества непрочитанных уведомлений
function updateUnreadCount() {
    const unreadItems = document.querySelectorAll('.notification-dropdown li.unread');
    const unreadCountValue = unreadItems.length;
    unreadCount.textContent = unreadCountValue;

    if (unreadCountValue === 0) {
        unreadCount.classList.remove('show');
    } else {
        unreadCount.classList.add('show');
    }
}

// Если уведомления добавляются динамически, вызывайте `addCloseButtons` после их добавления
function addNewNotification() {
    const newNotification = document.createElement('li');
    notificationCounter++;
    newNotification.classList.add('unread');
    newNotification.dataset.id = notificationCounter;
    newNotification.textContent = `Новое уведомление ${notificationCounter}`;
    notificationDropdown.querySelector('ul').appendChild(newNotification);

    // Добавляем кнопку закрытия к новому уведомлению
    addCloseButtons();
    updateUnreadCount();
}

// Запуск цикла добавления уведомлений
// setInterval(addNewNotification, 3000);

// Декоратор для остановки счетчика уведомлений
notificationIcon.addEventListener('click', function () {
    stopCounter = true;
    setTimeout(() => {
        stopCounter = false;
    }, 10000);

    if (notificationDetail.style.display === 'block') {
        notificationDetail.style.display = 'none';
    } else {
        notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
    }
});
// Делегирование событий для клика на уведомления
notificationDropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const notification = e.target;

        // Проверяем, есть ли у уведомления раскрытое состояние
        if (notification.classList.contains('expanded')) {
            notification.classList.remove('expanded');
            notification.style.height = 'auto'; // Скрыть дополнительный контент
            notification.querySelector('.details')?.remove();
        } else {
            notification.classList.add('expanded');

            // Создаем и добавляем содержимое
            const details = document.createElement('div');
            details.className = 'details';
            details.style.cssText = `
                margin-top: 5px;
                font-size: 12px;
                color: gray;
            `;
            details.textContent = `Подробное описание уведомления: ${notification.dataset.id}`;
            notification.appendChild(details);
        }
    }
});
