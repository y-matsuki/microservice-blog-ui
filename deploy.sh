#!/bin/sh
PROFILE=yustam.jp
BUCKET_NAME=blog-sample-tokyo

# build
gulp build
# upload
aws s3\
  --profile $PROFILE\
  cp\
  --recursive\
  --exclude "node_modules/*"\
  --exclude "src/*"\
  --exclude "package.json"\
  --exclude "gulpfile.js"\
  --exclude "README.md"\
  --exclude "*.sh"\
  --exclude ".git*"\
  . s3://$BUCKET_NAME/
