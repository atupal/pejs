#set xlabel "Benchmark"
set ylabel "Milliseconds"
set term postscript color enhanced font ", 12"
set autoscale
set style data histogram
set style histogram cluster gap 1
set style fill solid border -1
set boxwidth 0.9
set style line 1

set title "Optimizations: JIT-compilation and peephole-optimizations\nBenchmark file: BenchmarkSimpleJITCompilation.py\nNote: V8 ran benchmarks 10 times more than SpiderMonkey"
set output "BenchV8optimized.eps"
set yrange [0:27000]
plot "benchCompiler_int.txt" using 3:xtic(1) title "Interpreted",\
     "benchCompiler_com.txt" using 3:xtic(1) title "Compiled",\
     "benchCompiler_opt.txt" using 3:xtic(1) title "Optimized",\
     "benchCompiler_pyt.txt" using 3:xtic(1) title "Python"
