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
npm install
npm install --dev
```

You'll also need to install Postgres and create our database and tables:

```bash
sudo -u postgres createuser -PRd workouts
sudo -u postgres createdb -O workouts -T template0 -E UTF8 workouts
npm run-script migrate
```

### Windows

This app depends on `bcrypt` which Windows has no default bindings for.
Windows users should [follow the bcrypt instructions][bcrypt].

## Running the server

Running a server is as easy as starting the NPM script:

```bash
npm run-script start
```

### Custom Configuration

The accepted values for NODE_ENV are `test`, `development`, `staging`, and
`production`.

We can also change the JWT secret key using the `JWT_PRIVATE_KEY` environment
variable.


## Building the client-side application

The client application uses the latest dev build of Marionette 3. To build
Marionette:

1. Install gulp globally: `npm i -g gulp --no-progress`
2. Download the latest Marionette code from Github:
  `git clone https://github.com/marionettejs/backbone.marionette.git`
3. Switch to the `next` branch:
  `git fetch origin next/next && git checkout next`
4. Install the dependencies: `npm i --no-progress`
5. Build: `gulp build`

Then, from `reps-js`, install Marionette: `npm i ../backbone.marionette --no-progress`


## Running the tests

If you've ran `npm install --dev` above, just run:

```bash
npm test
```

## Running Everything

After configuring and installing everything, you can run a live system by
starting the following scripts:

```bash
npm run-script start
npm run-script serveassets
npm run-script watch
npm run-script proxy
```

The `watch` script will recompile the client JS, `serveassets` serves the JS,
CSS, and index file. The `proxy` script binds everything behind
`http://localhost:8000`

[bcrypt]: https://www.npmjs.com/package/bcrypt
