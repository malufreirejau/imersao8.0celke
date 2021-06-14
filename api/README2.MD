verificar a versão do MySQL instalado na máquina

### mysql -u root -p

criar base de dados no workbench

### create database celke character set utf8mb4 collate utf8mb4_unicode_ci;

crio past models
file db.js

pesquisar dependencia npm mysql2
instalar o drive do banco de dados

### npm install --save mysql2

ctrl c no terminal e colo esse comando

preciso de biblioteca q gerencie o banco de dados sql
busco npm sequelize e aceso o sequelize.org
biblioteca js que facilita o gerenciamento de um banco de dados SQL

### npm install --save sequelize

vou na documentação sequelize no site
versão 6
e procuro como conectar com banco de dados e vou colocar no db.js

### const { Sequelize } = require('sequelize');

//agora estou instanciando o sequelize e passando paramentros

### const sequelize = new Sequelize('database', 'username', 'password', {

    host: 'localhost',
    dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */

});

busco dependendcia bcryptjs npm
instalar modo para criptograr a senha

### npm install --save bcryptjs

preciso incluir
### var bcrypt = require('bcryptjs'); mas uso const não var


