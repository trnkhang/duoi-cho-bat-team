#!/usr/bin/env sh

set -eu
. "$(pwd)/scripts/load-env-vars.sh"
npm run wp-build

test -f "${BUILD_DIR}/remoteEntry.js"
