# Reps

[![Circle CI](https://circleci.com/gh/scott-w/reps-js.svg?style=svg)](https://circleci.com/gh/scott-w/reps-js)

A service that tracks workouts and progress in the gym for maximum gainz! Use
Reps to track your latest workouts and plot your next lifts


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

When the client-side JS is written, this will need to be written.


## Running the tests

If you've ran `npm install --dev` above, just run:

```bash
npm test
```

[googleplus]: https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md
