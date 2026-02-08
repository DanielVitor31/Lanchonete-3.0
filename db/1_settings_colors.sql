-- Garante que o schema diner existe
CREATE SCHEMA IF NOT EXISTS diner;
-- Criação da tabela
CREATE TABLE IF NOT EXISTS diner.settings_colors (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(40) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(20),
    value_current VARCHAR(45) NOT NULL,
    value_default VARCHAR(45) NOT NULL,
    value_test VARCHAR(45),
    calc_color NUMERIC(10, 2) [],
    based_thematic BOOLEAN NOT NULL DEFAULT FALSE
);
-- Limpeza e Inserção de Dados
TRUNCATE TABLE diner.settings_colors;
INSERT INTO diner.settings_colors (
        id,
        name,
        description,
        category,
        value_current,
        value_default,
        value_test,
        calc_color,
        based_thematic
    )
VALUES -- BRANDING / BASE
    (
        '--base-thematic',
        'Base Temática Principal',
        'Cor base usada para gerar a paleta temática.',
        'brand',
        'oklch(0.87 0.11 75.08)',
        'oklch(0.87 0.11 75.08)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--thematic',
        'Cor Temática Principal',
        'Cor principal da marca, usada em destaques.',
        'brand',
        'oklch(0.68 0.19 43.90)',
        'oklch(0.68 0.19 43.90)',
        NULL,
        '{-0.19, 0.08, -31.18}',
        TRUE
    ),
    -- MENU / CARDS
    (
        '--food-menu-fundo',
        'Fundo do Cardápio',
        'Cor de fundo da seção do cardápio.',
        'menu',
        'oklch(0.1408 0.0044 285.82)',
        'oklch(0.1408 0.0044 285.82)',
        NULL,
        NULL,
        TRUE
    ),
    (
        '--food-menu-escrita',
        'Texto do Cardápio',
        'Cor do texto principal no cardápio.',
        'menu',
        'oklch(1.00 0.00 0.00)',
        'oklch(1.00 0.00 0.00)',
        NULL,
        NULL,
        TRUE
    ),
    (
        '--food-menu-card-fundo',
        'Fundo do Card de Item',
        'Fundo dos cartões de produtos.',
        'menu',
        'oklch(0.69 0.16 47.31)',
        'oklch(0.69 0.16 47.31)',
        NULL,
        '{-0.24, 0.06, -30.09}',
        TRUE
    ),
    (
        '--food-menu-card-escrita',
        'Texto do Card de Item',
        'Texto dentro dos cartões de produtos.',
        'menu',
        'oklch(1.00 0.00 0.00)',
        'oklch(1.00 0.00 0.00)',
        NULL,
        NULL,
        TRUE
    ),
    -- ELEMENTOS ESPECÍFICOS
    (
        '--money',
        'Cor de Preços/Dinheiro',
        'Cor usada para destacar valores monetários.',
        'elements',
        'oklch(0.67 0.22 142.42)',
        'oklch(0.67 0.22 142.42)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--observations',
        'Texto de Observações',
        'Cor para textos de observação ou secundários.',
        'elements',
        'oklch(0.63 0.26 29.23)',
        'oklch(0.63 0.26 29.23)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--link',
        'Links e Âncoras',
        'Cor padrão para links e elementos clicáveis.',
        'elements',
        'oklch(0.53 0.226 257.213)',
        'oklch(0.53 0.226 257.213)',
        NULL,
        NULL,
        FALSE
    ),
    -- UI SYSTEM (DARK/LIGHT)
    (
        '--text-dark',
        'Texto Escuro Padrão',
        NULL,
        'system',
        'oklch(0.00 0.00 0.00)',
        'oklch(0.00 0.00 0.00)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--text-light',
        'Texto Claro Padrão',
        NULL,
        'system',
        'oklch(1.00 0.00 0.00)',
        'oklch(1.00 0.00 0.00)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--bg-dark',
        'Fundo Escuro Padrão',
        NULL,
        'system',
        'oklch(0.00 0.00 0.00)',
        'oklch(0.00 0.00 0.00)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--bg-light',
        'Fundo Claro Padrão',
        NULL,
        'system',
        'oklch(1.00 0.00 0.00)',
        'oklch(1.00 0.00 0.00)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--icon-dark',
        'Ícone Escuro',
        'Cor para ícones em fundo claro.',
        'system',
        'oklch(0.00 0.00 0.00)',
        'oklch(0.00 0.00 0.00)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--icon-light',
        'Ícone Claro',
        'Cor para ícones em fundo escuro.',
        'system',
        'oklch(1.00 0.00 0.00)',
        'oklch(1.00 0.00 0.00)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--border-dark',
        'Borda Escura',
        NULL,
        'system',
        'oklch(0.00 0.00 0.00)',
        'oklch(0.00 0.00 0.00)',
        NULL,
        NULL,
        FALSE
    ),
    (
        '--scrollbar-background',
        'Fundo da Scrollbar',
        'Fundo da barra de rolagem.',
        'system',
        'oklch(0.00 0.00 0.00 / 0.10)',
        'oklch(0.00 0.00 0.00 / 0.10)',
        NULL,
        NULL,
        FALSE
    );