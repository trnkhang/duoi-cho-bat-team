#!/usr/bin/env sh

set -eu
. "$(pwd)/scripts/load-env-vars.sh"

for key in APP_NAME PUBLIC_URL; do
  eval "value=\${$key:-}"
  test -n "$value" || { echo "Missing $key" >&2; exit 1; }
done

remote_url=$(printf '%s' "$PUBLIC_URL" |
  sed "s|\\\${APP_NAME}|$APP_NAME|g" |
  sed "s|\\\${npm_package_version}|$npm_package_version|g")

status=$(curl --write-out '%{http_code}' --silent --output /dev/null --location "$remote_url/remoteEntry.js")
if [ "$status" = "200" ]; then
  echo "Version already exists: $npm_package_version" >&2
  exit 1
fi
printf '{"ok":true,"version":"%s","url":"%s"}\n' "$npm_package_version" "$remote_url/remoteEntry.js"
