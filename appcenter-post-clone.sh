#!/usr/bin/env bash

echo "Starting post clone script..."
#yarn global add exp

SOURCE=`dirname $0`

# Add ms appcenter api key
if [[ ! -z "${API_KEY}" ]]; then
    echo "Injecting APPCENTER_API_KEY"
    echo "{ \"app_secret\": \"$API_KEY\" }" > $SOURCE/android/app/src/main/assets/appcenter-config.json
fi
echo "Post clone script finished."