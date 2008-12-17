#set xlabel "Benchmark"
set ylabel "Milliseconds"
set term postscript color enhanced font ", 10"
set autoscale
set style data histogram
set style histogram cluster gap 1
set style fill solid border -1
set boxwidth 0.9
set xtics rotate by -90
set style line 1

set title "PEJS on V8 vs. CPython"
set output "BenchPEJSonV8vsCPython.eps"
set yrange [0:700]
plot "benchV8final.txt" using 3:xtic(2) ls 1 title "PEJS on V8",\
     "benchPython.txt" using 3:xtic(1) ls 2 title "CPython"

set title "PEJS on V8 vs. PEJS on SpiderMonkey"
set output "BenchV8vsSpiderMonkey.eps"
set yrange [0:3200]
plot "benchSpiderFinal.txt" using 3:xtic(2) ls 3 title "SpiderMonkey",\
     "benchV8final.txt" using 3:xtic(2) ls 1 title "V8"

set title "PEJS on V8, different revisions"
set output "BenchV8revisions.eps"
set ylabel "Percent"
set yrange [0:110]
plot "benchv8-57.txt" using 4:xtic(2) title "Revision 57",\
     "benchv8-61.txt" using 4:xtic(2) title "Revision 61",\
     "benchv8-85.txt" using 4:xtic(2) title "Revision 85",\
     "benchV8final.txt" using 4:xtic(2) title "Revision 95"

set title "PEJS on V8, highlights"
set output "BenchV8highlights.eps"
set ylabel "Percent"
set yrange [0:110]
plot "benchv8-57-1.txt" using 4:xtic(2) title "Revision 57",\
     "benchv8-61-1.txt" using 4:xtic(2) title "Revision 61",\
     "benchv8-85-1.txt" using 4:xtic(2) title "Revision 85",\
     "benchV8final-1.txt" using 4:xtic(2) title "Revision 95"

set title "Optimizations: JIT-compilation and peephole-optimizations\nNote: V8 ran benchmarks 10 times more than SpiderMonkey"
set term postscript color enhanced font ", 14"
set output "BenchV8optimized.eps"
set ylabel "Milliseconds"
set yrange [0:27000]
plot "benchCompiler_int.txt" using 3:xtic(1) title "Interpreted",\
     "benchCompiler_com.txt" using 3:xtic(1) title "Compiled",\
     "benchCompiler_opt.txt" using 3:xtic(1) title "Optimized",\
     "benchCompiler_pyt.txt" using 3:xtic(1) title "Python"
