#!/bin/bash

cd test

total=0
for file in `dir -d *.py` ; do
  start=$(date +%s%N)
  result=$(python "$file")
  end=$(date +%s%N)
  elapsed=$(($(($end - $start)) / 1000000))
  total=$(($total + $elapsed))
  echo $file ":" $elapsed
done

echo "Total time used:" $total "ms"