import { createConnecion } from 'mysql2';

const connection = createConnecion({
    host: "127.0.0.1",
    user: "root",
    password: "mysqlPW",
    database: "provami77",
})

  connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }

    console.log('Conectado com sucesso! ID: ' + connection.threadId);

})

export default connection; 