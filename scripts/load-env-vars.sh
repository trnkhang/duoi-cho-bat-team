#!/usr/bin/env sh

set -eu

PROJECT_DIR=$(pwd)
npm_package_version=$(node -p "require('./package.json').version")

if [ -f "${PROJECT_DIR}/.env" ]; then
  . "${PROJECT_DIR}/.env"
fi

case "${CI_COMMIT_BRANCH:-}" in
  "${DEVELOP_BRANCH:-dev}"|develop) . "${PROJECT_DIR}/.env.develop" ;;
  "${STAGING_BRANCH:-staging}"|staging) . "${PROJECT_DIR}/.env.staging" ;;
  "${PRODUCTION_BRANCH:-production}"|master|production) . "${PROJECT_DIR}/.env.production" ;;
esac

export npm_package_version
export PUBLIC_URL
export REACT_APP_ENV
export BUILD_DIR
export GENERATE_SOURCEMAP
