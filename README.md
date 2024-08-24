## 📌 Getting Started

To run the project locally, follow these simple steps:

1. Clone this repository
```sh
  git clone https://github.com/rayfarandi/kelab
  cd kelab
```

2. Open in VSCode
```sh
  code .
```

3. install all the dependencies
```sh
  npm install
```

4. run the project
```sh
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT = 8888`

`DATABASE_URL=postgresql://postgres.kjfgjkfiljnyyrdsexca:jklmnoprstu123456CyxQYJKSabc@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`

`APP_SECRET=Ini4daLah$ecRe@t`


## API Reference

#### Login

```http
  POST /auth/login
```
#### Register

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `users` | `GET` | Get a list of users data |
| `users/:id` | `GET` | Get a detailed users data |
| `users` | `POST` | Insert a users data |
| `users/:id` | `PATCH` | Update a users data |
| `users/:id` | `DELETE` | Delete a users data |