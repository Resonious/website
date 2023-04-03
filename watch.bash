#!/bin/bash

ls static/* pug/* shared/* js/* images/* documents/* | entr -s 'echo "rebuilding..." && node index.js && echo "rebuild complete"'
