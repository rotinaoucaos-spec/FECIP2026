/* =====================================
   BANCO DE DADOS (SUPABASE)
   Se a configuração estiver vazia,
   o site funciona normalmente sem salvar.
===================================== */

let db = null;

if (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    window.supabase
) {

    db =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

} else {

    console.info(
        "Supabase não configurado — resultados não serão salvos."
    );

}


/* =====================================
   SALVAR RESULTADO DO QUESTIONÁRIO
===================================== */

async function salvarResultado(dados) {

    if (!db) return;

    try {

        const { error } =
            await db
            .from("resultados")
            .insert({

                nome: dados.nome,

                idade: parseInt(dados.idade, 10) || null,

                objetivo: dados.objetivo,

                pontuacao: dados.pontuacao,

                respostas: dados.respostas

            });

        if (error) {

            console.error(
                "Erro ao salvar no Supabase:",
                error.message
            );

        }

    } catch (e) {

        console.error(
            "Falha de conexão com o Supabase:",
            e
        );

    }

}
