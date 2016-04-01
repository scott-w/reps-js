# Reps

[![Circle CI](https://circleci.com/gh/scott-w/reps-js.svg?style=svg)](https://circleci.com/gh/scott-w/reps-js)

A service that tracks workouts and progress in the gym for maximum gainz! Use
Reps to track your latest workouts and plot your next lifts


## System Requirements

This app is tested and runs on OS X El Capitan and Ubuntu 14.04, with Postgres
9.x.


## Installing dependencies

To install dependencies, install Node and NPM for your system and then:

```bash
git checkout git@github.com:scott-w/reps-js.git
cd reps-js
npm install --no-progress
```

You'll also need to install Postgres and create our database and tables:

```bash
npm run createdb  # Requires your sudo password
npm run migrate
```

### Installing on Ubuntu

[Install Node 5.x][install-ubuntu] then:

```
sudo aptitude install build-essential gcc g++
```

### Windows

This app depends on `bcrypt` which Windows has no default bindings for.
Windows users should [follow the bcrypt instructions][bcrypt].

## Running the server

Running a server is as easy as starting the NPM script:

```bash
npm run start
```

### Custom Configuration

The accepted values for NODE_ENV are `test`, `development`, `staging`, and
`production`.

We can also change the JWT secret key using the `JWT_PRIVATE_KEY` environment
variable.

## Building the Client App

To build the client-app, simply run:

```bash
npm run build
```

You can also do:

- `npm run compile` - Compile the application
- `npm run watch` - Constantly rebuild on changes


## Running the tests

To run server tests:

```bash
npm test
```

This will run using the [Lab](https://github.com/hapijs/lab) test runner.

To run the client tests:

```bash
npm run test:client
```

This will run the client-side tests in your browsers using the
[Karma](https://karma-runner.github.io) test runner.

## Running Everything

After configuring and installing everything, you can run a live system by
starting the following scripts:

```bash
npm run start
npm run watch
```

Now, simple navigate to `http://localhost:3000` to start running the app.

[bcrypt]: https://www.npmjs.com/package/bcrypt
[install-ubuntu]: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
