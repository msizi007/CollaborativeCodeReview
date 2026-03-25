## Collaborative Code Review

![CollaborativeCodeReview](https://socialify.git.ci/msizi007/CollaborativeCodeReview/image?language=1&owner=1&name=1&stargazers=1&theme=Light)

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

This document outlines the API endpoints for the Collaborative Code Review Platform based on the current `server.ts` and Router configurations.

### Authentication

**Base Route:** `/api/auth`

| Method | Endpoint    | Auth Required |
| :----- | :---------- | :------------ |
| `POST` | `/register` | No            |
| `POST` | `/login`    | No            |

- User Object

```json
{
  "username": "msizi007",
  "email": "msizi@example.com",
  "password": "StrongPassword123!"
}
```

---

### User Management

**Base Route:** `/api/users`

| Method   | Endpoint | Auth Required |
| :------- | :------- | :------------ |
| `GET`    | `/`      | No\*          |
| `GET`    | `/:id`   | No\*          |
| `PUT`    | `/:id`   | No\*          |
| `DELETE` | `/:id`   | No\*          |

---

### Projects & Members

**Base Route:** `/api/projects`  
_(All routes below require the `protect` middleware)_

| Method   | Endpoint            | Auth Required |
| :------- | :------------------ | :------------ |
| `GET`    | `/`                 | Yes           |
| `POST`   | `/`                 | Yes           |
| `GET`    | `/:id`              | Yes           |
| `PUT`    | `/:id`              | Yes           |
| `DELETE` | `/:id`              | Yes           |
| `GET`    | `/:id/members`      | Yes           |
| `POST`   | `/:id/members`      | Yes           |
| `DELETE` | `/:id/members/:uid` | Yes           |

- Project Object

```json
{
  "title": "E-Commerce API",
  "description": "A Node.js backend for a digital storefront."
}
```

---

### Code Submissions

**Base Route:** `/api/submissions`

| Method   | Endpoint              | Auth Required |
| :------- | :-------------------- | :------------ |
| `GET`    | `/`                   | No\*          |
| `POST`   | `/`                   | No\*          |
| `GET`    | `/:id`                | No\*          |
| `PATCH`  | `/:id/status`         | No\*          |
| `DELETE` | `/:id`                | No\*          |
| `GET`    | `/:id/comments`       | No\*          |
| `GET`    | `/:pid/comments/:cid` | No\*          |
| `POST`   | `/:id/comments`       | No\*          |

- Submission Object

```json
{
  "title": "Auth Middleware Fix",
  "content": "router.use(protect); const checkRole = ...",
  "project_id": 1,
  "status": "pending"
}
```

---

### Comments

**Base Route:** `/api/comments`

| Method   | Endpoint | Auth Required |
| :------- | :------- | :------------ |
| `PUT`    | `/:id`   | No\*          |
| `DELETE` | `/:id`   | No\*          |

- Comment Object

```json
{
  "content": "This logic looks clean, but check for null values on line 12.",
  "submission_id": 10
}
```

---

> **Legend & Implementation Notes:**
>
> - **Yes**: Route is protected by the `protect` middleware.
> - **No\***: These routes currently lack the `protect` middleware in your provided code snippets.
> - **Owner/Admin**: Logic should be implemented in controllers to ensure only authorized users can `PUT` or `DELETE` specific resources.

## Author

M.S Mwelase
