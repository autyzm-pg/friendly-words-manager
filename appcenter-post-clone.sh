#!/usr/bin/env bash

echo "Starting post clone script..."
#yarn global add exp

echo "Accepting Android SDK"
yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

SOURCE=`dirname $0`

# Add ms appcenter api key
sed -i .bak -e "s/{APPCENTER_API_KEY}/$APPCENTER_API_KEY/g" $SOURCE/android/app/src/main/assets/appcenter-config.json
#sed -i "" "s/{APPCENTER_API_KEY}/$APPCENTER_API_KEY/g" *.json
cat $SOURCE/android/app/src/main/assets/appcenter-config.json
#if [[ ! -z "${API_KEY}" ]]; then
#    echo "Injecting APPCENTER_API_KEY"
#    echo "{ \"app_secret\": \"$API_KEY\" }" > $SOURCE/android/app/src/main/assets/appcenter-config.json
#fi
echo "Post clone script finished."
