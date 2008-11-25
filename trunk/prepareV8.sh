#!/bin/bash

tools/createTest.py

touch packedForV8.js

cat src/interpreter.js > packedForV8.js
cat src/lib/*.js >> packedForV8.js
cat test/*.js >> packedForV8.js
cat prepareV8.js >> packedForV8.js

echo "run v8 with file \"packedForV8.js\""