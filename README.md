
# Authentic Form & Function Project Jumpstart

#### v2.0

Our jumpstart repo has been updated with a more streamlined configuration, to make project creation and ongoing maintenance
more consistent and easier to manage for all developers.

Major 2.0 changes include:

- Reconfigration of Javascript and SCSS compilation
- Removal of forced copying of Foundation files into assets directory
- Removal of Live Reload, replaced with Browser Sync
- Removal of Capistrano for code deployments, replaced by Shipit
- Addition of SVG icon embedding
- Addition of Vagrant as a development server, replacing MAMP

## Starting a Project

Before you create your project, make sure you have [Vagrant](https://www.vagrantup.com/) and [Virtual Box](https://www.virtualbox.org/wiki/Downloads) installed on your machine.

To start a project, clone this repository `cd` into the codebase and run `$ npm install`. This will install all packages needed for development.

After, npm has installed you're able to create your development environment and start watching your code. To do this run `$ grunt dev`.

The first time `$ grunt dev` is run on your project, your Vagrant dev environment will be setup. This will take an extra minute or two, and you should see the details being run in terminal. After the initial setup, subsequent `$ grunt dev` commands will take a shorter amount of time, as the Vagrant dev environment has already been setup.

## Developing

To begin developing, use the command `$ grunt dev`, to begin automated code compilation.

When this task starts, it will:

1. Copy the `.pre-commit-sample` file into the `.git/hooks/pre-commit` file, to assist with auto-compilation on Git commit
2. Process any newly added icons into the `public/assets/icons/original` folder, making them available for icon embedding
3. Start your Vagrant dev environment
4. Open a Browser Sync session, which auto-injects updated CSS and JS files into the browser
5. Begin watching files for auto-compilation on save.

After the startup tasks have completed, and your terminal is showing `Waiting...` you're able to access your development server. This is located at `http://localhost:3000`

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

Before you can deploy, configure the Shipit configuration inside `Gruntfile.js`

Shipit has 4 distinct deployment components

1. Codebase deployments `$ grunt shipit:[environment-name] deploy`
2. Shared file linking `handled by deploy task`
3. Database downloads `$ grunt shipit:[environment-name] db:pull`
4. Asset downloads `$grunt shipit:[environment-name] assets:pull`

Similar to Capistrano, after commiting and pushing your code to the remote repository, run the deploy task to run the deployment.

When pulling or pushing databases, a new `database` folder will be created in your repository holding database dumps and backups.

Note: for local and remote servers running MySQL v5.6+, there needs to be an additional manual configuration on the server, to remove a warning created during Database syncing:

On the environment showing the error, issue the command `$ mysql_config_editor set --login-path=client --host=localhost --user=[USERNAME] --password` replacing [USERNAME] with the correct username, and then typing the password when prompted to.

## Converting to Craft

When the Jumpstart is created, the project does not use Caft. To convert the project to a Craft build, issue the command `$ grunt converttocraft`

## Vagrant

Vagrant has been configured to automatically start when the `$ grunt dev` task is run, and also to shutdown when the task is killed with `crtl + c`. That being said, it's possible these automations could fail, and it's a good idea to have a basic familiarity with vagrant commands to assist in this case.

In basic terms, Vagrant is a background process running an Ubuntu web server. There are 3 basic commands you can use to view, start, and end a  Vagrant process.

`$ vagrant status` will show you the status of the Vagrant box configured to this codebase. This command will indicate if the server is running or is stoped.

`$ vagrant up` will start a Vagrant session. This is the command automatically run during the `$ grunt dev` task.

`$ vagrant halt` will stop a Vagrant session. This is the command automatically run when the `$ grunt dev` task is killed.

If for some reason your `$ grunt dev` task gets stuck or was not properly shut down, it's possible your Vagrant box could still be running. Use the `$ vagrant status` task to determine this. If it says running, when you're not actively watching your code, run `$ vagrant halt` to shut down the active Vagrant session.
