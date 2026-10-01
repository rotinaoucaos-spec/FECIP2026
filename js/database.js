// Operações simples do banco de dados do RoutineSync

async function salvarResultadoNoSupabase({
    nome,
    idade,
    objetivo,
    pontuacao,
    respostas
}) {
    const { error } = await supabaseClient
        .from("resultados")
        .insert({
            nome: nome.trim(),
            idade: Number(idade),
            objetivo,
            pontuacao: Number(pontuacao),
            respostas
        });

    if (error) {
        throw error;
    }

    return true;
}
