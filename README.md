# **Gym-Node API** 🏋️‍♂️🚀  

Este é um projeto **Node.js** com **Fastify**, **Drizzle ORM** e **PostgreSQL**, criado para gerenciar usuários e seus objetivos fitness.  

---

## **📌 Tecnologias Utilizadas**
✅ **Node.js** - Runtime JavaScript  
✅ **Fastify** - Framework web rápido e eficiente  
✅ **Drizzle ORM** - ORM leve e flexível para TypeScript  
✅ **PostgreSQL** - Banco de dados relacional  
✅ **Zod** - Validação de schemas  
✅ **Swagger** - Documentação da API  

---

## **⚡ Como Rodar o Projeto**
### ** 1 Clone o Repositório**
```sh
git clone https://github.com/seu-usuario/gym-node.git
cd gym-node
```
### ** 2 Instale as dependências**
```sh
npm install
```

### ** 3 Rode as migrações**
```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

### ** 4 Coloque dados no banco de dados**
```sh
npm run seed
```
### ** 5 Rode o projeto**
```sh
npm run dev
```

### ** 6 Verifique a rota com a documentação**
http://localhost:3333/docs



