import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from "cors";

const conexao = await conectaNaDatabase(); 

conexao.on("error", (erro) => {
  console.error("Erro de conexão com o banco.", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!");
})

const app = express();
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
}));
app.options('*', cors());

routes(app);

export default app;
