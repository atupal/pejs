#!/bin/bash

tools/createTest.py

cd test

total=0
for file in `dir -d *.pyc` ; do
  prefix=$(echo "$file" | grep "Pejs")
  if [ -z "$prefix" ];
  then
    start=$(date +%s%N)
    result=$(python "$file")
    end=$(date +%s%N)
    elapsed=$(($(($end - $start)) / 1000000))
    total=$(($total + $elapsed))
    echo $file ":" $elapsed
  fi
done
echo "Total time used:" $total "ms"

cd ..