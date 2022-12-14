[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Application for tracking transfer events og TAToken in Goerli testnet

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Functionality

| Query type | Endpoint           | Action                                |
| ---------- | ------------------ | ------------------------------------- |
| GET        | /transactions      | Get all events                        |
| GET        | /user/:userAddress | Get events from <userAddress> address |
