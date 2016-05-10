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
	# composer Update

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

	# Get the EE repo
	git clone git@codebasehq.com:thegoodlab/internal/craft-template.git

	# Save our current assets dir
	mkdir tmp

	mv ./craft-template/craft ./tmp/craft
	mv ./craft-template/public ./tmp/public

	mv ./public/assets ./tmp/assets
	mv ./public/lib ./tmp/lib
	mv ./public/index.html ./tmp/index.html

	rm -r ./public

	# Move everything from the EE repo into our project
	mkdir public

	mv ./tmp/public ./public
	mv ./tmp/craft ./craft

	# Move our assets dir back into our project
	mv ./tmp/assets ./public/assets
	mv ./tmp/lib ./public/lib
	mv ./tmp/index.html ./public/index.html

	# Remove the EE repo
	rm -rf ./tmp
