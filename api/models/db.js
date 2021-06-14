const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("celke", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

/*sequelize.authenticate().then(function(){
      console.log("Conexão o banco de dados realizado com sucesso!");

  }).catch(function(err){
      console.log("Erro: Conexão o banco de dados não realizado com sucesso!");

  });*/

module.exports = sequelize;
