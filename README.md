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

### ** 2 Instale as dependências**
```sh
npm install
```

### ** 3 Configure as variáveis de ambiente**
Crie um arquivo chamado .env e coloque a url do banco e porta padrão da aplicação, como no .env.example

### ** 4 Rode as migrações**
```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

### ** 5 Opcional(verificar a tabela do banco de dados)**
```sh
npx drizzle-kit studio
```

### ** 6 Coloque dados no banco de dados**
```sh
npm run seed
```
### ** 7 Rode o projeto**
```sh
npm run dev
```

### ** 8 Verifique a rota com a documentação**
http://localhost:3333/docs



