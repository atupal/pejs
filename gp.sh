#set xlabel "Benchmark"
set ylabel "Milliseconds"
set title "v8 test plot"
set term postscript color enhanced font ", 10"
set output "gpv8.eps"
set autoscale
set style data histogram
set style histogram cluster gap 1
set style fill solid border -1
set boxwidth 0.9
set xtics rotate by -90

plot "benchspider.txt" using 3:xtic(2) title "SpiderMonkey",\
     "benchv8.txt" using 3:xtic(2) title "V8"

set title "PEJS on V8 vs. CPython"
set output "BenchPEJSonV8vsCPython.eps"
set yrange [0:700]
plot "benchV8final.txt" using 3:xtic(2) title "PEJS on V8",\
     "benchPython.txt" using 3:xtic(1) title "CPython"
