
const topMovies = document.querySelectorAll('.add-to-cart');
const cartList = document.querySelector('.cart-list');
const totalDurationElement = document.getElementById('total-duration');
const filterButtons = document.querySelector('.filter-buttons');
let cart = [];
let totalDuration = 0;

// Добавить фильм в корзину
topMovies.forEach(button => {
    button.addEventListener('click', () => {
        const movieCard = button.closest('.movie-card');
        const title = movieCard.dataset.title;
        const duration = parseInt(movieCard.dataset.duration, 10);

        if (title && duration) {
            cart.push({ title, duration });
            totalDuration += duration;
            updateCart();
        }
    });
});

// Обновление корзины
function updateCart() {
    cartList.innerHTML = '';
    cart.forEach((movie, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            <p>${movie.title} — ${movie.duration} мин.</p>
            <button data-index="${index}">
                <img src="./img/bin.png" alt="Удалить">
            </button>
        `;
        cartList.appendChild(listItem);
    });
    totalDurationElement.textContent = totalDuration;

    // Удаление фильма из корзины
    const deleteButtons = document.querySelectorAll('.cart-item button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index, 10);
            totalDuration -= cart[index].duration;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Сортировка
document.querySelector('.sort-asc').addEventListener('click', () => {
    cart.sort((a, b) => a.duration - b.duration);
    updateCart();
});

document.querySelector('.sort-desc').addEventListener('click', () => {
    cart.sort((a, b) => b.duration - a.duration);
    updateCart();
});

// Применение фильтров
document.querySelector('.apply-filter').addEventListener('click', () => {
    const min = parseInt(document.getElementById('min-duration').value, 10) || 0;
    const max = parseInt(document.getElementById('max-duration').value, 10) || Infinity;

    const filteredMovies = cart.filter(movie => movie.duration >= min && movie.duration <= max);
    cartList.innerHTML = '';
    filteredMovies.forEach((movie, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            <p>${movie.title} — ${movie.duration} мин.</p>
        `;
        cartList.appendChild(listItem);
    });
});

// Сброс фильтров
document.querySelector('.clear-filters').addEventListener('click', () => {
    document.getElementById('min-duration').value = '';
    document.getElementById('max-duration').value = '';
    updateCart();
});

// Добавить атрибуты для перетаскивания
const movieCards = document.querySelectorAll('.movie-card');
movieCards.forEach(card => {
    card.setAttribute('draggable', 'true');

    card.addEventListener('dragstart', event => {
        event.dataTransfer.setData('title', card.dataset.title);
        event.dataTransfer.setData('duration', card.dataset.duration);
    });
});

const cartArea = document.querySelector('.cart-list');

// Перетаскивание фильмов
movieCards.forEach(card => {
    card.setAttribute('draggable', 'true');

    card.addEventListener('dragstart', event => {
        event.dataTransfer.setData('title', card.dataset.title);
        event.dataTransfer.setData('duration', card.dataset.duration);
    });
});
// Обработчики событий для корзины (drag&drop)
cartArea.addEventListener('dragover', event => {
    event.preventDefault();
});

cartArea.addEventListener('dragenter', () => {
    cartArea.classList.add('dragging');
});

cartArea.addEventListener('dragleave', () => {
    cartArea.classList.remove('dragging');
});

cartArea.addEventListener('drop', event => {
    event.preventDefault();
    cartArea.classList.remove('dragging');

    const title = event.dataTransfer.getData('title');
    const duration = parseInt(event.dataTransfer.getData('duration'), 10);

    if (title && duration) {
        cart.push({ title, duration });
        totalDuration += duration;
        updateCart();
    }
});

// Обработчики событий для слайдера
const ratingSlider = document.getElementById('rating-range');
const ratingValue = document.getElementById('rating-value');

// Обновление слайдера с улучшениями для мобильных устройств
ratingSlider.addEventListener('input', () => {
    ratingValue.textContent = ratingSlider.value;
    updateStars();
});

// Обновление рейтинга при изменении слайдера
ratingSlider.addEventListener('change', () => {
    const minRating = parseFloat(ratingSlider.value);
    const filteredMovies = Array.from(document.querySelectorAll('.movie-card'))
        .filter(card => parseFloat(card.dataset.rating) >= minRating);

    // Скрываем все фильмы и показываем только подходящие
    document.querySelectorAll('.movie-card').forEach(card => {
        card.style.display = filteredMovies.includes(card) ? 'block' : 'none';
    });
});

// Обновление отображения звезд
function updateStars() {
    document.querySelectorAll('.movie-card .rating-stars').forEach(starsContainer => {
        const rating = parseFloat(starsContainer.closest('.movie-card').dataset.rating);
        starsContainer.innerHTML = ''; // Очищаем контейнер

        const fullStars = Math.floor(rating); // Полные звезды
        const fraction = rating % 1; // Дробная часть
        let fractionClass = '';

        // Определение частичной звезды
        if (fraction >= 0.75) {
            fractionClass = 'three-quarters'; // 3/4 звезды
        } else if (fraction >= 0.5) {
            fractionClass = 'half'; // Половина звезды
        } else if (fraction >= 0.25) {
            fractionClass = 'quarter'; // Четверть звезды
        }

        const emptyStars = 10 - fullStars - (fractionClass ? 1 : 0); // Пустые звезды, корректируем расчет

        // Добавляем полные звезды
        for (let i = 0; i < fullStars; i++) {
            starsContainer.innerHTML += '<span class="full"></span>';
        }

        // Добавляем частичную звезду, если есть
        if (fractionClass) {
            starsContainer.innerHTML += `<span class="${fractionClass}"></span>`;
        }

        // Добавляем пустые звезды
        for (let i = 0; i < emptyStars; i++) {
            starsContainer.innerHTML += '<span></span>';
        }
    });
}

// Поддержка мобильных устройств с использованием touch-событий
let isDragging = false;

// Обновление слайдера для мобильных устройств
ratingSlider.addEventListener('mousedown', () => {
    isDragging = true;
});

ratingSlider.addEventListener('touchstart', (event) => {
    isDragging = true;
    event.preventDefault(); // Останавливаем стандартное поведение
});

document.addEventListener('mousemove', event => {
    if (isDragging) {
        const rect = ratingSlider.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(offsetX / rect.width, 1));
        const newValue = (percentage * (ratingSlider.max - ratingSlider.min)) + parseFloat(ratingSlider.min);

        ratingSlider.value = Math.round(newValue * 10) / 10; // Устанавливаем значение с шагом 0.1
        ratingValue.textContent = ratingSlider.value;
    }
});

document.addEventListener('touchmove', event => {
    if (isDragging) {
        const rect = ratingSlider.getBoundingClientRect();
        const offsetX = event.touches[0].clientX - rect.left;
        const percentage = Math.max(0, Math.min(offsetX / rect.width, 1));
        const newValue = (percentage * (ratingSlider.max - ratingSlider.min)) + parseFloat(ratingSlider.min);

        ratingSlider.value = Math.round(newValue * 10) / 10; // Устанавливаем значение с шагом 0.1
        ratingValue.textContent = ratingSlider.value;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        ratingSlider.dispatchEvent(new Event('change')); // Обновляем фильтр
    }
});

document.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        ratingSlider.dispatchEvent(new Event('change')); // Обновляем фильтр
    }
});

// Сброс слайдера и рейтинга при нажатии на кнопку сброса
document.querySelector('.clear-filters').addEventListener('click', () => {
    document.getElementById('min-duration').value = '';
    document.getElementById('max-duration').value = '';
    ratingSlider.value = ratingSlider.min;  // Сбрасываем рейтинг
    ratingValue.textContent = ratingSlider.value;  // Обновляем отображение
    updateStars();
    updateCart();  // Обновляем корзину после сброса фильтров
});

updateStars();