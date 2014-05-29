This is the repo for the Optimizely /mobile landing page.

Note: There is currently no way to run this environment on the same user account that the optimizely/optimizely environment is installed in. optimizely/optimizely causes conflicts wtih npm and thus this environment will not run. To run this repo, you will need to run it in a different user account on your computer than the account that optimizely/optimizely is installed in.

##Quick start

###Step 1: Install node.js (and npm)

You can easily install both with the installer found on the [Node](http://nodejs.org/) website.

###Step 2: Clone this repo

[Clone](https://help.github.com/articles/fork-a-repo) this repo.

###Step 3: Install npm dependencies

Navigate to the repo directory. In the command line execute the following command:

`npm i`

All done!

##Working in the environment

The are two environment, prod and dev.

###dev

The dev environment starts up a node server on localhost that serves the landing page to your browser. It also has autoreload so that if you change any files, Grunt will compile the site and refresh your browser window.

To start the dev environment run this command: grunt server

###prod

Once you have finished making your changes in the dev environment, kill the dev server by running ctrl+c.

Then run this command: grunt build

The entire site will be built in /dist.

Copy the contents of /dist and transfer them to the optimizely/optimizely repo:

index.html -> /src/www/templates/website/mobile.html

css/styles.css -> /src/www/static/mobile/css/style.css

img/* -> /src/www/static/mobile/img/

js/* -> /src/www/static/mobile/js/

Deploy the changes to optimizely/optimizely
