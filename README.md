HTML Project Jumpstart
=======================

## Purpose

The purpose of this codebase is to hold a standardized architecture to quickly build and deploy an HTML based site. There is no server-side language for this.

This codebase uses many build tools to automate various development related tasks on the front-end.

## Tools

### NPM

Node Package Manager is a package manager for Node apps :)

Seriously though, NPM is to Node Packages what Bundler is to RubyGems. Each NPM Package we download helps us automate something on the front end. Some of the ones we use help us concatinate our javascript together, other help us migrate databases between envrionments.

Packages we want installed are located in the `package.json` file.

### Browserify

Browserify is a dependency/bundling manager for JavaScript files that we use on our site. It tries to eliminate the pattern of:
"Oh I used this 5MB library on two pages of the 100 page site, I guess I better load it on all 100 pages even though its never used" which happens if you concat and minify all your JavaScript.
It's essentially a way to include and name dependencies at the top of a js file with "var foo = require('./magicJSFIle.js')". It can also be used to include common libraries (Backbone, jQuery, Underscore) but more niche JavaScript files will have to be shimed in via [NPM](https://github.com/thlorenz/browserify-shim).

### Grunt

Grunt is a task runner used for automating tasks during a build process. Compile your sass? Grunt can handle that. Minify Javascript? Grunt can do that. Compress images? Grunt can do that...

### Compass

Compass gives us super valuable SASS mixins so that we're not worrying browser prefixes as they change. It also watches concatenates on the fly.

## Setting up our codebase

* Update package.json, adding any additional NPM packages we want
* Install our NPM Packages, run `$ npm install`


* Update your pre-commit githook to lint JS before commiting, run `$ grunt hookmeup`

* Copy Foundation and other files, run `$ grunt init`
* Combile Bower for the first time, run `$ grunt compile`

## Watching your files

When you are writing code, you'll want Grunt to watch your files for changes.

* Run `$ grunt watch` to start the watch process.
* When running, each time you save a sass file compass will compile the changes.
* When running, each time you save a javascript file, it will minify the JS

While writing code, if you install a new JS asset with Bower, you'll want to compile your code again to include the new plugin. Run `$ grunt compile` to do that.

## Commiting

When you commit your code, git hooks are setup to compile and minify your javascript, so that code run in production is optimized. You may see this happening after you commit. Don't worry it's normal.

## Converting Jumpstart to EE Project

You will need to cd into the config/converters directory, then run bash convertToEE.sh at the command line. This should copy over the EE repo assets.

_Note:_ This will only work for internal Authentic F&F team members, as the repositories necessary to perform this conversion are private.

