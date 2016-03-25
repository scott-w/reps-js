#!/usr/bin/env bash

## Based on http://benlopatin.com/deploying-static-sites-circle-ci/

BUCKET=pumpedassets
DIR=assets
aws s3 sync $DIR s3://$BUCKET/ --delete --acl public-read
