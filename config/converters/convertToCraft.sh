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

mv ./httpdocs/lib ./public/lib
mv ./httpdocs/index.html ./public/index.html

# Combine README's
cat ./TEMP/readme.txt >> ./README.md

# Removing the EE repo
rm -r -f ./TEMP
rm -r -f ./httpdocs

# sed -i 's/httpdocs/public/g' ./Gruntfile.js
# sed -i 's/httpdocs/public/g' ./.git/hooks/pre-commit