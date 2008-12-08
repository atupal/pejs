#!/bin/bash
tools/prepareStandaloneBenchmark.sh
v8/shell test/standalone.js >> log.txt 