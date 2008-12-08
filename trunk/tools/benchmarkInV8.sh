#!/bin/bash
tools/prepareStandaloneBenchmark.sh
svn info | grep Last >> v8log.txt
v8/shell test/standalone.js >> v8log.txt 