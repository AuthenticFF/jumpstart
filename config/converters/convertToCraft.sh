cd ../../

# Getting our EE repo
git clone git@codebasehq.com:thegoodlab/internal/craft-template.git TEMP

# Saving our current assets dir
mv ./httpdocs/assets ./TEMP/assets

# Moving everything we need from the EE repo
mv ./TEMP/public ./public
mv ./TEMP/craft ./craft

# Moving our assets dir back
mv ./TEMP/assets ./public/assets

# Combine README's
cat ./TEMP/teadme.txt >> ./README.md

# Removing the EE repo
rm -r -f ./TEMP