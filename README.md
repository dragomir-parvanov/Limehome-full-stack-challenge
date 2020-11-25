## Instalation ##
The project uses yarn instead of npm.
The project was developed and tested on Node 14.x.x and Typescript 4.x.x
Just run the command 'yarn' to install all dependencies.

You will also need to specify environment files for each stage.

[setup environment files](https://i.imgur.com/4d5wEVQ.png)

and each .env file needs to have these properties

[.env file](https://i.imgur.com/qexN0ax.png)

The node applications pick the environment file, based on the process.NODE_ENV, so to specify which environment file you want to use.
You have to specify it with setting the NODE_ENV environment variable prior running a command. Example on Linux and Mac:

### NODE_ENV=production yarn watch-server ###

After you are done, you can run yarn build to build the server and then the client.
If the building succeed, you can run yarn start to start the application.

Additional commands:

 yarn watch-client  - starts the client in development mode

 yarn test-client  - tests the client

 yarn lint  - checking for any linting errors

 yarn watch-server  - starts the server in development mode

 yarn test-server  - runs all .node.spec.ts tests on Mocha

