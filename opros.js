document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quizForm");
    const submitQuiz = document.getElementById("submitQuiz");
    const quizResult = document.getElementById("quizResult");
    const resultText = document.getElementById("resultText");
    const resultImage = document.getElementById("resultImage");

    const calculateScore = () => {
        const answers = quizForm.querySelectorAll("input[type='radio']:checked");
        let correctAnswers = 0;
        answers.forEach(answer => {
            if (answer.value === "correct") {
                correctAnswers++;
            }
        });

        const totalQuestions = quizForm.querySelectorAll(".question").length;
        const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

        return scorePercentage;
    };

    submitQuiz.addEventListener("click", () => {
        const score = calculateScore();

        if (score === 0) {
            resultText.textContent = "Ваш уровень знаний: 0%. Вы не киноман.";
            resultImage.src = "./img/0proc.png";
        } else if (score <= 20) {
            resultText.textContent = "Ваш уровень знаний: 20%. Вам еще есть что узнать.";
            resultImage.src = "./img/20proc.png";
        } else if (score <= 40) {
            resultText.textContent = "Ваш уровень знаний: 40%. Вы начинающий киноман.";
            resultImage.src = "./img/40proc.png";
        } else if (score <= 60) {
            resultText.textContent = "Ваш уровень знаний: 60%. Вы неплохо разбираетесь в кино.";
            resultImage.src = "./img/60proc.png";
        } else if (score <= 80) {
            resultText.textContent = "Ваш уровень знаний: 80%. Вы настоящий киноман!";
            resultImage.src = "./img/80proc.png";
        } else {
            resultText.textContent = "Ваш уровень знаний: 100%. Из вас выйдет настоящий кинокритик!";
            resultImage.src = "./img/100proc.png";
        }

        quizResult.classList.remove("hidden");
    });
});

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