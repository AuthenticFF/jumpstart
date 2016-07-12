<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

  '*' => array(
    // Config overrides for all of our environments
  ),

  'live' => array(

    // The database server name or IP address. Usually this is 'localhost' or '127.0.0.1'.
		'server' => 'localhost',

		// The database username to connect with.
		'user' => 'root',

		// The database password to connect with.
		'password' => 'root',

		// The name of the database to select.
		'database' => 'craft-template',

		// The prefix to use when naming tables. This can be no more than 5 characters.
		'tablePrefix' => 'craft',

  ),

  'dev' => array(
		'server'      => 'localhost',
		'user'        => '',
		'password'    => '',
		'database'    => '',
		'tablePrefix' => 'craft',
  ),

  'local' => array(
		'server'      => 'localhost',
		'user'        => 'root',
		'password'    => 'root',
		'database'    => 'madison-adv',
		'tablePrefix' => 'craft',
  ),

);
