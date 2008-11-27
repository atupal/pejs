#!/bin/bash
tools/createTest.py
touch standalone.js
cat src/interpreter.js > standalone.js
cat src/lib/*.js >> standalone.js
cat test/*.js >> standalone.js
cat tools/prepareStandalone.js >> standalone.js