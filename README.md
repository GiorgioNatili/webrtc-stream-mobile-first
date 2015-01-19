webrtc-stream-mobile-first
==========================

To run the app you need to execute Chrome with the security features disabled, run this script in order to open a fresh new instance of Chrome and then access the app using your IP addrss.

`
#!/usr/bin/env bash

# fresh-chrome
#
# Use this script on OS X to launch a new instance of Google Chrome
# with its own empty cache, cookies, and user configuration.
#
# The first time you run this script, it will launch a new Google
# Chrome instance with a permanent user-data directory, which you can
# customize below. Perform any initial setup you want to keep on every
# new Chrome instance, such as adding bookmarks and extensions. Then
# quit this Chrome instance with Command-Q or by selecting "Quit" from
# the "Chrome" menu. (The red "close" button is not sufficient.)
#
# AFTER that, every time you run this script it will launch a new
# Google Chrome instance with a temporary user-data directory copied
# from the one you set up the first time you ran this script. Every
# new instance of Google Chrome launched by this script will be
# completely isolated from the others.



### Customize these

# Permanent directory to store the user-data directory of your 'fresh'
# Chrome configuration.
fresh_dir="$HOME/.fresh-chrome"

# Temporary directory in which to create new user-data directories for
# temporary Chrome instances.
tmp_dir="/tmp"



### Main script begins

set -e

timestamp=`date +%Y%m%d%H%M%S`

if [[ -e "$fresh_dir" ]]; then
    user_dir="$tmp_dir/chrome-$timestamp-$RANDOM"
    cp -r "$fresh_dir" "$user_dir"
    exec open -na "Google Chrome" --args "--user-data-dir=$user_dir" "--disable-web-security"
else
    exec open -na "Google Chrome" --args "--user-data-dir=$fresh_dir" "--disable-web-security"
fi
`
