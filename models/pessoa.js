const mongoose = require('mongoose');

//models 
const pessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    cpf:{
        type: String,
        required: true
    }
})

const Pessoa = new mongoose.model("Pessoa", pessoaSchema)

module.exports = Pessoa;