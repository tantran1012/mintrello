# ℹ️ MinTrello Project

This is the Trello clone project for learning purpose. Source from @TrungQuanDev

## 🔥 Prerequisites

    - NodeJS 20.11.1
    - MongoDB

## 🚀 How to start for testing

- Rename **.env.example** to **.env** or create new **.env** file and copy all text to your **.env**
- Edit your database in **.env** file
- Open terminal, start backend and frontend

```bash
cd backend
yarn dev
```

```bash
cd frontend
yarn dev
```

## ⚙️ How to build and deploy

- Open terminal in each folder and type this script

```bash
yarn build
```

- The project is divided into two parts: frontend and backend. Therefore, we need to build these two components independently and deploy them to separate hosting environments. It’s necessary to set up the environment variables for hosting the backend part.

## Technical is used

- Frontend
  - ReactJS
  - Redux-toolkit
  - DnD-Kit
  - Material UI
  - Build tool: ViteJS
- Backend, Database
  - Nodejs, ExpressJS, RESTFul APIs
  - MongoDB
