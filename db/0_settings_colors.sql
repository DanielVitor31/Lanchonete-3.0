CREATE TABLE diner.settings_colors (
    id_settings_colors UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(30) NOT NULL UNIQUE,
    value VARCHAR(50) NOT NULL,
    value_default VARCHAR(50) NOT NULL,
    calc_color numeric(10,2)[],
    based_themaatic BOOLEAN NOT NULL
);

TRUNCATE TABLE diner.settings_colors;
INSERT INTO diner.settings_colors
(name, value, value_default, calc_color, based_themaatic)
VALUES
('--base-tematica', 'oklch(0.87 0.11 75.08 / 1.00)', 'oklch(0.87 0.11 75.08 / 1.00)', NULL, FALSE),
('--tematica', 'oklch(0.68 0.19 43.90 / 1.00)', 'oklch(0.68 0.19 43.90 / 1.00)', '{-0.19,0.08,-31.18}', TRUE),
('--dinheiro', 'oklch(0.67 0.22 142.42 / 1.00)', 'oklch(0.67 0.22 142.42 / 1.00)', NULL, FALSE),
('--escrita-dark', 'oklch(0.00 0.00 0.00 / 1.00)', 'oklch(0.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--escrita-light', 'oklch(1.00 0.00 0.00 / 1.00)', 'oklch(1.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--icon-dark', 'oklch(0.00 0.00 0.00 / 1.00)', 'oklch(0.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--icon-light', 'oklch(1.00 0.00 0.00 / 1.00)', 'oklch(1.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--fundo-dark', 'oklch(0.00 0.00 0.00 / 1.00)', 'oklch(0.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--fundo-light', 'oklch(1.00 0.00 0.00 / 1.00)', 'oklch(1.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--observations', 'oklch(0.63 0.26 29.23)', 'oklch(0.63 0.26 29.23)', NULL, FALSE),
('--borda-dark', 'oklch(0.00 0.00 0.00 / 1.00)', 'oklch(0.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--escrita-buttons', 'oklch(1.00 0.00 0.00 / 1.00)', 'oklch(1.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--escrita-tematica', 'oklch(0.68 0.2 43.5 / 1.00)', 'oklch(0.68 0.2 43.5 / 1.00)', NULL, FALSE),
('--link', 'oklch(0.53 0.226 257.213 / 1.00)', 'oklch(0.53 0.226 257.213 / 1.00)', NULL, FALSE),
('--scrollbar-backgroud', 'oklch(0.00 0.00 0.00 / 0.10)', 'oklch(0.00 0.00 0.00 / 0.10)', NULL, FALSE),
('--fundo-neutral', 'oklch(0.96 0 0 / 1.00)', 'oklch(0.96 0 0 / 1.00)', NULL, FALSE),
('--footer-text', 'oklch(1.00 0.00 0.00 / 1.00)', 'oklch(1.00 0.00 0.00 / 1.00)', NULL, FALSE),
('--footer-border', 'oklch(0.92 0.19 101.41 / 1.0)', 'oklch(0.92 0.19 101.41 / 1.0)', NULL, FALSE),
('--footer-fundo', 'oklch(0.00 0.00 0.00 / 1.00)', 'oklch(0.00 0.00 0.00 / 1.00)', NULL, FALSE);



