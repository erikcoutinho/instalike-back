import express from "express"; // Importa o framework Express.js para criar a aplicação web
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do Express.js, que será nosso servidor web
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => { // Inicia o servidor na porta 3000
    console.log("Servidor escutando..."); // Mensagem de log para indicar que o servidor está rodando
});