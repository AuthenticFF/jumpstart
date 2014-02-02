

if !ENV['env'].nil? then
  set(:env, ENV['env'])
else
  set(:env, 'staging')
end

if !env.nil? && env == "production" then

else

  set :application, ""
  set :deploy_to, "/var/www/#{application}"

  set :user, ""
  set :password, ""
  set :use_sudo, false

  role :app, ""
  role :web, ""
  role :db,  "", :primary => true

  set :branch, "master"

end

default_run_options[:pty] = true

# the git-clone url for your repository
set :repository, ""

# Additional SCM settings
set :scm, :git
set :ssh_options, { :forward_agent => true }
set :deploy_via, :remote_cache
set :copy_strategy, :checkout
set :keep_releases, 3
set :copy_compression, :bz2

# Deployment process
after "deploy:update", "deploy:cleanup"
after "deploy", "deploy:create_symlinks", "deploy:set_permissions", "deploy:remove_files"

# Custom deployment tasks
namespace :deploy do

  desc "This is here to overide the original :restart"
  task :restart, :roles => :app do
    # do nothing but overide the default
  end

  desc "Create symlinks to shared data such as config files and uploaded images"
  task :create_symlinks, :roles => :app do
    #create the cache directory becasue it is probably ignored in our gitignore file

    # standard image upload directories
    # run "ln -s #{deploy_to}/#{shared_dir}/content #{current_release}"
    # run "ln -s #{deploy_to}/#{shared_dir}/images #{current_release}"
  end

  desc "Remove files after deployment"
  task :remove_files, :roles => :web do
    # run "rm #{deploy_to}/current/config/deploy.rb"
  end

end