# Authentic F&F Project Jumpstart

![Hello Bear](https://media.giphy.com/media/LBp3nxFfLFddu/giphy.gif)

Welcome! This is the guide you'll use to get your project up and running within our codebase. It goes over all of the ins and outs of getting set up, useful commands, and how to best optimize your development workflow.

Let's get started!

## Setting up our local environment  
Inside the project directory, you'll find a `craft-template.sql` file. This SQL
file contains all of the basic configuration settings in order to get our craft
project up and running. Using Sequel Pro, create a database for your project,
and import the `craft-template.sql` file into the newly created database.  

You'll also want to make sure that you are up to date with `Node`, `Ruby`, and `PHP`.  

To check your Node version, run `node -v` in your terminal. At the time of writing this documentation, we're currently using Node `4.3.1`, so you'll want to have at least that or higher. To check your Ruby version, run `ruby -v`. You'll at least want to have `2.0.0` in order to get things running. Finally, for PHP it's much of the same. Run `php -v`. You version should at least look like `5.5.34`. If you need to update any of those, do so before going on. Good to go? Let's move on.

## Setting up our codebase

To install the required packages, setup Grunt, and convert the project over to a [craft](https://craftcms.com/) project, run `make install`

_**Note:**_ This will only work for internal Authentic F&F team members, as the repositories necessary to perform this conversion are private.

In order to get your project set up and configured, please:
* Copy the contents of ```/public/assets/styles/scss/_foundation_clean.scss``` into ```/public/assets/styles/scss/_foundation.scss```
* Copy the contents of ```/public/assets/styles/scss/foundation/_settings.scss``` into ```/public/assets/styles/scss/_settings.scss```
* Copy the contents of ```/public/index.html``` into ```craft/templates/_layout.html``` and then rename ```/public/index.html``` to ```/public/_index.html``` so that templates are served correctly.

Once you're up and running, you'll have to go into the `db.php` file, which can be located in the `craft/config` directory and update the database name to correlate with the one you created in Sequel Pro.

Finally, you'll have to configure a local Apache server with MAMP and point it
to the ```projectname/public``` directory in order to serve your project.  

If done correctly, you can now navigate to ```projectname.local``` and your
project should be live and ready to work on.

## Watching your files

When you are writing code, you'll want Grunt to watch your files for changes.

* Run `$ grunt watch` to start the watch process.
* When running, each time you save a sass or JS file grunt will compile the changes and automatically reload the browser window with your changes.

## Grunt Tasks  
The majority of the behind the scenes work is done by our task runner, [Grunt](http://gruntjs.com/). If you're not already familiar with Grunt, take a quick look at the documentation to familiarize yourself with the syntax and how it works.

### Main Tasks  
```sh
$ grunt hookmeup
```
The `hookmeup` task updates your pre-commit hook to lint JS before commiting your code.

```sh
$ grunt init
```
The `init` task copies over all of the necessary [Foundation](http://foundation.zurb.com/) files that we use in our projects

```sh
$ grunt compile
```
The `compile` task does exactly what you might expect. It compiles our code and concatenates our JS into a friendly, browser-readable format.  

All three of these tasks are run automatically when setting up the project using the `make install` command. If setting up the repository manually, these will have to be run individually in order to get the desired result.

### Other Tasks  
These tasks are useful later on in the development process when you'll be migrating content to and from the staging server. They are turned off by default.  

In order to turn them on, go into the `gruntfile.js` file and uncomment lines 10, 11, 149, and 150.

```sh
$ grunt sync-down
```
The `sync-down` task pulls down any possible updates to the database that have been made off of your local machine. Whenever working with the staging server and multiple people, it's best to give this one a run through just to make sure you don't accidentally push up any conflicting database changes.

```sh
$ grunt get-content
```
The `get-content` task provides a similar function to the one above with the difference being that it pulls any new assets from the staging server and puts them into your local content directory. You'll probably have to run this one less often, but it's good to keep in mind.

_**Important:**_ In order for these tasks to work, you'll have to configure both the `deployments.json` and `rsync.json` files which can be found in `./config/settings/...`

You'll have to update the `database` field in the `deployments.json` file as well as the source path in the `rsync.json` file in order to get the commands to work properly.

## Commiting

When you commit your code, git hooks are setup to compile and minify your javascript, so that code run in production is optimized. You may see this happening after you commit. Don't worry it's normal.

## Deploying

In the `config` directory, you'll find a file named `deploy.rb`. This is where all of our deployments are handled, the settings for which can be found in the `deployments.json` file in the `settings` directory.  

We deploy our code with one simple command:
```
bundle exec cap deploy
```

This tells ruby to execute all of the commands listed out in our deploy file. I usually do this in conjunction with a push to master when working with our staging server, so that command looks something like this:
```
git push && bundle exec cap deploy
```

That's everything you need to know to get up and running the Authentic way. Need more information? Check the resources below.

## Documentation Resources
* [Craft CMS](https://craftcms.com/docs/introduction)
* [ZURB Foundation](http://foundation.zurb.com/sites/docs/v/5.5.3/)
* [Twig Templating Language](http://twig.sensiolabs.org/documentation)
* [Sequel Pro](http://www.sequelpro.com/docs/category/getting-connected)
* [MAMP](https://www.mamp.info/en/documentation/)
