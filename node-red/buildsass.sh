#!/bin/sh
#
# Build script for node-sass
#
# Can take an optional parameter indicating the branch branch or tag to build
#
#

BRANCH="master"
if [ "$1" != "" ]; then
  BRANCH="$1"
fi

echo "Building branch $BRANCH"
mkdir -p "/build/$BRANCH"

git clone --recursive https://github.com/sass/node-sass.git

cd node-sass
git checkout "$BRANCH"
git submodule update --init --recursive

npm install
node scripts/build -f

cd vendor
for file in $(find . -type f); do
        DEST=$(echo "$file" | awk 'BEGIN { FS = "/" } ; {print $2"_"$3}')
        cp $file "/build/$BRANCH/$DEST"
done

