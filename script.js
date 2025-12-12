async function salvar() {
    const nome = "Daniel";
    const email = "daniel@email.com";
    const senha = "freefire2017";

    await fetch("http://localhost:3000/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
    });

}

salvar();
