# Authentic F&F Project Jumpstart

![Hello Bear](https://media.giphy.com/media/aSd5EtcwHqeuA/giphy.gif)

Welcome! This is the guide you'll use to get your project up and running within our codebase. It goes over all of the ins and outs of getting set up, useful commands, and how to best optimize your development workflow. Let's get started!

## Setting up our codebase

To install the required packages, setup Grunt, and convert the project over to a [craft](https://craftcms.com/) project, run `make install`

_Note:_ This will only work for internal Authentic F&F team members, as the repositories necessary to perform this conversion are private.

In order to get Foundation set up and configured, please:
* Copy the contents of ```/public/assets/styles/scss/_foundation_clean.scss``` into ```/public/assets/styles/scss/_foundation.scss```
* Copy the contents of ```/public/assets/styles/scss/foundation/_settings.scss``` into ```/public/assets/styles/scss/_settings.scss```

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

In order to turn them on, go into the `gruntfile.js` file and uncomment lines 149 and 150 down at the bottom.

```sh
$ grunt sync-down
```
The `sync-down` task pulls down any possible updates to the database that have been made off of your local machine. Whenever working with the staging server and multiple people, it's best to give this one a run through just to make sure you don't accidentally push up any conflicting database changes.

```sh
$ grunt get-content
```
The `get-content` task provides a similar function to the one above with the difference being that it pulls any new assets from the staging server and puts them into your local content directory. You'll probably have to run this one less often, but it's good to keep in mind.

* Compile to make sure everything is working, run `$ grunt compile`

## Commiting

When you commit your code, git hooks are setup to compile and minify your javascript, so that code run in production is optimized. You may see this happening after you commit. Don't worry it's normal.
