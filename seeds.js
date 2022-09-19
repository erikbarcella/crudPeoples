const mongoose = require('mongoose');
const Pessoa = require('./models/pessoa');

//conexao com o bd
mongoose.connect('mongodb://localhost:27017/dbPessoas', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    console.log("Conexao com o db ligada com sucesso ")
})
.catch(err=>{
    console.log("Erro ao se conectar com o banco ")
    console.log(err)
})

const pessoa1 = new Pessoa({
    nome: 'erik',
    email: 'erikbarcella@gmail.com',
    cpf: '000-111-222-33'
})
const pessoa2 = new Pessoa({
    nome: 'vitoria',
    email: 'vitoria@icloud.com',
    cpf: '444.555.666-77'
})

Pessoa.insertMany([pessoa1,pessoa2])
.then(res =>{
    console.log(res)
}) .catch(err =>{
    console.log(err)
})