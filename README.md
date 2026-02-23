# Teste Leek Soluções: Kayan Pereira

Este é um sistema de gerenciamento de tarefas com autenticação de usuário, desenvolvido com **Next.js** no front-end e **NestJS** no back-end.

O projeto permite criar, atualizar, listar e remover tarefas, além de gerenciar usuários autenticados via **JWT**.

---

## 📌 Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) ativo
- Gerenciador de pacotes (**NPM** ou **Yarn**)

---

## 🚀 Instalação e Execução

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Kayan33/fullstack-teste.git
cd fullstack-teste
```

---

### 2️⃣ Instale as dependências

Instale separadamente no **Backend** e no **Frontend**:

```bash
# Backend
cd Backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 3️⃣ Configure o .env do Backend

Crie um arquivo `.env` dentro da pasta **Backend**:

```env
DATABASE_URL="postgresql://postgres:SUA-SENHA@localhost:5432/DATABASE_AQUI"
JWT_SECRET="HY0HUp9Vse60TRyaC7iwCrrX0txEZOgIzSh0qNdkokA"
URL_FRONT_LOCAL="http://localhost:3000"
```

⚠️ Substitua:
- `SUA-SENHA` pela senha do seu PostgreSQL
- `DATABASE_AQUI` pelo nome do banco criado
- `URL_FRONT_LOCAL` pode deixar dessa forma

---

### 4️⃣ Configure o .env do Frontend

Crie um arquivo `.env` dentro da pasta **frontend**:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Essa variável define a URL base da API.

---

### 5️⃣ Execute as migrations (Prisma)

Dentro da pasta **Backend**, execute:

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

---

### 6️⃣ Inicie o projeto

#### Backend

```bash
npm run start:dev
```

Servidor rodará em:
```
http://localhost:3001
```

#### Frontend

```bash
npm run dev
```

Aplicação rodará em:
```
http://localhost:3000
```
---

## Documentação da API (Swagger)

documentação da API estará disponível em:

```
http://localhost:3001/docs
```
