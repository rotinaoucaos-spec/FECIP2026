// Operações simples do banco de dados do RoutineSync

async function salvarResultadoNoSupabase({
    nome,
    idade,
    objetivo,
    pontuacao
}) {
    const { error } = await supabaseClient
        .from("resultados")
        .insert({
            nome: nome.trim(),
            idade: Number(idade),
            objetivo,
            pontuacao: Number(pontuacao)
        });

    if (error) {
        throw error;
    }

    return true;
}
