document.addEventListener("DOMContentLoaded", () => {
  // Получаем все элементы с классом parallax-layer
  const layers = document.querySelectorAll(".parallax-layer");

  // Переменная для хранения последней позиции прокрутки
  let lastScrollPosition = 0;

  // Функция для плавной анимации параллакса
  function updateParallax() {
    const scrollPosition = window.scrollY;

    layers.forEach((layer, index) => {
      // Коэффициент параллакса для разных слоев
      const speed = (index + 1) * 0.5; // Слою с меньшим индексом будет двигаться быстрее
      const translateValue = scrollPosition * speed;
      layer.style.transform = `translateY(${translateValue}px)`; // Двигаем слой
    });

    // В следующем кадре снова вызываем эту функцию
    requestAnimationFrame(updateParallax);
  }

  // Запуск анимации с использованием requestAnimationFrame
  updateParallax();
});
