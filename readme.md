**_Still in Development_**

# Friends Wordle

Currently deployed on an AWS Elastic Container Service cluster using the included buildspec.yml
https://friendswordle.co.uk/

## Install

```
npm install
```

## Run locally

To run locally, use the webpack dev server configuration by running the below:

```
npm start
```

## How to build

To build static files, use the webpack prod configuration by running the below:

```
npm run build
```

## Docker

Alternatively, create a docker container with the multi-stage dockerfile included:

```
docker build -t friends-wordle .
```

Then start the service:

```
docker run --rm -it -p 8080:80 friends-wordle

```
