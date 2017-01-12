# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "bento/ubuntu-16.04"

  # Forward ports to Apache and MySQL
  config.vm.network "forwarded_port", guest: 80, host: 8888
  config.vm.network "forwarded_port", guest: 3306, host: 8889

  config.ssh.forward_agent = true

  config.vm.provision "server", type: "shell", path: "server/provision.sh"
  # config.vm.provision "craft", type: "shell", path: "server/provision-craft.sh", run: "never"

  config.vm.provision :host_shell, run: "never" do |host_shell|

    host_shell.abort_on_nonzero = true
    host_shell.inline = 'bash ./server/provision-craft.sh'

  end

end
