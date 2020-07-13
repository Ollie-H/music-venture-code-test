# music-venture-code-test
Small React application that interacts with the Spotify API (https://developer.spotify.com/documentation/web-api/) - a free API that provides various endpoints to retrieve data related to Spotify's music repertoire.

### Technical decisions & process

For the write up on the technical decisions & process please see [./TECHNICAL_WRITEUP.md](./TECHNICAL_WRITEUP.md) 

### Getting started

Requirements:
* Node >= 8.10 and npm >= 5.6
* A spotify account

Steps:
* [ ] Clone project `git clone git@github.com:Ollie-H/music-venture-code-test.git`
* [ ] Build project `yarn install`
* [ ] Start project `yarn run start`
* [ ] Navigate to http://localhost:3000
* [ ] On initial startup you will be redirected to a spotify login to authorise the application (You will require a spotify account to authenticate)

### Other useful commands

* Run tests - `yarn run test:watch`
* Run linting - `yarn run lint`
* Build app - `yarn run build`


### CI

CI tasks are ran in a github actions workflow, config can be found in [/.github/workflows/build-branch.yml](/.github/workflows/build-branch.yml)
