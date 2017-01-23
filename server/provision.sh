#!/bin/bash

apache_config_file="/etc/apache2/envvars"
apache_vhost_file="/etc/apache2/sites-available/vagrant_vhost.conf"
php_config_file="/etc/php/7.0/apache2/php.ini"
xdebug_config_file="/etc/php/7.0/mods-available/xdebug.ini"
mysql_config_file="/etc/mysql/my.cnf"
default_apache_index="/var/www/html/index.html"
project_web_root="public"

# This function is called at the very bottom of the file
main() {
	repositories_go
	update_go
	tools_go
	apache_go
	mysql_go
	php_go
	autoremove_go
}

repositories_go() {
	echo "NOOP"
}

update_go() {
	# Update the server
	apt-get update
	# apt-get -y upgrade
}

autoremove_go() {
	apt-get -y autoremove
}

tools_go() {
	# Install basic tools
	apt-get -y install build-essential binutils-doc git
}

apache_go() {
	# Install Apache
	apt-get -y install apache2

	sed -i "s/^\(.*\)www-data/\1vagrant/g" ${apache_config_file}
	chown -R vagrant:vagrant /var/log/apache2

	if [ ! -f "${apache_vhost_file}" ]; then
		cat << EOF > ${apache_vhost_file}
<VirtualHost *:80>
    ServerAdmin info@authenticff.com
    DocumentRoot /vagrant/${project_web_root}
    LogLevel debug

    ErrorLog /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined

    <Directory /vagrant/${project_web_root}>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:443>
    ServerAdmin info@authenticff.com
    DocumentRoot /vagrant/${project_web_root}
    LogLevel debug

    ErrorLog /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined

    <Directory /vagrant/${project_web_root}>
        AllowOverride All
        Require all granted
    </Directory>
		SSLEngine on
	  SSLCertificateFile /etc/apache2/ssl.crt
	  SSLCertificateKeyFile /etc/apache2/ssl.key
	  SetEnvIf User-Agent ".*MSIE.*" nokeepalive ssl-unclean-shutdown
</VirtualHost>
EOF
	fi

	cp /etc/apache2/apache2.conf /etc/apache2/apache2.conf.backup
	cp /vagrant/server/apache/apache2.conf /etc/apache2/apache2.conf

	cp /vagrant/server/apache/server.key /etc/apache2/ssl.key
	cp /vagrant/server/apache/server.crt /etc/apache2/ssl.crt

	cp /etc/apache2/mods-available/mpm_prefork.conf /etc/apache2/mods-available/mpm_prefork.conf.backup
	cp /vagrant/server/apache/mpm_prefork.conf /etc/apache2/mods-available/mpm_prefork.conf

	a2dismod mpm_event
	a2enmod mpm_prefork
	a2enmod rewrite
	a2enmod mbstring
	a2enmod ssl

	a2dissite 000-default
	a2ensite vagrant_vhost

	service apache2 reload
	update-rc.d apache2 enable
}

php_go() {
	apt-get -y install php libapache2-mod-php php-xdebug
	apt-get -y install php-cli php-common php-gd php-mysql php-curl php-imagick php-json php-log php-mcrypt php7.0-mbstring php-mbstring

	sed -i "s/display_startup_errors = Off/display_startup_errors = On/g" ${php_config_file}
	sed -i "s/display_errors = Off/display_errors = On/g" ${php_config_file}

	if [ ! -f "{$xdebug_config_file}" ]; then
		cat << EOF > ${xdebug_config_file}
zend_extension=xdebug.so
xdebug.remote_enable=1
xdebug.remote_connect_back=1
xdebug.remote_port=9000
xdebug.remote_host=10.0.2.2
EOF
	fi

	service apache2 reload

	# Install latest version of Composer globally
	if [ ! -f "/usr/local/bin/composer" ]; then
		curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
	fi

}

mysql_go() {
	# Install MySQL
	echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
	echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
	apt-get -y install mysql-client mysql-server

	cat << EOF > ${mysql_config_file}
[mysqld]
bind-address = 0.0.0.0
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
EOF

	touch $HOME/.my.cnf
	cat << EOF > $HOME/.my.cnf
[client]
user = root
password = root
host = localhost
EOF

	# Allow root access from any host
	echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION" | mysql -u root
	echo "GRANT PROXY ON ''@'' TO 'root'@'%' WITH GRANT OPTION" | mysql -u root

	if [ -d "/vagrant/server/mysql/provision" ]; then
		echo "Executing all SQL files in /vagrant/server/mysql/provision folder ..."
		echo "-------------------------------------"
		for sql_file in /vagrant/server/mysql/provision/*.sql
		do
			echo "EXECUTING $sql_file..."
	  		time mysql -u root < $sql_file
	  		echo "FINISHED $sql_file"
	  		echo ""
		done
	fi

	service mysql restart
	update-rc.d apache2 enable
}

main
exit 0
