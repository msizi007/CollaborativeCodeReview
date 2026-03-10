## Collaborative Code Review

#### How to install

1. create the .env file with the values

```bash
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=codereviewdb
DB_PASSWORD=[db_password]
DB_PORT=5432

# Auth
JWT_SECRET=secrets_are_awesome
```

2. clone the project from github

```bash
git clone https://github.com/msizi007/CollaborativeCodeReview.git
```

3. install all the dependencies

```bash
npm install
```

4. run the app using npm run dev

```bash
npm run dev
```

5. Register for an account

6. Login to get the **bearer token** and use it to query for other routes

#### Tech Stack

- Express
- Postgres
- NodeJS
