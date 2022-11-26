const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database.js")
const PerguntaModel = require("./database/Pergunta_model.js")

//testar a conexão ao banco.
connection
    .authenticate()
    .then(()=>{
        console.log("Conectado ao mysql")
    })
    .catch((msgErro)=>{
        console.log(msgErro)
    })
const PORT = 8000;

//Configuração do EJS (View Engine)
app.set('view engine', 'ejs');
app.use(express.static('public'))

//configuração do body-parser
app.use(bodyParser.urlencoded({extended:false}));
//permite ler dados do formulario no formado json
app.use(bodyParser.json())

//Rotas
app.get("/home", (req, res)=>{
    //res.status(200).send({message: "Bem Vindo ao blog"});

});

app.get("/listar_pergunta", (req, res)=>{
    PerguntaModel.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas=>{
        //console.log(perguntas)
        res.render("home",{
            perguntas: perguntas
        });
    });

});

app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
})

app.post("/salvar_pergunta", (req, res)=>{
    //recebo os dados do formulario
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //pego os dados do formulario e mando pro meu model que vai salvar no banco
    PerguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        //redireciono para a home em caso de sucesso
        res.redirect("/listar_pergunta")
    })
    
})

app.listen(PORT,()=>{
    console.log(`Server executando na porta ${PORT}`)
})