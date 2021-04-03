# eureka-platform

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Eureka Web App
> A responsive web app built on Vue 3 and Firebase that aims to help MUM SoIT students find teammates, mentors, and upcoming events.

[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

We're building the go-to platform for Monash University Malaysia students to explore relevant tech events & to build their next team.

## Pre-requisites

Please make sure to have the following installed 

* [Node.js](https://nodejs.org/en/download)
* [VueCLI](https://cli.vuejs.org/guide/installation.html)

## How to Contribute

Follow these steps to setup the project:

1. Fork this repository
2. Clone the forked repository
3. Run the following command
```sh
npm install
```
4. Add the environment file. To do this, add a '.env' file to the root folder and make add the following inside:
```sh
VUE_APP_FIREBASE_API_KEY=AIzaSyBtNOw1Jf-4gOtmoHvz9qjmEp_DvVzerLA
VUE_APP_FIREBASE_PROJECT_ID=eureka-development-860d4
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=352539377412
VUE_APP_FIREBASE_APP_ID=1:352539377412:web:a9c49cb6afce7aa082da51
```
5. Create your feature branch (`git checkout -b branch-name`)
6. Commit your changes (`git commit -am 'Add some fooBar'`)
7. Push to the branch (`git push -u origin branch-name`)
8. Create a new Pull Request
