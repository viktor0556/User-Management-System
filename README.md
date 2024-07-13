## Built with

- [React](https://react.dev/)
- [Node](https://nodejs.org/en) (v16.20.0)

To get a local copy of the code, clone it using git:

```
git clone https://github.com/viktor0556/User-Management-System.git
```

Install dependencies:

```
npm install
```

**Database setup:** The application uses PostgreSQL for database management. Make sure you have PostgreSQL installed on your system and create a database for the project.

## PostgreSQL initialization and database creation

1. Download: https://www.postgresql.org/download/
2. Create a database: Open a PostgreSQL service such as pgAdmin or psql. Log in with the appropriate user and then create a new database for the project.
3. Create tables: After you have created the database, create tables to store the necessary data. The following example shows how to create a simple question table:
```
psql -U postgres

CREATE DATABASE user_management_db;

\c user_management_db

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
);

```

4. Setting environment variables: After you have created the database and tables, don't forget to set the project environment variables so that the application can connect to the database. For example:
```
# .env file
PG_USER=username
PG_HOST=hostname
PG_DATABASE=database_name
PG_PASSWORD=passowrd
PG_PORT=port
```
These variables are usually stored in the .env file and must be set in the appropriate location to use them in the project.

Now, you can start a local web server by running:

# Start the server-side application
```
nodemon src/server.ts
If you want to restart the server but do not want to exit the server, write "rs" in the nodemon terminal
```
