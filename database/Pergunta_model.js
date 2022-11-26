const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const connection = require("./database.js");

const Pergunta_model = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta_model.sync({force: false}).then(()=>{
    console.log("Tabela: pergunta, acabou de ser criada")
});

module.exports = Pergunta_model;