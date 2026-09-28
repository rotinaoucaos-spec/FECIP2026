-- RoutineSync / FECIP 2026 - ETERJ
-- Banco MySQL básico para demonstração

CREATE TABLE IF NOT EXISTS participantes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    idade TINYINT UNSIGNED NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

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
);
