const content = {
    joke: {
        label: "Joks",
        items: [
            "Kāpēc programmētājs paņēma jaku? Tāpēc, ka logā bija pārāk daudz bugs.",
            "Ko dara dators, kad tam ir pārāk karsti? Meklē vairāk ventilatoru un mazāk drāmas.",
            "Kāpēc JavaScript bija priecīgs? Tāpēc, ka beidzot kāds to palaida pārlūkā."
        ]
    },
    fact: {
        label: "Fakts",
        items: [
            "Full-stack izstrādātājs strādā gan ar to, ko redz lietotājs, gan ar sistēmas loģiku.",
            "Daudz labu programmu sākas nevis ar kodu, bet ar labu jautājumu.",
            "Mazs, saprotams risinājums bieži ir labāks nekā liels un sarežģīts."
        ]
    },
    lesson: {
        label: "Ko es iemācījos",
        items: [
            "Ja nesaproti uzdevumu, vispirms jārunā un jāuzdod jautājumi, nevis uzreiz jāsteidzas kodēt.",
            "AI palīdz ātrāk, bet atbildība par rezultātu joprojām paliek cilvēkam.",
            "Soft skills palīdz komandai saprasties un neiestrēgt sīkumos."
        ]
    },
    badge: {
        label: "Dienas nozīmīte",
        items: [
            "Šodienas nozīmīte: Zinātkārais pētnieks",
            "Šodienas nozīmīte: Jautājumu meistars",
            "Šodienas nozīmīte: Mazais full-stack novērotājs"
        ]
    }
};

const quizQuestions = [
    {
        question: "Kas ir svarīgs labam izstrādātājam?",
        options: [
            "Tikai ātri rakstīt kodu",
            "Domāt, komunicēt un pārbaudīt rezultātu",
            "Vienmēr uzticēties AI bez pārbaudes"
        ],
        correctIndex: 1
    },
    {
        question: "Ko nozīmē soft skills?",
        options: [
            "Prasme sadarboties, klausīties un skaidri runāt",
            "Prasme lietot tikai vienu programmu",
            "Prasme ignorēt citus cilvēkus"
        ],
        correctIndex: 0
    },
    {
        question: "Kāpēc AI bez zināšanām nav pietiekams?",
        options: [
            "Jo nevar saprast, vai atbilde ir pareiza",
            "Jo AI strādā tikai naktī",
            "Jo AI neprot rakstīt tekstu"
        ],
        correctIndex: 0
    }
];

const outputLabel = document.querySelector("#output-label");
const outputText = document.querySelector("#output-text");
const quizQuestion = document.querySelector("#quiz-question");
const quizOptions = document.querySelector("#quiz-options");
const quizFeedback = document.querySelector("#quiz-feedback");
const quizProgress = document.querySelector("#quiz-progress");
const quizRestart = document.querySelector("#quiz-restart");

let quizIndex = 0;
let score = 0;

function pickRandomItem(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

function showContent(type) {
    const section = content[type];

    if (!section) {
        return;
    }

    outputLabel.textContent = section.label;
    outputText.textContent = pickRandomItem(section.items);
}

function renderQuiz() {
    const current = quizQuestions[quizIndex];

    if (!current) {
        quizQuestion.textContent = `Rezultāts: ${score} no ${quizQuestions.length}`;
        quizOptions.innerHTML = "";
        quizFeedback.textContent = "Mini tests pabeigts.";
        quizFeedback.className = "mt-4 min-h-6 text-sm font-medium text-emerald-800";
        quizProgress.textContent = `${quizQuestions.length} / ${quizQuestions.length}`;
        quizRestart.classList.remove("hidden");
        return;
    }

    quizQuestion.textContent = current.question;
    quizOptions.innerHTML = "";
    quizProgress.textContent = `${quizIndex + 1} / ${quizQuestions.length}`;
    quizFeedback.textContent = "";
    quizFeedback.className = "mt-4 min-h-6 text-sm font-medium text-stone-700";

    current.options.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = [
            "min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-3 text-left",
            "text-sm font-medium text-stone-900 transition hover:bg-stone-50"
        ].join(" ");
        button.textContent = option;
        button.addEventListener("click", () => handleAnswer(optionIndex));
        quizOptions.appendChild(button);
    });
}

function handleAnswer(selectedIndex) {
    const current = quizQuestions[quizIndex];
    const isCorrect = selectedIndex === current.correctIndex;

    if (isCorrect) {
        score += 1;
        quizFeedback.textContent = "Pareizi!";
        quizFeedback.className = "mt-4 min-h-6 text-sm font-medium text-emerald-800";
    } else {
        quizFeedback.textContent = "Gandrīz. Pareizā atbilde ir par domāšanu un rezultāta pārbaudi.";
        quizFeedback.className = "mt-4 min-h-6 text-sm font-medium text-amber-700";
    }

    Array.from(quizOptions.children).forEach((button, index) => {
        button.disabled = true;

        if (index === current.correctIndex) {
            button.className = [
                "min-h-11 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3",
                "text-left text-sm font-medium text-emerald-900"
            ].join(" ");
            return;
        }

        button.className = [
            "min-h-11 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3",
            "text-left text-sm font-medium text-stone-500"
        ].join(" ");
    });

    window.setTimeout(() => {
        quizIndex += 1;
        renderQuiz();
    }, 1400);
}

function restartQuiz() {
    quizIndex = 0;
    score = 0;
    quizRestart.classList.add("hidden");
    renderQuiz();
}

document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
        showContent(button.dataset.action);
    });
});

quizRestart.addEventListener("click", restartQuiz);

renderQuiz();
