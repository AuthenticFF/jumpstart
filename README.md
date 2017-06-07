
# Authentic Form & Function Project Jumpstart

## Starting a Project

Before you create your project, make sure you have [Vagrant](https://www.vagrantup.com/) and [Virtual Box](https://www.virtualbox.org/wiki/Downloads) installed on your machine. Additionally, you'll need [NPM](http://blog.teamtreehouse.com/install-node-js-npm-mac).

If this is a new project, clone this repository `cd` into the codebase and run `$ npm install`. This will install all packages needed for development.

If this is an existing project, `cd` into the codebase and run `$ npm install`.

After, npm has installed you're able to create your development environment and start watching your code. To do this run `$ grunt dev`.

The first time `$ grunt dev` is run on your project, your Vagrant dev environment will be setup. This will take an extra minute or two, and you should see the details being run in terminal. After the initial setup, subsequent `$ grunt dev` commands will take a shorter amount of time, as the Vagrant dev environment has already been setup.

## Developing

To begin developing, use the command `$ grunt dev`, to begin automated code compilation.

When this task starts, it will:

1. Copy the `.pre-commit-sample` file into the `.git/hooks/pre-commit` file, to assist with auto-compilation on Git commit
2. Process any newly added icons into the `public/assets/icons/original` folder, making them available for icon embedding
3. Start your Vagrant dev environment
4. Open a Browser Sync session, which auto-injects updated CSS and JS files into the browser as you are developing.
5. Begin watching files for auto-compilation on save.

After the startup tasks have completed, and your terminal is showing `Waiting...` you're able to access your development server. This is located at `https://localhost:3000`

As you're developing, when you save your javasscript and scss files, all code should autocompile, which you should see in the terminal.

During development, your MySQL server is available at:

```
  Host: 127.0.0.1
  Username: root
  Password: root
  Port: 8889
```

Also, being that each Vagrant environment is unique, you'll only see databases for each project within that individual database connection. Meaning, if you need access to the database for an individual project, you will need to create a Vagrant session within that project to access the database.

## Commiting

When you commit code, a Git hook is run triggering code compilation. You should see this output after you commit.

## SVG Icons

The `grunticon` package allows us to embed SVG icons inside our markup, which we can style with CSS. To embed an icon:

1. Place the svg icons insde the `public/assets/icons/original` folder.
2. Kill and restart your `$ grunt dev` task, to process the icons, or run `$ grunt compile` within a new terminal window while the codebase is being watched.
3. Inside your markup, add the icon using this syntax: `<span class="icon icon-alert" data-grunticon-embed=""></span>` replacing "alert" with the name of your icon

## Deployments

Deployments have been reconfigured to use the Shipit automation tool. Shipit was modeled after Capistrano, so you'll more than likely notice similarities.

Before you can deploy, configure the Shipit configuration inside `shipitfile.js`

To deploy your code, based on the shipitfile.js configuration run `$ shipit [environment-name] deploy`

## Syncing Codebase

Many of the codebases have been configured to pull down the production database and uploaded files.

After configuring this within the `scripts/.env.sh` file run `$ grunt shell:syncdown` to pull down this data.

Note for hosts running MSQL 5.6+, you might run into an issue. To resolve the issue run the command `$ mysql_config_editor set --login-path=client --host=localhost --user=[USERNAME] --password` replacing [USERNAME] with the correct username, and then typing the password when prompted to.

## Converting to Craft

When the Jumpstart is created, the project does not use Caft. To convert the project to a Craft build, issue the command `$ grunt converttocraft`

## Vagrant

Vagrant has been configured to automatically start when the `$ grunt dev` task is run, and also to shutdown when the task is killed with `crtl + c`. That being said, it's possible these automations could fail, and it's a good idea to have a basic familiarity with vagrant commands to assist in this case.

In basic terms, Vagrant is a background process running an Ubuntu web server. There are 3 basic commands you can use to view, start, and end a  Vagrant process.

`$ vagrant status` will show you the status of the Vagrant box configured to this codebase. This command will indicate if the server is running or is stoped.

`$ vagrant up` will start a Vagrant session. This is the command automatically run during the `$ grunt dev` task.

`$ vagrant halt` will stop a Vagrant session. This is the command automatically run when the `$ grunt dev` task is killed.

If for some reason your `$ grunt dev` task gets stuck or was not properly shut down, it's possible your Vagrant box could still be running. Use the `$ vagrant status` task to determine this. If it says running, when you're not actively watching your code, run `$ vagrant halt` to shut down the active Vagrant session.
