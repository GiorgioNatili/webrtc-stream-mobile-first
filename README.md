webrtc-stream-mobile-first
==========================

To run the app you need to execute Chrome with the security features disabled, run this script in order to open a fresh new instance of Chrome and then access the app using your IP addrss.

``fresh_dir="$HOME/.fresh-chrome"``br
``tmp_dir="/tmp"``br
``set -e``br
``timestamp=`date +%Y%m%d%H%M%S```
``if [[ -e "$fresh_dir" ]]; then``
  `` user_dir="$tmp_dir/chrome-$timestamp-$RANDOM"``
   `` cp -r "$fresh_dir" "$user_dir"``
   `` exec open -na "Google Chrome" --args "--user-data-dir=$user_dir" "--disable-web-security"``
``else``
    ``exec open -na "Google Chrome" --args "--user-data-dir=$fresh_dir" "--disable-web-security"``
``fi``
