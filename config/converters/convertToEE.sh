cd ../../

# Getting our EE repo
git clone git@codebasehq.com:thegoodlab/internal/ee-template.git TEMP

# Moving everything we need from the EE repo
mv ./TEMP/config/bootstrap.php ./config/bootstrap.php
mv ./TEMP/config/config_local.php ./config/config_local.php
mv ./TEMP/httpdocs ./httpdocs
mv ./TEMP/system ./system
mv ./TEMP/templates ./templates
mv ./TEMP/third_party ./third_party
mv ./TEMP/Boxfile ./Boxfile

cat ./TEMP/README.md >> ./README.md

# Removing the EE repo
rm -r -f ./TEMP

# Moving our assets dir
mv ./assets ./httpdocs/assets

# Replaceing paths in some configuration files
sed 's/\/assets/\/httpdocs\/assets/g' .gitignore
sed 's/assets/httpdocs\/assets/g' Gruntfile.js