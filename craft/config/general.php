<?php

/**
 * General Configuration
 *
 * This example multi-environment config file is a
 * collection of several possible use cases for your
 * multi-environment workflow
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

// Ensure our urls have the right scheme
define('URI_SCHEME', ( isset($_SERVER['HTTPS'] ) ) ? "https://" : "http://" );

// The site url
define('SITE_URL', URI_SCHEME . $_SERVER['SERVER_NAME'] . '/');

// The site basepath
define('BASEPATH', realpath(CRAFT_BASE_PATH . '/../') . '/');

return array(

  // Config settings for ALL environments
  // ------------------------------------------------------------
  '*' => array(

      // We can use these variables in the URL and Path settings within
      // the Craft Control Panel.  i.e. siteUrl => {siteUrl}, basePath => {basePath}
      'environmentVariables' => array(
          'siteUrl'  => SITE_URL,
          'basePath' => BASEPATH
      ),

      // We can append this value to our CSS and JS files
      // so we can cachebust them all if we need to.
      // <link rel="stylesheet" href="/css/style.css?v={{ craft.config.cacheBustValue }}" />
      'cacheBustValue' => '20121017',

      // Create a custom variable that we can use for an environment conditional
      // We set the environment in index.php: live, dev, or local
      // This setting assumes we set the environment name in our index.php file
      // {% if craft.config.env == 'live' %} ... {% endif %}
      'env' => CRAFT_ENVIRONMENT,

  ),

  // Config settings for the LIVE environment
  // ------------------------------------------------------------
  'live' => array(

      // Setting allowAutoUpdates to false will disable the
      // ability to use the one-click update feature.  This might
      // be useful if you are managing a git workflow and want to
      // ensure that updates happen in your repository first.
      'allowAutoUpdates' => false,

  ),

  // Config settings for the DEV environment
  // ------------------------------------------------------------
  'dev' => array(

      // Give us more useful error messages
      'devMode' => true,

  ),

  // Config settings for the LOCAL environment
  // ------------------------------------------------------------
  'local' => array(

      // Give us more useful error messages
      'devMode'    => true,

      // Have Craft send ALL emails to a single address
      'testToEmailAddress'    => 'info@authenticff.com',

      // Some settings helpful for debugging
      'phpMaxMemoryLimit'          => '256M',
      'backupDbOnUpdate'           => true,
      'translationDebugOutput'     => false,
      'useCompressedJs'            => true,
      'cacheDuration'              => 'P1D',

      // Make member login settings nice and trusting
      // by allowing a user to stay logged in for 101 years
      // and relaxing various other related settings
      // http://www.php.net/manual/en/dateinterval.construct.php
      'userSessionDuration'           => 'P101Y',
      'rememberedUserSessionDuration' => 'P101Y',
      'rememberUsernameDuration'      => 'P101Y',
      'invalidLoginWindowDuration'    => 'P101Y',
      'cooldownDuration'              => 'PT1S',
      'maxInvalidLogins'              => 101,

  )

);
