# Reps

A service that tracks workouts and progress in the gym


## Installing dependencies

To install dependencies, install Node and NPM for your system and then:

  1. `sudo npm install -g sails`
  2. `git checkout git@github.com:scott-w/reps-js`
  3. `cd reps-js`
  4. `npm install`
  5. `npm install --dev`


You'll also need to install Postgres and create the following databases:

  1. `sudo -u postgres createuser -PRd workouts`
  2. `sudo -u postgres createdb -O workouts -T template0 -E UTF8 workouts`


## Running the server

This is just a Sails app, so just run:

```
sails lift
```


## Running the tests

If you've ran `npm install --dev` above, just run:

```
npm test
```
