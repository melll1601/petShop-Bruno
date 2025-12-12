/*const nome = document.getElementById("nome")
const email = document.getElementById("email")
const senha = document.getElementById("senha")*/

import { execute } from 'database.js'

export default async function saveUser(nome, email, senha){

    const sql = "INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)"
    const setData = ["nome", "email", "senha"]
    
    try{

        const [rows] = await execute(sql, setData)

    } catch (error){

    }

}

