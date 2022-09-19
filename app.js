const express = require('express');
const app = express();
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

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const path=require('path');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.redirect('/pessoa');
})

app.get('/pessoa',async (req,res)=>{
    const pessoas =await Pessoa.find({});
    res.render('pessoas/index', {pessoas});
})

app.get('/pessoa/new', (req,res) => {
    res.render('pessoas/new');
}) 

app.get('/pessoa/:id', async (req,res)=>{
    const {id} = req.params;
    const pessoa = await Pessoa.findById(id);
    res.render('pessoas/show', {pessoa});

})

app.post('/pessoa', async (req,res)=>{
    const novaPessoa = new Pessoa(req.body);
    await novaPessoa.save();
    res.redirect('/pessoa');
})

app.get('/pessoa/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const pessoa = await Pessoa.findById(id);
    res.render('pessoas/edit', {pessoa})
})

app.put('/pessoa/:id', async (req,res)=>{
    const {id}=req.params;
    await Pessoa.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect('/pessoa/'+id);
})

app.delete('/pessoa/:id', async (req,res)=>{
    const {id}=req.params;
    await Pessoa.findByIdAndDelete(id);
    res.redirect('/pessoa/')
})

let porta=3000;
app.listen(porta, ()=>{
    console.log("Servidor ligado na porta "+porta);
})