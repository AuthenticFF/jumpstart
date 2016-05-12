# -- Important --
# Read the README.md file in order to make sure that you have everything
# set up properly before running make install. Not doing so can turn a fun
# time into a not so fun time. We don't want that

# Installs all dependencies and converts the project to a craft project
install:
	# -- Git --
	# Remove existing git repo
	rm -rf .git

	# Initialize a new repository
	git init

	# -- Node.js --
	# Install node dependencies
	npm install

	# -- PHP --
	# Install PHP dependencies
	# composer install

	# Update PHP dependencies
	# composer update

	# PHP migrations
	# php artisan migrate --env=local/testing

	# Seed database
	# php artisan db:seed

	# Refresh migrations and seed database
	# php artisan migrate:refresh --seed --env=local/testing

	# -- Ruby --
	# Install Ruby dependencies
	bundle install

	# -- Grunt --
	# Update pre-commit hook to lint JS before commiting
	grunt hookmeup

	# Copy over Foundation files
	grunt init

	# Compile and concat JS
	grunt compile

	# Pull Database
  # grunt db_pull --target=production/staging

	# Pull Content
	# grunt rsync:production/staging

	# Convert to Craft
	sh config/converters/convertToCraft.sh
