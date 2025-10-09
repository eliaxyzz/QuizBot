-- ===========================
-- DATABASE: QuizBot.db
-- ===========================

-- ⚙️ Abilita chiavi esterne
PRAGMA foreign_keys = ON;

-- ===========================
-- 🧍 TABELLA UTENTI
-- ===========================
CREATE TABLE Utenti (
    Id_Utente      INTEGER PRIMARY KEY AUTOINCREMENT,
    Username       TEXT NOT NULL UNIQUE,
    Password       TEXT NOT NULL,
    Nome           TEXT,
    Cognome        TEXT,
    TelegramChatId TEXT          -- per collegare il bot
);

-- ===========================
-- ❓ TABELLA DOMANDE
-- ===========================
CREATE TABLE Domande (
    Id_Domanda INTEGER PRIMARY KEY AUTOINCREMENT,
    Domanda    TEXT NOT NULL,
    Categoria  TEXT,              -- es: Scienza, Storia, Logica, ecc.
    Difficolta TEXT DEFAULT 'Media'
);

-- ===========================
-- 💬 TABELLA RISPOSTE
-- ===========================
CREATE TABLE Risposte (
    Id_Risposta   INTEGER PRIMARY KEY AUTOINCREMENT,
    Fk_Domanda    INTEGER NOT NULL,
    Risposta      TEXT NOT NULL,
    Correttezza   TEXT CHECK (Correttezza IN ('True', 'False')),
    FOREIGN KEY (Fk_Domanda) REFERENCES Domande(Id_Domanda) ON DELETE CASCADE
);

-- ===========================
-- 🏆 TABELLA PARTITE
-- ===========================
CREATE TABLE Partite (
    Id_Partita INTEGER PRIMARY KEY AUTOINCREMENT,
    Fk_Utente  INTEGER NOT NULL,
    Punteggio  INTEGER DEFAULT 0,
    Data       TEXT DEFAULT (DATE('now')),
    FOREIGN KEY (Fk_Utente) REFERENCES Utenti(Id_Utente) ON DELETE CASCADE
);

-- ===========================
-- 🌱 DATI DI BASE 
-- ===========================
INSERT INTO Utenti (Username, Password, Nome, Cognome, TelegramChatId)
VALUES ('admin', 'adminpass', 'Admin', 'Quiz', '000000000'), 
('mario', 'mariopass', 'Mario', 'Rossi', '123456789'),
('luca', 'lucapass', 'Luca', 'Bianchi', '987654321'),
('anna', 'annapass', 'Anna', 'Verdi', '555666777');;



-- Domande esempio
INSERT INTO Domande (Domanda, Categoria, Difficolta)
VALUES 
('Qual è la capitale della Francia?', 'Geografia', 'Facile'),
('Chi ha scoperto la penicillina?', 'Scienza', 'Media'),
('In che anno è iniziata la Prima guerra mondiale?', 'Storia', 'Media'), 
('Qual è il simbolo chimico dell acqua?', 'Scienza', 'Facile'),
('Chi ha scritto "La Divina Commedia"?', 'Letteratura', 'Media'),
('Quale pianeta è noto come il Pianeta Rosso?', 'Astronomia', 'Facile'),
('In informatica, cosa significa CPU?', 'Tecnologia', 'Media'),
('Chi dipinse la Gioconda?', 'Arte', 'Facile');


-- Risposte esempio
INSERT INTO Risposte (Fk_Domanda, Risposta, Correttezza)
VALUES
(1, 'Parigi', 'True'),
(1, 'Roma', 'False'),
(1, 'Madrid', 'False'),
(1, 'Berlino', 'False'),

(2, 'Alexander Fleming', 'True'),
(2, 'Isaac Newton', 'False'),
(2, 'Albert Einstein', 'False'),
(2, 'Louis Pasteur', 'False'),

(3, '1914', 'True'),
(3, '1939', 'False'),
(3, '1918', 'False'),
(3, '1925', 'False'),
(4, 'H2O', 'True'),
(4, 'O2', 'False'),
(4, 'CO2', 'False'),
(4, 'NaCl', 'False'),

-- Domanda 5
(5, 'Dante Alighieri', 'True'),
(5, 'Giovanni Boccaccio', 'False'),
(5, 'Petrarca', 'False'),
(5, 'Leopardi', 'False'),

-- Domanda 6
(6, 'Marte', 'True'),
(6, 'Venere', 'False'),
(6, 'Giove', 'False'),
(6, 'Saturno', 'False'),

-- Domanda 7
(7, 'Central Processing Unit', 'True'),
(7, 'Computer Personal Unit', 'False'),
(7, 'Central Print Unit', 'False'),
(7, 'Control Processing Unit', 'False'),

-- Domanda 8
(8, 'Leonardo da Vinci', 'True'),
(8, 'Michelangelo', 'False'),
(8, 'Raffaello', 'False'),
(8, 'Caravaggio', 'False');
