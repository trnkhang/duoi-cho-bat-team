#!/usr/bin/env sh

set -eu

if [ "${CONFIRM_DEPLOY:-}" != "YES" ]; then
  echo "Set CONFIRM_DEPLOY=YES only after the versioned resources are verified." >&2
  exit 2
fi

. "$(pwd)/scripts/load-env-vars.sh"

for key in APP_ID PUBLIC_URL CONFIG_TOOL_API_URL; do
  eval "value=\${$key:-}"
  test -n "$value" || { echo "Missing $key" >&2; exit 1; }
done

remote_url=$(printf '%s' "$PUBLIC_URL" |
  sed "s|\\\${APP_NAME}|$APP_NAME|g" |
  sed "s|\\\${npm_package_version}|$npm_package_version|g")
release_by=${CI_COMMIT_AUTHOR:-manual-release}
payload=$(printf '{"micro_app_id":"%s","version_name":"%s","description":"Release version %s","url":"%s/remoteEntry.js","status":0,"release_by":"%s"}' \
  "$APP_ID" "$npm_package_version" "$npm_package_version" "$remote_url" "$release_by")

status=$(curl --write-out '%{http_code}' --silent --output /dev/null \
  --location --request POST "$CONFIG_TOOL_API_URL" \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --data "$payload")
test "$status" = "200"
