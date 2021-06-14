const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const cors = require('cors');
const { eAdmin } = require('./middlewares/auth');
const Usuario = require('./models/Usuario');

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X_PINGOTHER, Content-Type, Authorization'
  );
  app.use(cors());
  next();
});

app.get('/usuarios', eAdmin, async function (req, res) {
    await Usuario.findAll({order: [['id', 'DESC']]}).then(function(usuarios){
        return res.json({
        erro: false,
        usuarios
        
      });

    }).catch(function(){
      return res.json({
        erro: true,
        messagem: "Erro: nenhum usuário encontrado!",
      });

    });
});

app.get('/usuario/:id', eAdmin, async (req, res) => {
    await Usuario.findByPk(req.params.id).
    then(usuario => {
      return res.json({
        erro: false,
        usuario
      });

    }).catch(function(){
        return res.json({
        erro: true,
        messagem: "Erro: usuário não encontrado!",
      });

    });

});

app.post('/usuario', async (req, res) => {
  var dados = req.body;
  dados.senha = await bcrypt.hash(dados.senha, 8);

  await Usuario.create(dados)
    .then(function () {
      return res.json({
        erro: false,
        messagem: "Usuário cadastrado com sucesso!",
      });
    })
    .catch(function () {
      return res.json({
        erro: true,
        messagem: "Erro: usuário não cadastrado com sucesso!",
      });
    });
  });

app.put('/usuario', eAdmin, async (req, res) => {
  var dados = req.body;
  dados.senha = await bcrypt.hash(dados.senha, 8);
  
    await Usuario.update(dados, { where: {id: dados.id}}).
    then(function(){
      return res.json({
          erro: false,
          messagem: "Usuário editado com sucesso"
      });
    }).catch(function(){
      return res.json({
          erro: true,
          messagem: "Erro: Usuário não editado"
      });
   });
});

app.delete('/usuario/:id', eAdmin, async (req, res) => {
    await Usuario.destroy({where: {id: req.params.id}}).
    then(function(){
        return res.json({
            erro: false,
            messagem: "Usuário deletado com sucesso!"
      });

    }).catch(function(){
      return res.json({
          erro: true,
          messagem: "Erro: Usuário não deletado"
      });
    })

})

app.post('/login', async (req, res) => {

  const usuario = await Usuario.findOne({where: {email: req.body.usuario} });
  if(usuario === null){
      return res.json({
        erro: true,
        messagem: "Erro: Usuário ou a senha incorreta!"
      });
  }

  if(!(await bcrypt.compare(req.body.senha, usuario.senha))) {
      return res.json({
        erro: true,
        messagem: "Erro: Usuário ou a senha incorreta!",
      });
  }

    var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
      // expiresIn: 600 //10 min qdo quero por minutos
      expiresIn: "365d", //365 dias
    });

    return res.json({
      erro: false,
      messagem: "Login realizado com sucesso!",
      token,
    });
  
});

app.listen(8080, function () {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});
