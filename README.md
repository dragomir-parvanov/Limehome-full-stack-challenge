## Instalation ##
The project uses yarn instead of npm.
The project was developed and tested on Node 14.x.x and Typescript 4.x.x
Just run the command 'yarn' to install all dependencies.

You will also need to specify environment files for each stage.

[setup environment files](https://i.imgur.com/4d5wEVQ.png)

and each .env file needs to have these properties

[.env file](https://i.imgur.com/qexN0ax.png)

After you are done, you can run yarn build to build the server and then the client.
If the building succeed, you can run yarn start to start the application.

Additional commands:

## yarn watch-client ## - starts the client in development mode

## yarn test-client ## - tests the client

## yarn lint ## - checking for any linting errors

## watch-server ## - starts the server in development mode

## test-server ## - runs all .node.spec.ts tests on Mocha

