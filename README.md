# NORDSTROMRACK.com

# Frontend Installation

### Tailwind CSS

npm install -D tailwindcss
npx tailwindcss init

`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

### React Router DOM

npm install react-router-dom

### React Icons

npm install react-icons --save

### Install Toast

npm i react-toastify

# Backend Installation

### Install Backend

npm init

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

npm i nodemon express cors dotenv mongoose

### Install MongoDB

npm install mongodb

### Install bcrypt

npm i bcryptjs

### Install JSON Web Token

npm i jsonwebtoken
