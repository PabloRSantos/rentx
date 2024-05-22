<h1 align="center">
	<img alt="Logo" src=".github/logo.svg" width="200px" />
</h1>

<h3 align="center">
  RentX
</h3>

<p align="center">Uma api feita para alugueis de carros</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/PabloRSantos/rentx-api">

  <a href="https://www.linkedin.com/in/pablo-rosa-68136a1b2/">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Pablo%20Rosa-gree">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/PabloRSantos/rentx-api">
  
  <a href="https://github.com/PabloRSantos/rentx-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PabloRSantos/rentx-api">
  </a>
  
  <a href="https://github.com/PabloRSantos/rentx-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/PabloRSantos/rentx-api">
  </a>
  
</p>

<p align="center">
  <a href="#-about-the-project">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=RentX%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsaymondamasio%2Frentx-api%2Fmain%2Finsomnia.json" target="_blank"><img      src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 👨🏻‍💻 Sobre o projeto

<p>Essa API tem como objetivo administrar um sistema de alugueis de carros, tem como funcionalidade a criação e autenticação de um novo usuário, o cadastro de um novo carro, suas especificações e imagens, a criação de um aluguel para um carro disponível, criar a baixa da devolução do carro e a listagem de todos os alugueis de um usuário</p>

<!-- To see the *web client*, click here: [PROJECT_NAME Web](https://github/saymondamasio/rentx-web)</br>
To see the *mobile client*, click here: [PROJECT_NAME Mobile](https://github/saymondamasio/rentx-mobile) -->

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [Handlebars](https://handlebarsjs.com/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Tsyringe](https://github.com/microsoft/tsyringe/)
- [Date.js](https://day.js.org/)
- [Sentry](https://sentry.io/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [GithubActions](https://github.com/features/actions/)

## 💻 Getting started

Importe o `Insomnia.json` no aplicativo Insomnia, ou clique no botão [Run in Insomnia](#insomniaButton)

### Requerimentos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com//)


*Clone o projeto e acesse sua pasta*

bash
$ git clone https://github.com/saymondamasio/rentx-api.git && cd rentx-api


*Siga os passos abaixo*

bash
# Instale as dependências
$ yarn

# Cria as instâncias do banco de dados usando o docker
$ docker compose -d up

# Ou crie manualmente as instâncias
docker run --name postgres-db -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres

docker run --name mongo-db -p 27017:27017 -d mongo

docker run --name redis-db -p 6379:6379 -d redis

# Renomeie o arquivo ormconfig.example.json para ormconfig.json

mv ormconfig.example.json ormconfig.json

# Com os serviços ativos, rode as migrations
$ yarn typeorm migration:run

# Por último, inicie a aplicação
$ yarn dev



## 🤔 Como contribuir

*Faça um fork desse repositório e siga os passos abaixo*

bash
# Clone seu fork
$ git clone your-fork-url && cd NOME_DO_REPO

# Cria uma branch com sua feature
$ git checkout -b my-feature

# Faça um ou mais commits com suas alterações
$ git commit -m 'feat: My new feature'

# Envie seu código para a o github
$ git push origin my-feature


Após isso, crie um pull request com suas alterações.


---

Made with 💜 &nbsp;by Pablo Rosa 👋 &nbsp;[Veja meu linkedin](https://www.linkedin.com/in/pablo-rosa-68136a1b2/)