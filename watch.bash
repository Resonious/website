#!/bin/bash

# run `pip2 install when-changed` if this doesn't work
exec when-changed -r js pug shared static -c node index.js
