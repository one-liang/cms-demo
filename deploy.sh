#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://one-liang.github.io/cms-demo
git push -f git@github.com:one-liang/cms-demo.git main:gh-pages

cd -