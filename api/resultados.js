const mysql = require("mysql2/promise");

let pool;
let schemaReady = false;

function getPool() {
    if (!process.env.MYSQL_URL) {
        throw new Error("MYSQL_URL não configurada.");
    }

    if (!pool) {
        pool = mysql.createPool(process.env.MYSQL_URL);
    }

    return pool;
}

async function ensureSchema() {
    if (schemaReady) return;

    const db = getPool();

    await db.execute(`
        CREATE TABLE IF NOT EXISTS participantes (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            nome VARCHAR(100) NOT NULL,
            idade TINYINT UNSIGNED NOT NULL,
            criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )
    `);

    await db.execute(`
        CREATE TABLE IF NOT EXISTS resultados (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            participante_id INT UNSIGNED NOT NULL,
            objetivo VARCHAR(30) NOT NULL,
            pontuacao TINYINT UNSIGNED NOT NULL,
            respostas_json LONGTEXT NOT NULL,
            criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            INDEX idx_resultados_participante (participante_id),
            CONSTRAINT fk_resultados_participante
                FOREIGN KEY (participante_id)
                REFERENCES participantes(id)
                ON DELETE CASCADE
        )
    `);

    schemaReady = true;
}

module.exports = async function handler(req, res) {
    try {
        await ensureSchema();
        const db = getPool();

        if (req.method === "GET") {
            const [rows] = await db.execute(`
                SELECT
                    r.id,
                    p.nome,
                    p.idade,
                    r.objetivo,
                    r.pontuacao,
                    r.criado_em
                FROM resultados r
                INNER JOIN participantes p
                    ON p.id = r.participante_id
                ORDER BY r.id DESC
                LIMIT 50
            `);

            return res.status(200).json({
                ok: true,
                total: rows.length,
                resultados: rows
            });
        }

        if (req.method !== "POST") {
            return res.status(405).json({
                ok: false,
                error: "Método não permitido."
            });
        }

        const {
            nome,
            idade,
            objetivo,
            pontuacao,
            respostas
        } = req.body || {};

        const idadeNumero = Number(idade);
        const pontuacaoNumero = Number(pontuacao);

        if (
            typeof nome !== "string" ||
            !nome.trim() ||
            nome.trim().length > 100 ||
            !Number.isInteger(idadeNumero) ||
            idadeNumero < 1 ||
            idadeNumero > 120 ||
            !["food", "productivity"].includes(objetivo) ||
            !Number.isInteger(pontuacaoNumero) ||
            pontuacaoNumero < 0 ||
            pontuacaoNumero > 100
        ) {
            return res.status(400).json({
                ok: false,
                error: "Dados inválidos."
            });
        }

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const [participante] = await connection.execute(
                "INSERT INTO participantes (nome, idade) VALUES (?, ?)",
                [nome.trim(), idadeNumero]
            );

            await connection.execute(
                `INSERT INTO resultados
                    (participante_id, objetivo, pontuacao, respostas_json)
                 VALUES (?, ?, ?, ?)`,
                [
                    participante.insertId,
                    objetivo,
                    pontuacaoNumero,
                    JSON.stringify(respostas || {})
                ]
            );

            await connection.commit();

            return res.status(201).json({
                ok: true,
                participanteId: participante.insertId
            });
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Erro MySQL:", error);

        return res.status(500).json({
            ok: false,
            error: "Não foi possível acessar o banco de dados."
        });
    }
};
