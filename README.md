# Nufreq Services

This Node.js application is to provide APIs for the UI client to set numbers and display the frequency of the set numbers. It is generated using [typescript-express-starter](https://github.com/ljlm0402/typescript-express-starter).

## Frameworks / Tools

- Express.js
- Typescript
- Nodemon
- Jest
- ESlint

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the prodcution mode.

### `npm run dev`

Runs the app in the development mode.\
The server will be listening to `http://localhost:8000` by default. The port number can be overridden by setting environment variable `PORT`.

### `npm run test`

Runs all the unit tests.

### `npm run lint`

Runs lint check and prettier check. If you want to auto-fix them, run `npm run lint:fix`.

### `npm run build`

Compile and build the application to `dist` folder

## Considerations / Improvements

- User sessions are stored in memory for simplicity sake. This approach, however, is not suitable for production / not scalable. Because if we have multiple instances of the server, the requests may go to a server that doesn't have the session unless there is a sticky session mechanism. Also the memory consumption may increase dramatically if there are a lot of users. A proper approach will be to use an external session solution, e.g Redis.
- CORS setting could be stricter to mitigate security risk
- More unit tests to prevent regression
- Use docker for development and production deployment
