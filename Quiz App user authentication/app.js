// User Authentication
const users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('loginBtn')?.addEventListener('click', login);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (!username || !password) {
        errorMsg.textContent = 'Please enter both username and password!';
        return;
    }

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'quiz.html';
    } else {
        errorMsg.textContent = 'Invalid credentials!';
    }
}

document.getElementById('signupLink')?.addEventListener('click', signUp);

function signUp() {
    const username = prompt('Choose a username:');
    const password = prompt('Choose a password:');

    if (users.find(user => user.username === username)) {
        alert('Username already exists!');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created! Now you can log in.');
    }
}

// Quiz Logic
const quizData = [
    {
        question: "What is the correct syntax to declare a variable in JavaScript?",
        a: "var variableName;",
        b: "let variableName;",
        c: "const variableName;",
        d: "All of the above",
        correct: "d"
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a"
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b"
    },
    {
        question: "What does CSS stands for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "b"
    }
];

let index = 0;
let correct = 0;
let total = quizData.length;

const questionBox = document.getElementById('questionBox');
const allInputs = document.querySelectorAll("input[type='radio']");

const loadQuestion = () => {
    if (index === total) {
        return quizEnd();
    }
    reset();
    const data = quizData[index];
    questionBox.innerHTML = `${index + 1}) ${data.question}`;
    allInputs[0].nextElementSibling.innerText = data.a;
    allInputs[1].nextElementSibling.innerText = data.b;
    allInputs[2].nextElementSibling.innerText = data.c;
    allInputs[3].nextElementSibling.innerText = data.d;
};

document.getElementById('submit')?.addEventListener('click', function () {
    const ans = getAnswer();
    if (ans === quizData[index].correct) {
        correct++;
    }
    index++;
    loadQuestion();
});

const getAnswer = () => {
    let ans;
    allInputs.forEach((inputEl) => {
        if (inputEl.checked) {
            ans = inputEl.value;
        }
    });
    return ans;
};

const reset = () => {
    allInputs.forEach((inputEl) => {
        inputEl.checked = false;
    });
};

const quizEnd = () => {
    document.querySelector('.container').innerHTML = `
        <div class="col">
            <h3 class="w-100"> You've scored ${correct} / ${total} </h3>
        </div>
    `;
};

loadQuestion();
