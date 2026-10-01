const ADMIN_EMAIL = "rotinaoucaos@gmail.com";

const loginCard = document.getElementById("loginCard");
const dashboardCard = document.getElementById("dashboardCard");
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");
const resultsBody = document.getElementById("resultsBody");
const dashboardMessage = document.getElementById("dashboardMessage");
const totalStat = document.getElementById("totalStat");
const averageStat = document.getElementById("averageStat");
const lastStat = document.getElementById("lastStat");

function showLogin() {
    loginCard.classList.remove("hidden");
    dashboardCard.classList.add("hidden");
}

function showDashboard() {
    loginCard.classList.add("hidden");
    dashboardCard.classList.remove("hidden");
}

function traduzirObjetivo(valor) {
    if (valor === "food") return "Alimentação";
    if (valor === "productivity") return "Produtividade";
    return valor || "—";
}

function formatarData(valor) {
    if (!valor) return "—";

    const data = new Date(valor);

    if (Number.isNaN(data.getTime())) {
        return valor;
    }

    return data.toLocaleString("pt-BR");
}

async function carregarResultados() {
    dashboardMessage.textContent = "Carregando resultados...";
    resultsBody.innerHTML = "";

    const { data, error } = await supabaseClient
        .from("resultados")
        .select("id,nome,idade,objetivo,pontuacao,criado_em")
        .order("criado_em", { ascending: false })
        .limit(100);

    if (error) {
        dashboardMessage.textContent = "Não foi possível carregar os resultados.";
        console.error(error);
        return;
    }

    const resultados = data || [];

    totalStat.textContent = resultados.length;

    const media = resultados.length
        ? Math.round(
            resultados.reduce((total, item) => total + Number(item.pontuacao || 0), 0)
            / resultados.length
        )
        : 0;

    averageStat.textContent = resultados.length ? media + "/100" : "—";
    lastStat.textContent = resultados.length ? formatarData(resultados[0].criado_em) : "—";

    resultados.forEach(item => {
        const tr = document.createElement("tr");

        const valores = [
            item.id,
            item.nome,
            item.idade,
            traduzirObjetivo(item.objetivo),
            item.pontuacao + "/100",
            formatarData(item.criado_em)
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });

        resultsBody.appendChild(tr);
    });

    dashboardMessage.textContent = resultados.length
        ? resultados.length + " resultado(s) exibido(s)."
        : "Ainda não há resultados salvos.";
}

loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    loginError.textContent = "";
    loginButton.disabled = true;
    loginButton.textContent = "Entrando...";

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    loginButton.disabled = false;
    loginButton.textContent = "Entrar";

    if (error) {
        loginError.textContent = "E-mail ou senha inválidos.";
        return;
    }

    const { data: userData } = await supabaseClient.auth.getUser();
    const emailLogado = (userData.user?.email || "").toLowerCase();

    if (emailLogado !== ADMIN_EMAIL) {
        await supabaseClient.auth.signOut();
        loginError.textContent = "Este usuário não possui acesso administrativo.";
        return;
    }

    showDashboard();
    await carregarResultados();
});

document.getElementById("logoutButton").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    showLogin();
});

document.getElementById("refreshButton").addEventListener("click", carregarResultados);

async function iniciarAdmin() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        showLogin();
        return;
    }

    const emailLogado = (data.session.user?.email || "").toLowerCase();

    if (emailLogado !== ADMIN_EMAIL) {
        await supabaseClient.auth.signOut();
        showLogin();
        loginError.textContent = "Este usuário não possui acesso administrativo.";
        return;
    }

    showDashboard();
    await carregarResultados();
}

supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || !session) {
        showLogin();
    }
});

iniciarAdmin();
