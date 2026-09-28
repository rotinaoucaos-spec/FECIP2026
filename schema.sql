-- =====================================
-- RoutineSync — tabela de resultados
-- Rode no Supabase: SQL Editor > New query
-- =====================================

create table if not exists public.resultados (
    id          bigint generated always as identity primary key,
    criado_em   timestamptz not null default now(),
    nome        text        not null check (char_length(nome) between 1 and 100),
    idade       int         check (idade between 1 and 120),
    objetivo    text        not null check (objetivo in ('food', 'productivity')),
    pontuacao   int         not null check (pontuacao between 0 and 100),
    respostas   jsonb       not null default '{}'::jsonb
);

-- Segurança: liga o RLS (sem isso, qualquer pessoa leria a tabela toda)
alter table public.resultados enable row level security;

-- Visitantes do site podem APENAS inserir resultados.
-- Não podem ler, alterar nem apagar os dados de outras pessoas.
drop policy if exists "site pode inserir resultados" on public.resultados;
create policy "site pode inserir resultados"
    on public.resultados
    for insert
    to anon
    with check (true);

-- Para ver os resultados, use o painel do Supabase (Table Editor).
