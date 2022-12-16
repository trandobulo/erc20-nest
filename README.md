[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Application for tracking transfer events of TAToken in Goerli testnet

## Installation

```bash
$ npm install
```

## Running the app

Before running the app you should create .env file with such rows:

| Const    | Type   | Description                |
| -------- | ------ | -------------------------- |
| HOSTNAME | string | Postgres database location |
| LOGIN    | string | Postgres database login    |
| PASS     | string | Postgres database password |
| PORT     | number | Postgres server port       |
| DATABASE | string | Postgres database name     |

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Functionality

| Query type | Endpoint           | Action                               |
| ---------- | ------------------ | ------------------------------------ |
| GET        | /transactions      | Get all events                       |
| GET        | /user/:userAddress | Get events from :userAddress address |
