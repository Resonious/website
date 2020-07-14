#!/bin/bash

set -e

npm install
node index.js

(cd submodules/Multifocus && npm install)
(cd submodules/Multifocus && npm run build)

cp -r submodules/Multifocus/public build/focus
