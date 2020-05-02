# REST API NodeJS

REST API desenvolvida em NodeJS com Express integrado a um banco de dados relacional (MariaDB)

## Conteúdo

- [Sobre](#sobre)
- [Introdução](#introducao)
- [Pré requisitos](#pre_requisitos)
- [Instalação](#instalacao)
- [Uso](#uso)
- [Dependências](#dependencias)

## Sobre <a id="sobre"></a>

O projeto visa a prática de NodeJS na construção de uma REST API, baseado na play list <a href="https://www.youtube.com/watch?v=d_vXgK4uZJM&list=PLWgD0gfm500EMEDPyb3Orb28i7HK5_DkR">Criando REST API com Node.JS</a> do canal <a href="https://www.youtube.com/channel/UCzQcwdnSkg0XydyCpC2Ng_g">Maransatto</a> no YouTube.

## Introdução <a id="introducao"></a>

As instruções que seguem são para o desenvolvimento do projeto de forma local. O servidor web roda na porta padrão do Express localhost:3000, o banco de dados foi instalado em um container [Docker](https://www.docker.com/) com uma image [Mariadb](https://hub.docker.com/_/mariadb) rodando na porta localhost:3380

### Pré requisitos <a id="pre_requisitos"></a>

Para rodar API é necessário ter instalado NodeJS, NPM, Banco de dados relacional e os pacotes de módulos listados nas dependências que dão suporte as funcionalidades da aplicação

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [NPM](https://www.npmjs.com/) - Package Manager
- [Express](https://expressjs.com/) - Server Framework
- [MySQL](https://www.mysql.com/) ou [MariaDB](https://mariadb.org/) - Database

### Instalação <a id="instalacao"></a>

Iniciar o projeto com o comando npm install para instalar todas as dependências do projeto.

```
npm install
```

Comandos SQL para criar o banco de dados

```
CREATE DATABASE my_db DEFAULT CHARACTER SET utf8 ;
```

```
USE my_db ;
```

```
CREATE TABLE usuarios (
id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(100) NOT NULL,
senha VARCHAR(100) NOT NULL);
```

```
CREATE TABLE produtos (
id_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
preco FLOAT NOT NULL,
imagem_produto VARCHAR(500) NULL);
```

```
CREATE TABLE pedidos (
id_pedido INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_produto INT NOT NULL FOREIGN KEY,
quantidade INT NOT NULL,
REFERENCES my_db produtos (id_produto));
```

## Uso <a id="uso"></a>

Para processar as requisições utilizar o aplicativo [Postman](https://www.postman.com/) configurando os métodos GET POST PUT DELETE com seus respectivos end points.
Para cadastrar, alterar ou deletar produtos é preciso estar logado por isso o primeiro passo é criar um usuário:

```
POST para cadastrar novo usuário:
http://localhost:3000/usuarios/cadastro
```

```
No Body selecionar raw no formato JSON
{
  "email": "teste@teste.com.br",
  "senha": "1234"
}
```

Após criado o primeiro usuário mudar o end point da requisição para fazer o login

```
POST para login usuário:
http://localhost:3000/usuarios/login
```

Enviar a requisição para fazer o login e gerar o token que será usado nas operações do produto como: inserir, alterar, deletar, copie o token gerado, selecione a guia authorization, em type selecione Bearer Token e cole o token para validar o usuário.

```
{
  "email": "teste@teste.com.br",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbS5iciIsImlhdCI6MTU4ODIwNDUwOSwiZXhwIjoxNTg4MjA4MTA5fQ.vRnDPU-IEKhQGFRQPXbIe6JzXfmjeYt1x42LxO_uBN4"
}
```

Para cadastrar produto, no Body selecione o formato de envio para form-data, passando os campos da tabela na exata sequência em que foram criados no banco: KEY nome VALUE xpto, KEY preco VALUE 18.90, KEY imagem_produto VALUE selecione um arquivo de imagem nos formatos jpeg ou png.

```
POST http://localhost:3000/produtos
```

Para alterar ou removerr um produto, passar o id no end point da requisição e no Body.
Alterar produtos:

```
PUT http://localhost:3000/produtos/3
```

```
No Body selecionar raw no formato JSON exemplo:
{
  "id_produto": 3,
  "nome": "xpto",
  "preco": "18.90"
}
```

Remover produtos:

```
DELETE http://localhost:3000/produtos/3
```

```
No Body selecionar raw no formato JSON exemplo:
{
  "id_produto": 3
}
```

Listar todos os produtos ou retornar um id específico:

```
GET http://localhost:3000/produtos ou .../produtos/id
```

cadastrar pedido

```
POST http://localhost:3000/pedidos/3
```

```
No Body selecionar raw no formato JSON exemplo:
{
  "id_produto": 3
}
```

## Dependências <a id="dependencias"></a>

- [MySQL](https://www.npmjs.com/package/mysql) para conectar a API ao DB

```

npm install mysql --save

```

- [Body-parser](https://www.npmjs.com/package/body-parser) para converter as requisições em JSON

```

npm install body-parser --save

```

- [Bcrypt](https://www.npmjs.com/package/bcrypt) para criptografia hash

```

npm install bcrypt --save

```

- [JWT](https://www.npmjs.com/package/jsonwebtoken) para gerar o token de autenticação de usuário

```

npm install jsonwebtoken --save

```

- [Morgan](https://www.npmjs.com/package/morgan) para gerar log das requisições HTTP

```

npm install morgan --save

```

- [Multer](https://www.npmjs.com/package/multer) para upload dos arquivos de imagens para o DB

```

npm install multer --save

```

- [Nodemon]() para reiniciar o servidor automaticamente após alterações no código

```

npm install nodemon --save-dev

```
