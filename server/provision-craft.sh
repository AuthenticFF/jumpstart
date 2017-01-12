

# This function is called at the very bottom of the file
main() {

  echo hello

  # Getting our EE repo
  git clone git@codebasehq.com:thegoodlab/internal/craft-template.git ./TEMP

  # Saving our current assets dir
  mv ./public/assets ./TEMP/public/assets
  # mv ./public/content ./TEMP/public/content

  rm -r ./public

  # Moving everything we need from the EE repo
  mv ./TEMP/public ./public
  mv ./TEMP/craft ./craft

  # Removing the EE repo
  rm -r -f ./TEMP

  chmod 744 ./craft/app
  chmod 744 ./craft/config
  chmod 744 ./craft/storage

}

main
exit 0
