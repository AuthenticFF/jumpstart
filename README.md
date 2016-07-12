# Authentic F&F Project Jumpstart

## Setting up our codebase

* Install our NPM Packages, run `$ npm install`
* Update your pre-commit githook to lint JS before commiting, run `$ grunt hookmeup`
* Copy Foundation and other files to our codebase, run `$ grunt init`
* Copy the contents of ```/public/assets/styles/scss/_foundation_clean.scss``` into ```/public/assets/styles/scss/_foundation.scss```
* Copy the contents of ```/public/assets/styles/scss/foundation/_settings.scss``` into ```/public/assets/styles/scss/_settings.scss```

* Combile to make sure everything is working, run `$ grunt compile`

## Watching your files

When you are writing code, you'll want Grunt to watch your files for changes.

* Run `$ grunt watch` to start the watch process.
* When running, each time you save a sass file grunt will compile the changes.
* When running, each time you save a javascript file, it will minify the JS

## Commiting

When you commit your code, git hooks are setup to compile and minify your javascript, so that code run in production is optimized. You may see this happening after you commit. Don't worry it's normal.

## Converting Jumpstart to EE or Craft Project

You will need to cd into the config/converters directory, then run bash convertToEE.sh at the command line. This should copy over the EE repo assets.

_Note:_ This will only work for internal Authentic F&F team members, as the repositories necessary to perform this conversion are private.

Welcome to Craft!

Here are some online resources you might find useful:


Craft Docs
-----------------------------------------------------------------
Installation instructions and much more.
https://buildwithcraft.com/docs


Craft Updates
-----------------------------------------------------------------
Release notes with bug fixes, improvements and additions.
https://buildwithcraft.com/updates


Craft Stack Exchange
-----------------------------------------------------------------
A great place to ask your Craft questions, meet the awesome Craft community and earn mad reputation.
https://craftcms.stackexchange.com/
