#!/bin/bash

echo index.js static/* pug/* shared/* js/* images/* documents/* documents/blog/*.md \
  | awk '{ gsub(" ", "\n"); print }' \
  | entr -s 'bash -c "echo rebuilding... && node index.js && echo rebuild complete"'
