import { execute } from 'database.js';

// const email = document.getElementById("#")
// const password = document.getElementById("#")

async function emailExists(email){

    const sql = "SELECT COUNT(*) From Usuario WHERE email = ?";
    const changeData = [email]

    try{

        const [rows] = await execute(sql, changeData)
        const totalEncontrado = rows[0].total;

        return totalEncontrado > 0

    } catch(error){

    }
}


async function authentication(email){

    const sql = "SELECT password FROM Usuario WHERE email = ?"
    const changeData = [email]

    try{
        
        const rows = await execute(sql, changeData)

        return rows[0];

    } catch(error){

    }
}