# Authentic F&F Project Jumpstart

![Hello Bear](https://media.giphy.com/media/LBp3nxFfLFddu/giphy.gif)

Welcome! This is the guide you'll use to get your project up and running within our codebase. It goes over all of the ins and outs of getting set up, useful commands, and how to best optimize your development workflow.

Let's get started!

## Setting up your environment

Be sure your Node, Ruby, and PHP versions line up with what is listed here.

* Node, `v4.3.1`
* Ruby, `v2.0.0`
* PHP, `v5.5.34`

To check, open terminal and run the following commands, each of which should report the version number you are using.

* ```$ node -v```
* ```$ ruby -v```
* ```$ php -v```

## Setting up the codebase

### Step One: Clone the repository and install NPM packages

Use ```$ git clone``` to make a copy of this repo. Then, `cd` into your new project and run `npm install`

A bunch of commands should run in your terminal, and all of your NPM packages will install.

### Step Two: Adjust SCSS files

Open up the folder in your editor `public/assets/sass`

You'll see a file called `_foundation_clean.scss`. Rename this file to `_foundation.scss`.

This newly renamed `_foundation.scss` file is the main Foundation import file which loads our Foundation components. Inside the file, you'll see a long list of component `@include` statements which are commented out. We have them commented out to conserve space within our resulting CSS files.

As you're developing, if you need to include a component into the project, uncomment it from this list.

### Step Three: Take note of Foundation javascript

Inside your `main.js` javascript file, you'll a file named `foundation-init.js` is included. This file contains all of the Foundation javascript components, with the majority of them being commented out.

Similar to the SCSS process, if you need to include a Foundation javascript component into your project, uncomment it from this file.

### Step Four: Start Grunt

The majority of our code compiling and automation is handled by [Grunt](http://gruntjs.com/). If you're not already familiar with Grunt, take a quick look at the documentation to familiarize yourself with the syntax and how it works.

To start compiling your code, run the command `$ grunt watch`
