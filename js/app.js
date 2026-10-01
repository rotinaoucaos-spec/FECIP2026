/* =====================================
   VARIÁVEIS
===================================== */

let name = "";

let age = "";

let goal = "";

let questions = [];

let currentQuestion = 0;

let answers = {};


/* =====================================
   TROCAR TELA
===================================== */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    document
        .getElementById(id)
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================
   INÍCIO
===================================== */

function start() {

    name =
        document
        .getElementById("nameInput")
        .value
        .trim();

    age =
        document
        .getElementById("ageInput")
        .value;

    if (!name || !age) {

        alert(
            "Digite seu nome e sua idade."
        );

        return;
    }

    document
        .getElementById("welcomeTitle")
        .innerText =
        `Olá, ${name}! 👋`;

    showScreen("screen-welcome");

}


/* =====================================
   OBJETIVO
===================================== */

function selectGoal(selectedGoal) {

    goal = selectedGoal;

    document
        .getElementById("foodObjective")
        .classList.remove("selected");

    document
        .getElementById("productivityObjective")
        .classList.remove("selected");


    if (selectedGoal === "food") {

        document
            .getElementById("foodObjective")
            .classList.add("selected");

    } else {

        document
            .getElementById("productivityObjective")
            .classList.add("selected");

    }

}


function continueGoal() {

    if (!goal) {

        alert(
            "Escolha um objetivo primeiro."
        );

        return;
    }


    if (goal === "food") {

        document
            .getElementById("introEmoji")
            .innerText = "🍎";

        document
            .getElementById("introTitle")
            .innerText =
            "Questionário de Alimentação";

    } else {

        document
            .getElementById("introEmoji")
            .innerText = "🧠";

        document
            .getElementById("introTitle")
            .innerText =
            "Questionário de Produtividade";
    }


    showScreen("screen-intro");

}


/* =====================================
   COMEÇAR QUESTIONÁRIO
===================================== */

function startQuiz() {

    questions =
        goal === "food"
        ? foodQuestions
        : productivityQuestions;

    currentQuestion = 0;

    answers = {};

    showScreen("screen-quiz");

    renderQuestion();

}


/* =====================================
   MOSTRAR PERGUNTA
===================================== */

function renderQuestion() {

    const q =
        questions[currentQuestion];

    const number =
        currentQuestion + 1;


    const progress =
        Math.round(
            (number / questions.length) * 100
        );


    document
        .getElementById("questionNumber")
        .innerText =
        `PERGUNTA ${number}`;


    document
        .getElementById("progressText")
        .innerText =
        `Pergunta ${number} de ${questions.length}`;


    document
        .getElementById("progressPercent")
        .innerText =
        `${progress}%`;


    document
        .getElementById("progressBar")
        .style.width =
        `${progress}%`;


    document
        .getElementById("questionText")
        .innerText =
        q.text;


    const options =
        document.getElementById("options");


    options.innerHTML = "";


    q.options.forEach((option, index) => {

        const button =
            document.createElement("button");


        button.className =
            "option";


        button.innerText =
            option[0];


        button.style.animation =
            `screenIn .35s ease ${index * .06}s both`;


        button.onclick =
            () =>
            answerQuestion(
                option[0],
                option[1]
            );


        options.appendChild(button);

    });

}


/* =====================================
   RESPONDER PERGUNTA
===================================== */

function answerQuestion(label, score) {

    const q =
        questions[currentQuestion];


    answers[q.id] = {

        label: label,

        score: score

    };


    setTimeout(() => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            renderQuestion();

        } else {

            createResult();

        }

    }, 250);

}


/* =====================================
   RESULTADO
===================================== */

function createResult() {

    let total = 0;


    questions.forEach(q => {

        total +=
            answers[q.id]?.score || 0;

    });


    const max =
        questions.length * 3;


    const percent =
        Math.round(
            (total / max) * 100
        );


    const stars =
        Math.max(
            1,
            Math.min(
                5,
                Math.round(
                    (percent / 100) * 5
                )
            )
        );


    const emoji =
        goal === "food"
        ? "🍎"
        : "🧠";


    document
        .getElementById("resultEmoji")
        .innerText =
        emoji;


    document
        .getElementById("resultTitle")
        .innerText =
        `Olá, ${name}! 👋`;


    document
        .getElementById("score")
        .innerText =
        `${percent}/100`;


    document
        .getElementById("resultProgress")
        .style.width =
        `${percent}%`;


    let starsHTML = "";


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (i <= stars) {

            starsHTML += "⭐";

        } else {

            starsHTML +=
                `<span class="star-empty">☆</span>`;
        }

    }


    document
        .getElementById("stars")
        .innerHTML =
        starsHTML;


    document
        .getElementById("positiveBox")
        .style.display =
        "block";


    document
        .getElementById("improveBox")
        .style.display =
        "block";


    createFeedback();

    createPlan();

    showScreen("screen-result");

    salvarResultadoNoSupabase({
        nome: name,
        idade: age,
        objetivo: goal,
        pontuacao: percent
    }).catch(error => {
        console.warn("Não foi possível salvar o resultado no Supabase.", error);
    });
}


/* =====================================
   FEEDBACK
===================================== */

function createFeedback() {

    const positiveList =
        document.getElementById("positives");

    const improveList =
        document.getElementById("improvements");


    positiveList.innerHTML = "";

    improveList.innerHTML = "";


    if (goal === "food") {

        addFeedback(
            "refeicoes",
            "Você mantém uma boa distribuição de refeições.",
            "Organizar melhor a quantidade de refeições durante o dia."
        );

        addFeedback(
            "cafe",
            "Você costuma manter o café da manhã.",
            "Evitar pular o café da manhã com frequência."
        );

        addFeedback(
            "frutas",
            "Você inclui frutas na sua alimentação.",
            "Aumentar o consumo de frutas."
        );

        addFeedback(
            "verduras",
            "Você consome verduras e legumes com frequência.",
            "Adicionar mais verduras e legumes às refeições."
        );

        addFeedback(
            "almoco",
            "Seu almoço apresenta uma boa variedade de alimentos.",
            "Buscar deixar o almoço mais variado e equilibrado."
        );

        addFeedback(
            "ultraprocessados",
            "Você evita consumir muitos alimentos ultraprocessados.",
            "Reduzir o consumo de alimentos ultraprocessados."
        );

        addFeedback(
            "agua",
            "Você mantém uma boa hidratação durante o dia.",
            "Aumentar o consumo de água ao longo do dia."
        );

        addFeedback(
            "bebidas",
            "Você prioriza água em vez de bebidas açucaradas.",
            "Diminuir a troca de água por bebidas açucaradas."
        );

        addFeedback(
            "distracao",
            "Você consegue prestar mais atenção enquanto se alimenta.",
            "Tentar fazer as refeições sem celular ou televisão."
        );

        addFeedback(
            "beliscos",
            "Você evita comer fora de hora com frequência.",
            "Organizar melhor os horários das refeições e lanches."
        );

        addFeedback(
            "doces",
            "Você demonstra controle no consumo de doces.",
            "Tentar reduzir o consumo excessivo de doces."
        );

        addFeedback(
            "frituras",
            "Você não costuma consumir frituras com frequência.",
            "Reduzir a frequência do consumo de alimentos fritos."
        );

        addFeedback(
            "planejamento",
            "Você costuma planejar suas refeições.",
            "Começar a planejar as refeições do dia com antecedência."
        );

        addFeedback(
            "muitaFome",
            "Você procura fazer escolhas mais planejadas quando está com fome.",
            "Planejar opções de refeições para evitar escolhas impulsivas."
        );

        addFeedback(
            "pularRefeicoes",
            "Você mantém suas refeições regularmente.",
            "Evitar pular refeições com frequência."
        );

        addFeedback(
            "lanches",
            "Você procura fazer boas escolhas nos lanches.",
            "Buscar opções de lanches mais nutritivas."
        );

        addFeedback(
            "acucar",
            "Você presta atenção ao consumo de açúcar.",
            "Começar a observar a quantidade de açúcar nos alimentos."
        );

        addFeedback(
            "fibras",
            "Você consome alimentos ricos em fibras.",
            "Aumentar o consumo de alimentos ricos em fibras."
        );

    } else {

        addFeedback(
            "sono",
            "Você mantém uma boa rotina de sono.",
            "Criar uma rotina de sono mais regular."
        );

        addFeedback(
            "foco",
            "Você consegue manter uma boa concentração.",
            "Criar períodos específicos para foco."
        );

        addFeedback(
            "telas",
            "Você mantém um bom controle do tempo de tela.",
            "Reduzir o tempo de tela durante o dia."
        );

        addFeedback(
            "pausas",
            "Você faz pausas durante suas atividades.",
            "Inserir pequenas pausas durante os estudos."
        );

        addFeedback(
            "procrastinacao",
            "Você consegue controlar a procrastinação.",
            "Dividir tarefas grandes em pequenas etapas."
        );

        addFeedback(
            "exercicio",
            "Você pratica atividade física.",
            "Adicionar mais atividade física à rotina."
        );

        addFeedback(
            "acorda",
            "Você costuma acordar no horário planejado.",
            "Criar horários mais consistentes para acordar."
        );

        addFeedback(
            "metas",
            "Você costuma estabelecer metas.",
            "Definir prioridades para cada dia."
        );

        addFeedback(
            "organizacao",
            "Você mantém uma boa organização.",
            "Organizar melhor suas tarefas."
        );

        addFeedback(
            "rotina",
            "Você possui uma rotina definida.",
            "Criar uma rotina diária mais organizada."
        );

    }

}


/* =====================================
   ADICIONAR FEEDBACK
===================================== */

function addFeedback(
    id,
    positiveText,
    improveText
) {

    const answer =
        answers[id];


    if (!answer) return;


    const positiveList =
        document.getElementById("positives");


    const improveList =
        document.getElementById("improvements");


    if (answer.score >= 2) {

        const li =
            document.createElement("li");


        li.innerText =
            positiveText;


        positiveList.appendChild(li);

    } else {

        const li =
            document.createElement("li");


        li.innerText =
            improveText;


        improveList.appendChild(li);

    }

}


/* =====================================
   PLANO PERSONALIZADO
===================================== */

function createPlan() {

    const plan =
        document.getElementById("plan");


    plan.innerHTML = "";


    if (goal === "food") {

        addPlan(
            "🌅 Manhã",
            [
                "Tomar água ao acordar",
                "Fazer um café da manhã equilibrado",
                "Incluir uma fruta quando possível"
            ]
        );


        addPlan(
            "☀️ Tarde",
            [
                "Fazer uma refeição variada",
                "Manter a hidratação durante a tarde",
                "Priorizar alimentos naturais e variados"
            ]
        );


        addPlan(
            "🌙 Noite",
            [
                "Fazer uma refeição equilibrada",
                "Evitar exageros em doces e bebidas açucaradas",
                "Planejar as refeições do dia seguinte"
            ]
        );

    } else {

        addPlan(
            "🌅 Manhã",
            [
                "Definir as principais tarefas do dia",
                "Começar pela tarefa mais importante",
                "Evitar distrações"
            ]
        );


        addPlan(
            "☀️ Tarde",
            [
                "Separar períodos de foco",
                "Fazer pequenas pausas",
                "Organizar as tarefas restantes"
            ]
        );


        addPlan(
            "🌙 Noite",
            [
                "Revisar o que foi realizado",
                "Planejar o próximo dia",
                "Reduzir telas antes de dormir"
            ]
        );

    }

}


/* =====================================
   ADICIONAR PLANO
===================================== */

function addPlan(title, items) {

    const plan =
        document.getElementById("plan");


    const div =
        document.createElement("div");


    div.className =
        "plan-card";


    let html =
        `<h4>${title}</h4><ul>`;


    items.forEach(item => {

        html +=
            `<li>${item}</li>`;

    });


    html += "</ul>";


    div.innerHTML =
        html;


    plan.appendChild(div);

}


/* =====================================
   REINICIAR
===================================== */

function restart() {

    name = "";

    age = "";

    goal = "";

    answers = {};

    currentQuestion = 0;


    document
        .getElementById("nameInput")
        .value = "";


    document
        .getElementById("ageInput")
        .value = "";


    document
        .getElementById("foodObjective")
        .classList.remove("selected");


    document
        .getElementById("productivityObjective")
        .classList.remove("selected");


    showScreen("screen-start");

}


