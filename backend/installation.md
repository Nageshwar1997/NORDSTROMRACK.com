## Backend Installation

### Install Backend

`npm init`

replace package.json with below text
`{
"name": "backend",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node index.js",
"dev": "nodemon index.js"
},
"author": "",
"license": "ISC"
}`

### Install nodemon, express, cors, dotenv, mongoose

`npm i nodemon express cors dotenv mongoose`

### Install MongoDB

`npm install mongodb`

### Install bcrypt

`npm i bcryptjs`

### Install JSON Web Token

`npm i jsonwebtoken`

### Install Cookie-Parser

`npm i cookie-parser`

### Install Stripe

`npm install --save stripe`
