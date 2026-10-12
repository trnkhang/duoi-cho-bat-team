#!/usr/bin/env sh

set -eu

if [ "${CONFIRM_DEPLOY:-}" != "YES" ]; then
  echo "Set CONFIRM_DEPLOY=YES only in an authorized deployment job." >&2
  exit 2
fi

. "$(pwd)/scripts/load-env-vars.sh"
. "$(pwd)/scripts/check-version-exist.sh" >/dev/null

for key in BUILD_DIR APP_NAME CDN_USERNAME CDN_SERVER_IP CDN_SERVER_DIR; do
  eval "value=\${$key:-}"
  test -n "$value" || { echo "Missing $key" >&2; exit 1; }
done

test -d "$BUILD_DIR"
stage_dir=$(mktemp -d)
trap 'rm -rf "$stage_dir"' EXIT
mkdir -p "$stage_dir/$APP_NAME/$npm_package_version"
cp -R "$BUILD_DIR/." "$stage_dir/$APP_NAME/$npm_package_version/"

destination="$CDN_USERNAME@$CDN_SERVER_IP:$CDN_SERVER_DIR"
if [ -n "${CI_PIPELINE_SOURCE:-}" ]; then
  destination="$CDN_USERNAME@$CDN_SERVER_IP::$CDN_SERVER_DIR"
fi
rsync -avrzc "$stage_dir/" "$destination"
