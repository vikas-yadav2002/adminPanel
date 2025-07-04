# Express MySQL API

A structured Express.js application integrated with MySQL and secured with JWT authentication.

## Project Overview

This API provides endpoints for managing employees, clients, products, and orders with filtering capabilities and secure JWT authentication.

## Features

- JWT-based authentication
- MySQL database integration
- RESTful API architecture
- Clean MVC project structure
- Secure route protection
- Flexible setup (with Docker or local MySQL)
- Sample data loaded from `my_database.sql`



## Getting Started

You can set up the project using either:

- ✅ **Docker** (recommended)
- ✅ **Manual setup** (local MySQL)

---

## 🐳 Option 1: Docker Setup (MySQL + phpMyAdmin)

### Prerequisites

- Docker installed on your system

### Step-by-step Instructions

1. **Create Docker Network** (if not already created)

   ```bash
   docker network create mynetwork
 ### Run MySQL Container

```bash
docker run -d --name mysql-container 
  --network mynetwork 
  -e MYSQL_ROOT_PASSWORD=rootpassword 
  -e MYSQL_DATABASE=my_database 
  -p 3306:3306 
  mysql:latest
```
### Import the SQL Dump

#### Once the container is running, run this command to load the data:

```bash
docker exec -i mysql-container mysql -uroot -prootpassword my_database < my_database.sql>
```
#### Make sure my_database.sql is in the root directory of your project.

### Run phpMyAdmin Container

```bash
docker run -d --name phpmyadmin 
  --network mynetwork 
  -e PMA_HOST=mysql-container 
  -e PMA_USER=root 
  -e PMA_PASSWORD=rootpassword 
  -p 8080:80 
  phpmyadmin/phpmyadmin
```
`` Visit: http://localhost:8080``

### Configure .env

#### Create a .env file in your project root Similar to the env.sample or with:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=my_database
DB_PORT=3306

JWT_SECRET=your_jwt_secret
```
### Install Node.js Dependencies

```bash
npm install
```

### Start the App

```bash
npm run start
```
## ⚙️ Option 2: Manual Setup (Local MySQL)
### Prerequisites
#### Node.js (v14+)

#### MySQL (v5.7+)

## Step-by-step Instructions
#### Create Database

#### Login to MySQL and create the DB:
```bash
CREATE DATABASE my_database;
```

#### Import SQL File
```bash
mysql -u root -p my_database < my_database.sql
```

#### Configure .env

##### Create a .env file with your local DB credentials:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=my_database
DB_PORT=3306

JWT_SECRET=your_jwt_secret
```

#### Install Dependencies

```bash
npm install
```
#### Start the Server

```bash
npm run start
```
