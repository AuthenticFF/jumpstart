<?php

// Check the SERVER_NAME variable ourselves
switch ($_SERVER['SERVER_NAME'])
{
    // If the SERVER_NAME variable matches our case,
    // assign the CRAFT_ENVIRONMENT variable a keyword
    // that identifies this environment that we can
    // use in our multi-environment config

    case 'productionurl.com' :
        define('CRAFT_ENVIRONMENT', 'live');
        break;

    case 'devurl.com' :
        define('CRAFT_ENVIRONMENT', 'dev');
        break;

    default :
        define('CRAFT_ENVIRONMENT', 'local');
        break;
}


// Path to your craft/ folder
$craftPath = '../craft';

// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
	if (function_exists('http_response_code'))
	{
		http_response_code(503);
	}

	exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
