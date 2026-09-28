/* =====================================
   PERGUNTAS DE ALIMENTAÇÃO
===================================== */

const foodQuestions = [

{
    id: "refeicoes",
    text: "Quantas refeições você costuma fazer por dia?",
    options: [
        ["A) 1–2", 0],
        ["B) 3", 2],
        ["C) 4–5", 3],
        ["D) Mais de 5", 2]
    ]
},

{
    id: "cafe",
    text: "Com que frequência você toma café da manhã?",
    options: [
        ["A) Nunca", 0],
        ["B) Raramente", 1],
        ["C) Às vezes", 2],
        ["D) Todos ou quase todos os dias", 3]
    ]
},

{
    id: "frutas",
    text: "Quantas porções de frutas você costuma comer por dia?",
    options: [
        ["A) Nenhuma", 0],
        ["B) 1", 1],
        ["C) 2", 2],
        ["D) 3 ou mais", 3]
    ]
},

{
    id: "verduras",
    text: "Com que frequência você come verduras e legumes?",
    options: [
        ["A) Quase nunca", 0],
        ["B) Algumas vezes por semana", 1],
        ["C) Quase todos os dias", 2],
        ["D) Todos os dias", 3]
    ]
},

{
    id: "almoco",
    text: "Como costuma ser seu almoço?",
    options: [
        ["A) Fast-food ou comida ultraprocessada", 0],
        ["B) Principalmente carboidratos e pouca variedade", 1],
        ["C) Arroz, feijão, proteína e alguns vegetais", 2],
        ["D) Uma refeição bem variada e equilibrada", 3]
    ]
},

{
    id: "ultraprocessados",
    text: "Com que frequência você come alimentos ultraprocessados, como biscoitos, salgadinhos e macarrão instantâneo?",
    options: [
        ["A) Todos os dias", 0],
        ["B) Várias vezes por semana", 1],
        ["C) Algumas vezes por mês", 2],
        ["D) Raramente", 3]
    ]
},

{
    id: "agua",
    text: "Quanto de água você costuma beber durante o dia?",
    options: [
        ["A) Menos de 2 copos", 0],
        ["B) 2–4 copos", 1],
        ["C) 5–7 copos", 2],
        ["D) 8 copos ou mais", 3]
    ]
},

{
    id: "bebidas",
    text: "Com que frequência você troca água por refrigerante ou outras bebidas açucaradas?",
    options: [
        ["A) Sempre", 0],
        ["B) Frequentemente", 1],
        ["C) Às vezes", 2],
        ["D) Raramente ou nunca", 3]
    ]
},

{
    id: "distracao",
    text: "Você costuma comer enquanto mexe no celular, assiste TV ou usa o computador?",
    options: [
        ["A) Sempre", 0],
        ["B) Frequentemente", 1],
        ["C) Às vezes", 2],
        ["D) Quase nunca", 3]
    ]
},

{
    id: "beliscos",
    text: "Com que frequência você come fora de hora ou fica beliscando durante o dia?",
    options: [
        ["A) Várias vezes ao dia", 0],
        ["B) Todos os dias", 1],
        ["C) Algumas vezes por semana", 2],
        ["D) Raramente", 3]
    ]
},

{
    id: "doces",
    text: "Quando sente vontade de comer um doce, o que você costuma fazer?",
    options: [
        ["A) Como vários doces", 0],
        ["B) Como um doce e continuo normalmente", 1],
        ["C) Tento escolher uma porção pequena", 2],
        ["D) Procuro outra opção de lanche", 3]
    ]
},

{
    id: "frituras",
    text: "Com que frequência você consome alimentos fritos?",
    options: [
        ["A) Todos os dias", 0],
        ["B) Várias vezes por semana", 1],
        ["C) Algumas vezes por mês", 2],
        ["D) Raramente", 3]
    ]
},

{
    id: "planejamento",
    text: "Você costuma planejar suas refeições antes do dia começar?",
    options: [
        ["A) Nunca", 0],
        ["B) Raramente", 1],
        ["C) Às vezes", 2],
        ["D) Frequentemente", 3]
    ]
},

{
    id: "muitaFome",
    text: "Quando está com muita fome, qual é sua atitude mais comum?",
    options: [
        ["A) Como qualquer coisa que estiver disponível", 0],
        ["B) Escolho algo rápido", 1],
        ["C) Tento fazer uma refeição completa", 2],
        ["D) Já tenho uma opção saudável planejada", 3]
    ]
},

{
    id: "pularRefeicoes",
    text: "Com que frequência você pula refeições?",
    options: [
        ["A) Todos os dias", 0],
        ["B) Várias vezes por semana", 1],
        ["C) Algumas vezes por mês", 2],
        ["D) Quase nunca", 3]
    ]
},

{
    id: "lanches",
    text: "Como você costuma escolher seus lanches?",
    options: [
        ["A) Principalmente doces e salgadinhos", 0],
        ["B) Alimentos industrializados", 1],
        ["C) Frutas, sanduíches ou outros alimentos variados", 2],
        ["D) Tento sempre escolher opções nutritivas", 3]
    ]
},

{
    id: "acucar",
    text: "Você costuma prestar atenção à quantidade de açúcar presente nos alimentos e bebidas que consome?",
    options: [
        ["A) Nunca", 0],
        ["B) Raramente", 1],
        ["C) Às vezes", 2],
        ["D) Frequentemente", 3]
    ]
},

{
    id: "fibras",
    text: "Com que frequência você come alimentos ricos em fibras, como frutas, verduras, legumes, feijão e aveia?",
    options: [
        ["A) Quase nunca", 0],
        ["B) Algumas vezes por semana", 1],
        ["C) Quase todos os dias", 2],
        ["D) Todos os dias", 3]
    ]
},

{
    id: "dificuldade",
    text: "Qual é a principal dificuldade que você enfrenta para ter uma alimentação melhor?",
    options: [
        ["A) Falta de tempo", 1],
        ["B) Falta de opções", 1],
        ["C) Vontade de comer besteiras", 1],
        ["D) Falta de organização", 1]
    ]
},

{
    id: "mudanca",
    text: "Qual mudança você gostaria de fazer primeiro na sua alimentação?",
    options: [
        ["A) Beber mais água", 3],
        ["B) Comer mais frutas e verduras", 3],
        ["C) Diminuir ultraprocessados e doces", 3],
        ["D) Organizar melhor minhas refeições", 3]
    ]
}

];


/* =====================================
   PERGUNTAS DE PRODUTIVIDADE
===================================== */

const productivityQuestions = [

{
    id: "sono",
    text: "Quantas horas você dorme por noite?",
    options: [
        ["A) Menos de 5", 0],
        ["B) 5 a 6", 1],
        ["C) 7 a 8", 3],
        ["D) Mais de 8", 2]
    ]
},

{
    id: "foco",
    text: "Como você considera sua capacidade de concentração?",
    options: [
        ["A) Muito baixa", 0],
        ["B) Baixa", 1],
        ["C) Boa", 2],
        ["D) Muito boa", 3]
    ]
},

{
    id: "telas",
    text: "Quanto tempo você passa em telas durante o dia?",
    options: [
        ["A) Mais de 8 horas", 0],
        ["B) 6 a 8 horas", 1],
        ["C) 3 a 5 horas", 2],
        ["D) Menos de 3 horas", 3]
    ]
},

{
    id: "pausas",
    text: "Você costuma fazer pausas durante seus estudos ou trabalho?",
    options: [
        ["A) Nunca", 0],
        ["B) Raramente", 1],
        ["C) Às vezes", 2],
        ["D) Regularmente", 3]
    ]
},

{
    id: "procrastinacao",
    text: "Com que frequência você procrastina?",
    options: [
        ["A) Sempre", 0],
        ["B) Frequentemente", 1],
        ["C) Às vezes", 2],
        ["D) Raramente", 3]
    ]
},

{
    id: "exercicio",
    text: "Com que frequência você pratica atividade física?",
    options: [
        ["A) Nunca", 0],
        ["B) Raramente", 1],
        ["C) Algumas vezes por semana", 2],
        ["D) Frequentemente", 3]
    ]
},

{
    id: "acorda",
    text: "Você costuma acordar no horário planejado?",
    options: [
        ["A) Quase nunca", 0],
        ["B) Poucas vezes", 1],
        ["C) Na maioria das vezes", 2],
        ["D) Sempre", 3]
    ]
},

{
    id: "metas",
    text: "Você costuma definir metas para o seu dia?",
    options: [
        ["A) Nunca", 0],
        ["B) Raramente", 1],
        ["C) Às vezes", 2],
        ["D) Sempre", 3]
    ]
},

{
    id: "organizacao",
    text: "Como você considera sua organização?",
    options: [
        ["A) Muito desorganizada", 0],
        ["B) Precisa melhorar", 1],
        ["C) Boa", 2],
        ["D) Muito boa", 3]
    ]
},

{
    id: "rotina",
    text: "Você possui uma rotina diária definida?",
    options: [
        ["A) Não tenho rotina", 0],
        ["B) Tenho pouca organização", 1],
        ["C) Tenho uma rotina básica", 2],
        ["D) Tenho uma rotina bem definida", 3]
    ]
}

];

