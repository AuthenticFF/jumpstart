cd ../../

# Getting our EE repo
git clone git@codebasehq.com:thegoodlab/internal/ee-template.git TEMP

# Saving our current assets dir
mv ./httpdocs/assets ./TEMP/assets

# Moving everything we need from the EE repo
mv ./TEMP/config/bootstrap.php ./config/bootstrap.php
mv ./TEMP/config/config_local.php ./config/config_local.php
mv ./TEMP/httpdocs ./httpdocs
mv ./TEMP/system ./system
mv ./TEMP/templates ./templates
mv ./TEMP/third_party ./third_party
mv ./TEMP/Boxfile ./Boxfile

# Moving our assets dir back
mv ./TEMP/assets ./httpdocs/assets

# Combine README's
cat ./TEMP/README.md >> ./README.md

# Removing the EE repo
rm -r -f ./TEMP