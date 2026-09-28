const mysql = require("mysql2/promise");

module.exports = async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            ok: false,
            error: "Método não permitido."
        });
    }

    if (!process.env.MYSQL_URL) {
        return res.status(503).json({
            ok: false,
            database: "mysql",
            error: "MYSQL_URL não configurada."
        });
    }

    let connection;

    try {
        connection = await mysql.createConnection(process.env.MYSQL_URL);
        await connection.execute("SELECT 1");

        return res.status(200).json({
            ok: true,
            database: "mysql",
            message: "Conexão com MySQL funcionando."
        });
    } catch (error) {
        console.error("Erro ao testar MySQL:", error);

        return res.status(500).json({
            ok: false,
            database: "mysql",
            error: "Falha na conexão com MySQL."
        });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};
