set xlabel "Benchmark"
set ylabel "Milliseconds"
set title "v8 test plot"
set term png
set output "gpv8.png"
set autoscale
set style fill

plot "benchv8.txt" using 1:3 with boxes title "V8",\
     "benchspider.txt" using 1:3 with boxes title "spider"
