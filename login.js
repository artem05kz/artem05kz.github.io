// Логика для Админа
function handleLogin() {
    let login = prompt("Введите ваш логин:", "");

    if (login === "Админ") {
        let password = prompt("Введите ваш пароль:", "");

        if (password === "Я главный") {
            alert("Здравствуйте!");
        } else if (password === null || password === "") {
            alert("Отменено");
        } else {
            alert("Неверный пароль");
        }
    } else if (login === null || login === "") {
        alert("Отменено");
    } else {
        alert("Я вас не знаю");
    }
}

// Логика для пользователя
document.getElementById("userLoginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Отключаем стандартное поведение отправки формы

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email && password) {
        // Проверка успешна — выполняем переадресацию
        window.location.href = "main.html";
    } else {
        alert("Пожалуйста, заполните все поля!");
    }
});
