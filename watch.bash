#!/bin/bash

echo index.js static/* pug/* shared/* js/* images/* documents/* \
  | awk '{ gsub(" ", "\n"); print }' \
  | entr -s 'echo "rebuilding..." && node index.js && echo "rebuild complete"'
