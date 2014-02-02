cd ../../

# Getting our EE repo
git clone git@codebasehq.com:thegoodlab/internal/ee-template.git TEMP

# Moving everything we need from the EE repo
mv ./TEMP/config/bootstrap.php ./config/bootstrap.php
mv ./TEMP/config/config_local.php ./config/config_local.php
mv -r ./TEMP/httpdocs ./httpdocs
mv -r ./TEMP/system ./system
mv -r ./TEMP/templates ./templates
mv -r ./TEMP/third_party ./third_party
mv ./TEMP/Boxfile ./Boxfile

cat ./TEMP/README.md >> ./README.md

# Removing the EE repo
rm -r ./TEMP

# Moving our assets dir
mv -r ./assets ./httpdocs/assets

# Replaceing paths in some configuration files
sed -i 's/\/assets/\/httpdocs\/assets/g' ./.gitignore
sed -i 's/assets/httpdocs\/assets/g' ./.Gruntfile.js