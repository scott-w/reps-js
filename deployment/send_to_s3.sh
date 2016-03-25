#!/usr/bin/env bash

## Based on http://benlopatin.com/deploying-static-sites-circle-ci/

BUCKET=my-s3-bucket
DIR=assets
aws  s3  sync $DIR s3://$BUCKET/static --profile=default
