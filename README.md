
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

## Starting a Project

To start a project, clone this repository and run `$ npm install`. This will install all packages needed for development.

Next, open your `Gruntfile.js` and replace placeholder variables. Only the `proxy` option within the `browserSync` task is required for development. It should
be set to the local url of your site, eg: `sitename.local`

## Developing

To begin developing, use the command `$ grunt dev`, to begin automated code compilation.

When this task starts, it will:

1. Copy the `.pre-commit-sample` file into the `.git/hooks/pre-commit` file, to assist with auto-compilation on Git commit
2. Process any newly added icons into the `public/assets/icons/original` folder.
3. Open a Browser Sync session, which auto-injects updated CSS and JS files into the browser, without a page refresh
4. Begin watching files for auto-compilation on save.

## Commiting

When you commit code, a Git hook is run before the commit takes place, which should compile your SCSS and JS assets.

## SVG Icons

The `grunticon` package allows us to embed SVG icons inside our markup, which we can style with CSS. To embed an icon:

1. Place the svg icons insde the `public/assets/icons/original` folder.
2. Kill and restart your `$ grunt dev` task, to process the icon.
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

Note: for local and remote servers running MySQL v5.6+, there needs to be an additional manual configuration on the server, to remove a warning created
during Database syncing:

On the environment showing the error, issue the command `$ mysql_config_editor set --login-path=client --host=localhost --user=[USERNAME] --password` replacing [USERNAME] with
the correct username, and then typing the password when prompted to.
