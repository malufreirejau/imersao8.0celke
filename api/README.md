SEQUENCIA PARA CRIAR O PROJETO
Criar o arquivo package
### npm init no terminal (na past api)
serve para criar o arquivo package que possui as infos do projeto e futuramente vai possuir as infos das dependencias que o proj vai ter

vou criar dependencia, pesquiso express npm no google
abro o site é lá tenho as instruçoes
Gerencia as requisições, rotas e urls, entre outras funcionalidades (ex quer acessar pag de login, rodar projeto, etc)
cria package-lock
### npm install express no terminal

copio lá o codigo const express (pode ser variável tb ao invés de constante) -> é uma função esse express
outra constante app copio as duas const
preciso rodar a função const express
crio 
### crio a pasta app.js para colocar
### const express = require('express')
### const app = express()
finalizo a linha de ambos com ; - não é obrigatório mas tem que seguir padrão ou finaliza todas ou não
copio a rota da página e coloco em seguida é a rota raiz por isso /
### app.get('/', function (req, res) {
###  res.send('Hello World')
### })

é app pq é o app que recebeu a instrução após executar a função express
get pq é visualizar 
porta raiz '/'
tou criando uma função
rec de requisição posso receber os dados por ex
res resposta send hello world

para poder acessar no navegador
agora preciso rodar o projeto
copio de lá tb
### app.listen(3000)
app e a função listen e a porta que será utilizada
mas vou apagar a porta 3000 e colocar a 8080

para rodar coloco no terminal node app.js (que é o arquivo raiz)

se eu mudar o hello world não vai atualizar
preciso pausar o servidor crtl+C
depois dar 
### node app.js de novo
vai aparecer atualizado

vou apresentar uma dependencia pra não precisar ficar pausando o servidor toda hora
primeiro na frente da porta 8080, crio uma função que vai ter um console.log pra imprimir a seguinte msg "SErvidor iniciado noa porta 8080 e o 
endereço onde ele inicia
### app.listen(8080, function(){
### console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
### });
agora pra não ter que parar e começar, pesquiso pela dependencia nodemon npm
acesso o site dele e copio de lá
instala o módulo para reiniciar o serv sempre que houver alteração no codigo fonte
g é globalmente
### npm install -g nodemon (-g pq estou instalando de forma global)
primeiro rodo ele no prompt de comando dentro da pasta api pq nunca rodei nesse computador, agora não precisa mais
reinicia o pc e depois coloca novamento no terminal do vscode

como utilizar a dependencia acima?
na pagina tem
eu coloco o nome da dependencia e o nome do projeto arquivo raiz
### nodemon [your node app]
então uso 
ctrl c para parar o terminal e em seguida
### nodemon [app.js]
qdo der ctrl s ele vai restartar sozinho

agora vou continuar trabalhando com as rotas no app.js
já tenho app.get sendo o get (listar) e eu altero ao invés do / (raiz) será /usuarios
e agora no chrome é localhost:8080/usuarios

e agora ao inves de ser send agora quero retornar os dados em formato json
e não será mais frase (bem vinda ou hello world) será um objeto
### res.json(
    erro: false,
    messagem: "Listar usuários!";
)

da erro
crio uma nova rota para realizar o login que não será get
será post e página de login
### app.post('/login', function (req, res) {
    res.json(
        erro: false,
        messagem: "Página de Login!"
  });

pesquiso pelo insomnia rest
faço download
no insomnia cria uma nova colection
new request colection semana_imersao_8_0
cria new request
listar tipo get confirmar

crio a rota
a requisição deve ser feita para o localhost:8080/usuarios

agora crio new request login metodo post enviados textos em json
requisição para o endereço http://localhost:8080/login
clico em send e aparece

Lá no post Login do Insomnia
(textos em json)
### {
	"usuario": "malufreirejau@yahoo.com.br",
	"senha": "123456"
}

no app.js apos o app.post
coloco um para ver se estou recebendo
### console.log(req.body.usuario)
é body pq está vindo no corpo e estou enviando a posição usuário

deu erro pq o projeto não está pronto para receber os dados em formato json

então abaixo do const app = expres();
uso o app do express, a função use

### app.use(express.json());

se eu der um console.log só em req.body vou receber usuario e senha (antes o req.body.usuarios era só pra usuario

agora tenho objeto em json {
	"usuario": "malufreirejau@yahoo.com.br",
	"senha": "123456"
}
se der console.log em req.body.senha só aparece a senha no terminal

agora vou validar o login
acrescendo se req.body.usuario for igual 'malufreirejau@yahoo.com.br' e a senha for igual identica '123456' 
os dados estão corretos entao posso colocar uma msg de sucesso
se não msg que foi inválido
### app.post('/login', function (req, res) {
    //console.log(req.body)
    if(req.body.usuario === 'malufreirejau@yahoo.com.br' && req.body.senha === '123456'){
        res.json({
            erro: false,
            messagem: "Login válido!",
            dados: req.body
  });
}
    res.json({
        erro: true,
        messagem: "Login ou Senha Incorreto!"
        

    })
});  

o valor está fixo mas é mais facil explicar

pára indicar que user está logado será usado jwt -> json web token
é um padrão que defini como transmitir e armazenar dados ou objetos json de forma compacta segura em diferentes aplicações
os dados nela contidos podem ser validados a qquer momento pois o token é assinado digitalmente

tenho a api q cria o token e em seguida o administrativo front end faz uma requisição para api e o api gera o token e da pro adm
e qdo o administrativo vier fazer uma nova requisição para a api pode validar
ex: api enviou o token 123
o administrativo recebeu e salvou em algum lugar
em seguida o administrativo pegou esse token 123 e fez um requisição para a api enviando o token
a api valida e se esse token é válido somente a api que pode validar e através dele consigo saber se o user tá logado ou nao
abaixo do login valido e antes do ultimo fechamento dele }
para usar eu PESQUISO a dependencia dele no google (json web tokens), abro o site da dependencia e procuro o site do jwt npm e
copio como devo instalar

ctrl c no terminal
cls para limpar

### npm install --save jsonwebtoken 
o --save serve pra falar que quero add a dependencia no arquivo package (estará dentro dele em dependencia)

agora preciso importar essa dependencia na parte do app.js
abaixio do const app
### const jwt = require('jsonwebtoken');
essa constante recebe o require pq quero incluir qual dependencia

la no app depois do meu if, depois que validei os dados crio uma const id que vai ter o id do usuario e que futuramente virá do DB
mas por enqto coloco um valor estático
### const { id } = 1;

tb crio uma chave privada para nenhum outro projeto usar e posso gerar online no generate.plus, um hexadecimal string e colo
### var privateKey = '7b70f5eae75ea0227c5b'
agora qdo user enviar um token, ele será validado através dessa chave

se não for correspondente ñao vai funcionar

depois crio var que vai receber o token q é jwt, login q é sign, td que quero acrescentar nesse token (id, minha chave única e um objeto
que vai indicar qto tempo ele vai demorar pra vencer)
### var token = jwt.sign({id}, privateKey,{
            expiresIn: 600 //10mins
        })

para testar vou no res de resposta coloco
### res.json({
            erro: false,
            messagem: "Login válido!",
            token: token // ou token se for versão mais nova do node

já vai dar certo e aparecer no insomnia o erro false messagem login valido e o token
posso mandar esse token pro administrativo front end e ele salvar la´e qdo fizer uma requisição envia pra api pra api validar

### {
  "erro": false,
  "messagem": "Login válido!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMxMjI4NTMsImV4cCI6MTYyMzEyMzQ1M30.KR-wopABvA1n3Gt2FLDjMT663haSEWLYr5319zgXUus"
}

posso pegar minha privatekey e tirar do código e colocar num arquivo separad
para isso pesquiso a dependencia npm dotenv
pauso o servidor com ctrl c e clico o comando
### npm install --save dotenv
ela gerencia variáveis de ambiente - consigo colocar uma var e recupera-la em qquer lugar

e preciso criar um arq .env na raiz e crio lá uma variável que vai ser a chave secreta
### SECRET = '7b70f5eae75ea0227c5b'
agora não preciso mais alterar a chave no projeto nem procurar pq vai estar nessa constante

para incluir coloco no app abaixo a const jwt
### require('dotenv').config()

após incluir eu recupero usando process.env. e o nome
e coloco essa variável global no lugar onde estava o numero da chave
### var privateKey = process.env.SECRET

AGORA preciso acrescentar os cabeçalhos pq no insomnia eu consigo fazer a requisição correta mas se fizer externa não vou conseguir
para isso precisamos pesquisar a dependencia npm cors
para permitir o acesso a api
pauso o servidor e instalo
### npm install --save cors

rodo o projeto novamente 
### nodemon app.js

volto no site preciso do express e do cors
copio e colo abaixo do require 'dotenv' mas troco var por const
### const cors = require('cors')
ja estou rodando o express
preciso agora do app.use(cors()) mas vou usa-lo diferente com mais funcionalidades e ponho abaixo da linha do app.use(express.json)
### app.use((req, res, next() => )
vou ter requerimento, resposta, um middler - eu fiz a requisição mas antes de ele rodar qquer instrução do projeto vai executar o 
middler que vai estar dentro de uma função e nessa função que preciso colocar instruçoes que estão na pagina do cors npm nas opções
de configuraçoes, copio o comando Access-Control-Allow-Origin  que é um header e qual url pode fazer a requisição por ex a url
especifica ou qquer url "*"
depois abaixo tenho os metodos e copio de lá o relativo a metodos

em seguida vejo o que temos em allowedHeaders e copio a instrução como res de resposta
conten-type pq envio um conteúdo pro projeto e autorization para receber o token e o x-pingother

mais um next pra informar q se deu tudo certo no app use que coloquei agora que continue o processamento
e tb falou a insturção do cors 
### app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X_PINGOTHER, Content-Type, Authorization");
    app.use(cors())
    next();

});

faltou o return antes dos res.json

assim, o usuário já está enviando os dados, já estou recebendo em formato json, tou indicando q qquer url pode fazer 
se eu já tenho o token já posso verificar se ele enviou o token válido

agora quero que sej obrigada o user estar logado pra listar

chamo uma função eAdmin (que ainda não tenho então será validar token) após o '/usuarios' do app.get

antes do app.listen...
### //Verificar se o token é valido e so entao user vai acessar
### async function validarToken(req, res, next){
###    return res.json({messagem: "Validar o token!"})
### }

dei um return não aconteceu o processamento
então eu quero validar e receber o token
vou atribuir isso a uma constante

### //Verificar se o token é valido e so entao user vai acessar
async function validarToken(req, res, next){
    const authHeader = req.headers.authorization;
    return res.json({authHeader});
}

ao enviar no insomnia o objeto voltou vazio {}
Preciso colocar o token que o usuário recebe qdo executa o login
copio o token, vou no listar, e aqui preciso enviar esse token

vou em auth
bearer token pq quero enviar um token
e envio
recebi {
  "authHeader": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMxMjI4NTMsImV4cCI6MTYyMzEyMzQ1M30.KR-wopABvA1n3Gt2FLDjMT663haSEWLYr5319zgXUus"
}

pq o admin mandou o token e ele voltou validade
quero separar o bearer do token sem a palavra bearer

na const authHeader eu crio uma const [] onde a primeira posição é o texto bearer e a segunda o token e um espaço em bco separando
essa const vai ser pra separar (split) pelo espaço em branco
### //Verificar se o token é valido e so entao user vai acessar
async function validarToken(req, res, next){
    const authHeader = req.headers.authorization;
    const [Bearer, token] = authHeader.split(' ')
    return res.json({Bearer, token});

    agora na const eu ignoro a primeira posição, deixo a virgula
### //Verificar se o token é valido e so entao user vai acessar
async function validarToken(req, res, next){
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ')
    return res.json({token});
}

vou no enviroment do insonia
no gerenciador
e no base enviroment
coloco
{ "URL": "http://localhost:8080/", "TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMxMjI4NTMsImV4cCI6MTYyMzEyMzQ1M30.KR-wopABvA1n3Gt2FLDjMT663haSEWLYr5319zgXUus" } e qdo eu precisar do token pego lá essa variavel, constante local
dai no login no post em cima posso colocar _.URL/login
no listar _.URL/usuarios

mto bom fazer isso pq a variável guarda independente no url que vc coloca na pagina, vc só altera no gerenciador de enviroment

e o token tb só preciso mudar no enviroment (ele está pra mudar a kd 10mins seria trabalhoso)
vai no bearer e colocar a constante token _.TOKEN

so vou ver se tem o token sem validar
### //Verificar se o token é valido e so entao user vai acessar
async function validarToken(req, res, next){
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ')
    
    if(!token){
        return res.json({
            erro: true,
            message: "Erro: Token Inválido!"
        });
    }
    return next();

    para validar o token utilizo
 try e catch (aqui posso receber o erro)
 na parte superior apos const coss eu crio uma const
 ### const{promisify} = require('util")
 // quero importar do util a funcao promisify - consigo converter as funçoes em promisify e agora não tenho call ther e uso async e await

 no try eu chamo o promisify que importei e utilizo jwt pq é atraves dele criptografei e o verify pq quero verificar o token q preciso enviar tb a chave secreta
 e coloco o decode para recuperar a id que verificou se user ta logado e é ele q recupero
 e o decode eu atribuo como constantante antes do await

 ###  try{
        const decode = await promisify(jwt.verify)(token, process.env.SECRET);
        req.userId = decode.id; //req de requisicao e user id do valor que eu quiser
        return next();
    }catch(err){
        return res.json({
            erro: true,
            message: "Erro: Token Inválido!"
        });
    }

o validar token está nessa pagína
se eu quiser usar em outro lugar como faco para recuperar
melhor criar novo diretorio middlewares e coloca o validar token
dentro do diretorio crio nova file auth.js

e dentro dele importo const jwt - require(jsw)


