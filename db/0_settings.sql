CREATE TABLE diner.settings (
    id_settings TEXT PRIMARY KEY,
    info text NOT NULL
);

INSERT INTO diner.settings (id_settings, info) VALUES (
    'store_name', 'Nome da loja'
)