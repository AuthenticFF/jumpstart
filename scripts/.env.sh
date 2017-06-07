# Craft Scripts Environment
#
# Local environmental config for nystudio107 Craft scripts
#
# @author    nystudio107
# @copyright Copyright (c) 2017 nystudio107
# @link      https://nystudio107.com/
# @package   craft-scripts
# @since     1.1.0
# @license   MIT
#
# This file should be renamed to '.env.sh' and it should reside in the
# `scripts` directory.  Add '.env.sh' to your .gitignore.

# -- GLOBAL settings --

# What to prefix the database table names with
GLOBAL_DB_TABLE_PREFIX="craft_"

# The path of the `craft` folder, relative to the root path; paths should always have a trailing /
GLOBAL_CRAFT_PATH="craft/"

# The maximum age of db backups in days; backups older than this will be automatically removed
GLOBAL_DB_BACKUPS_MAX_AGE=90

# -- LOCAL settings --

# Local path constants; paths should always have a trailing /
LOCAL_ROOT_PATH="/Users/chrisarnold/sites/jsheld/"
LOCAL_ASSETS_PATH=${LOCAL_ROOT_PATH}"public/content/"

# Local user & group that should own the Craft CMS install
LOCAL_CHOWN_USER="root"
LOCAL_CHOWN_GROUP="root"

# Local directories relative to LOCAL_ROOT_PATH that should be writeable by the $CHOWN_GROUP
LOCAL_WRITEABLE_DIRS=(
                "${GLOBAL_CRAFT_PATH}storage"
                "public/content"
                )

# Local asset directories relative to LOCAL_ASSETS_PATH that should be synched with remote assets
# Leave a empty quote if you want to pull down all directories
LOCAL_ASSETS_DIRS=(
                ""
                )

# Craft-specific file directories relative to LOCAL_CRAFT_FILES_PATH that should be synched with remote files
LOCAL_CRAFT_FILE_DIRS=(
                "rebrand"
                "userphotos"
                )

# Absolute paths to directories to back up, in addition to `LOCAL_ASSETS_DIRS` and `LOCAL_CRAFT_FILE_DIRS`
LOCAL_DIRS_TO_BACKUP=(
                )

# Local database constants
LOCAL_DB_NAME="jsheld_local"
LOCAL_DB_PASSWORD="root"
LOCAL_DB_USER="root"
LOCAL_DB_HOST="127.0.0.1"
LOCAL_DB_PORT="8889"

# If you are using mysql 5.6.10 or later and you have `login-path` setup as per:
# https://opensourcedbms.com/dbms/passwordless-authentication-using-mysql_config_editor-with-mysql-5-6/
# you can use it instead of the above LOCAL_DB_* constants; otherwise leave this blank
LOCAL_DB_LOGIN_PATH=""

# The `mysql` and `mysqldump` commands to run locally
LOCAL_MYSQL_CMD="mysql"
LOCAL_MYSQLDUMP_CMD="mysqldump"

# Local backups path; paths should always have a trailing /
LOCAL_BACKUPS_PATH="/Users/chrisarnold/sites/jsheld/database/"

# -- REMOTE settings --

# Remote ssh credentials, user@domain.com and Remote SSH Port
REMOTE_SSH_LOGIN="root@23.239.26.13"
REMOTE_SSH_PORT="24"

# Remote path constants; paths should always have a trailing /
REMOTE_ROOT_PATH="/var/www/v2.jsheld.com/current/"
REMOTE_ASSETS_PATH=${REMOTE_ROOT_PATH}"public/content/"

# Remote database constants
REMOTE_DB_NAME="jsheld_v2_production"
REMOTE_DB_PASSWORD="kdoel957393jdhkd9dhsks9"
REMOTE_DB_USER="root"
REMOTE_DB_HOST="localhost"
REMOTE_DB_PORT="3306"

# If you are using mysql 5.6.10 or later and you have `login-path` setup as per:
# https://opensourcedbms.com/dbms/passwordless-authentication-using-mysql_config_editor-with-mysql-5-6/
# you can use it instead of the above REMOTE_DB_* constants; otherwise leave this blank
REMOTE_DB_LOGIN_PATH=""

# The `mysql` and `mysqldump` commands to run remotely
REMOTE_MYSQL_CMD="mysql"
REMOTE_MYSQLDUMP_CMD="mysqldump"

# Remote backups path; paths should always have a trailing /
REMOTE_BACKUPS_PATH="/var/www/v2.jsheld.com/shared/database/"

# Remote Amazon S3 bucket name
REMOTE_S3_BUCKET="REPLACE_ME"
