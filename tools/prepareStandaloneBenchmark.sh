#!/bin/bash
tools/createTest.py
touch test/standalone.js
cat src/interpreter.js > test/standalone.js
cat src/lib/*.js >> test/standalone.js
cat test/*.js >> test/standalone.js
cat tools/prepareStandaloneBenchmark.js >> test/standalone.js