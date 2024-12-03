const form = document.getElementById("registrationForm");
const captchaInput = document.getElementById("captchaInput");
const captchaQuestion = document.getElementById("captchaQuestion");
const captchaError = document.getElementById("captchaError");
const submitButton = document.getElementById("submitButton");

let currentCaptchaSum;

function generateCaptcha() {
    // Генерация двух случайных чисел для сложения
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 50);

    // Задача на сложение
    currentCaptchaSum = num1 + num2;

    captchaQuestion.textContent = `Сколько будет ${num1} + ${num2}?`;
}

// Проверка на пустое поле
function isEmpty(input) {
    return input.trim().length === 0;
}

// Обработчик ввода капчи
captchaInput.addEventListener("input", () => {
    const userInput = captchaInput.value.trim();
    if (isEmpty(userInput)) {
        captchaError.textContent = "Поле не может быть пустым.";
        submitButton.disabled = true;
        return;
    }

    // Проверка введенной суммы
    if (parseInt(userInput) === currentCaptchaSum) {
        captchaError.textContent = "";
        submitButton.disabled = false;
    } else {
        captchaError.textContent = "Неправильная сумма. Попробуйте снова.";
        submitButton.disabled = true;
    }
});

// Сброс капчи при отправке формы
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Отменяем стандартное поведение

    if (submitButton.disabled) {
        captchaError.textContent = "Пройдите проверку капчи!";
        return;
    }

    alert("Регистрация успешна!");
    form.reset();
    generateCaptcha(); // Генерация новой капчи
});

// Генерация первой капчи при загрузке
generateCaptcha();
