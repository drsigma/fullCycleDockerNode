const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

function insertData(connection) {
    const sql = `INSERT INTO people(name) values('Wesley')`;
    connection.query(sql, (err) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
        }
        connection.end();
    });
}

function connectWithRetry(retries = 5, delay = 3000) {
    const connection = mysql.createConnection(config);

    connection.connect(err => {
        if (err) {
            console.error(`Erro ao conectar no MySQL: ${err.message}`);
            if (retries > 0) {
                console.log(`Tentando novamente em ${delay / 1000}s... (${retries} tentativas restantes)`);
                setTimeout(() => connectWithRetry(retries - 1, delay), delay);
            } else {
                console.error('Não foi possível conectar ao MySQL após várias tentativas.');
                process.exit(1);
            }
        } else {
            console.log('Conectado ao MySQL com sucesso!');
            insertData(connection);
        }
    });
}

connectWithRetry();

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>');
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
