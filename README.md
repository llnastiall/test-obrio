<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">NestJS Notification App</h1>

<p align="center">
  Scalable and modular NestJS application that handles user registration and sends delayed notifications using RabbitMQ and BullMQ.
</p>

---

## 🚀 Description

This project demonstrates a modular microservice-based architecture built with **NestJS**, where:

- 🐇 **RabbitMQ** is used for communication between microservices.
- ⏳ **BullMQ** handles delayed job processing (e.g. notifications).
- 🌐 **Axios** sends notification requests via HTTP webhooks.
- ⚙️ **ConfigModule** manages environment variables and config.
---
### 🧠 How It Works

1. User registers via the **API Gateway**.
2. The **Users Service** saves the user to the database.
3. A delayed job is scheduled via **BullMQ** to send a notification after 24 hours.
4. When the time passes, **BullMQ Worker** sends a **webhook** to a predefined URL.

---

## ⚙️ Configuration

1. Create a `.env` file in the root directory of the project based on `.env.example`.
2. Make sure all required environment variables are set (e.g., `WEBHOOK_URL`, `DB_HOST`, `REDIS_HOST`, `RABBITMQ_URL`, etc.).

Install dependencies:

 ```bash 
 npm i 
 ```

Run the project using Docker:
```bash
docker-compose up --build
```

---
## 📌 Features
Two microservices: api and users

A single users table (PostgreSQL + TypeORM)

A webhook is sent 24 hours after user registration

Webhook URL is configured via .env

## 🧰 Technologies Used
* NestJS
* PostgreSQL + TypeORM
* RabbitMQ
* Redis
* BullMQ
* Axios
* Docker