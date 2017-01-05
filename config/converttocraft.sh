# Getting our EE repo
git clone git@codebasehq.com:thegoodlab/internal/craft-template.git TEMP

# Saving our current assets dir
mv ./public/assets ./TEMP/assets
mv ./public/lib ./TEMP/lib
mv ./public/index.html ./TEMP/index.html

rm -r ./public

# Moving everything we need from the EE repo
mv ./TEMP/public ./public
mv ./TEMP/craft ./craft

# Moving our assets dir back
mv ./TEMP/assets ./public/assets
mv ./TEMP/lib ./public/lib
mv ./TEMP/index.html ./public/index.html

# Combine README's
cat ./TEMP/readme.txt >> ./README.md

# Removing the EE repo
rm -r -f ./TEMP
