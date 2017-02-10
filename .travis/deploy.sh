#!/bin/bash

echo "I DID RUN!!!!"

set -xe # print exit on first failure

if [ "$TRAVIS_BRANCH" == 'staging' ]; then
        #ls -al #show pwd 
        eval "$(ssh-agent -s)" # start ssh agent
        ssh-add ~/.ssh/travis_rsa 
	git remote add deploy "travis@briansresume.com:/var/www/html" # deploy to html default
	git config user.name "TravisCI"
	git config user.email "travisdeploy@briansresume.com"git push -f deploy HEAD:staging # exec deploy method
else
	echo "Deployments only occur with staging branch. You are currently using '$TRAVIS_BRANCH'"
fi
