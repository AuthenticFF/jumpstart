cd ../../

git clone git@codebasehq.com:thegoodlab/internal/ee-template.git TEMP

mv ./TEMP/config/bootstrap.php ./config/bootstrap.php
mv ./TEMP/config/config_local.php ./config/config_local.php
mv -R ./TEMP/httpdocs ./httpdocs
mv -R ./TEMP/system ./system
mv -R ./TEMP/templates ./templates
mv -R ./TEMP/third_party ./third_party
mv ./TEMP/Boxfile ./Boxfile
