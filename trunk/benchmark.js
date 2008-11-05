// This file was automatically created with pejs.py

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var benchmark = new Object();
  benchmark.co_name = "?";
  benchmark.co_argcount = 0;
  benchmark.co_nlocals = 0;
  benchmark.co_varnames = ["myPoint", "Point"];
  benchmark.co_cellvars = [];
  benchmark.co_freevars = [];
  benchmark.co_code =   [ //Instructions
    [100,0,0,"CONSTANT","'Point'","LOAD_CONST"],
    [102,3,0,"OTHER","0","BUILD_TUPLE"],
    [100,6,1,"CONSTANT","<code object Point at 0xb7f2fa20, file \"benchmark.py\", line 5>","LOAD_CONST"],
    [132,9,0,"OTHER","0","MAKE_FUNCTION"],
    [131,12,0,"OTHER","0","CALL_FUNCTION"],
    [89,15,"BUILD_CLASS"],
    [90,16,0,"GLOBAL VARIABLE","Point","STORE_NAME"],
    [101,19,0,"GLOBAL VARIABLE","Point","LOAD_NAME"],
    [131,22,0,"OTHER","0","CALL_FUNCTION"],
    [90,25,1,"GLOBAL VARIABLE","myPoint","STORE_NAME"],
    [101,28,1,"GLOBAL VARIABLE","myPoint","LOAD_NAME"],
    [105,31,2,"GLOBAL VARIABLE","getPoint","LOAD_ATTR"],
    [131,34,0,"OTHER","0","CALL_FUNCTION"],
    [71,37,"PRINT_ITEM"],
    [72,38,"PRINT_NEWLINE"],
    [100,39,2,"CONSTANT","None","LOAD_CONST"],
    [83,42,"RETURN_VALUE"]
  ];
  benchmark.co_consts = ["Point", "CODEOBJ: benchmark_Point", "None"];
  benchmark.co_names = ["Point", "myPoint", "getPoint"];
  benchmark.co_filename = benchmark.py;
  benchmark.co_firstlineno = 5;
  benchmark.co_stacksize = 3;
  benchmark.co_flags = 64;

var benchmark_Point = new Object();
  benchmark_Point.co_name = "Point";
  benchmark_Point.co_argcount = 0;
  benchmark_Point.co_nlocals = 0;
  benchmark_Point.co_varnames = [];
  benchmark_Point.co_cellvars = [];
  benchmark_Point.co_freevars = [];
  benchmark_Point.co_code =   [ //Instructions
    [116,0,0,"GLOBAL VARIABLE","__name__","LOAD_GLOBAL"],
    [90,3,1,"GLOBAL VARIABLE","__module__","STORE_NAME"],
    [100,6,1,"CONSTANT","2","LOAD_CONST"],
    [90,9,2,"GLOBAL VARIABLE","x","STORE_NAME"],
    [100,12,2,"CONSTANT","3","LOAD_CONST"],
    [90,15,3,"GLOBAL VARIABLE","y","STORE_NAME"],
    [100,18,3,"CONSTANT","<code object getPoint at 0xb7f2f7a0, file \"benchmark.py\", line 8>","LOAD_CONST"],
    [132,21,0,"OTHER","0","MAKE_FUNCTION"],
    [90,24,4,"GLOBAL VARIABLE","getPoint","STORE_NAME"],
    [82,27,"LOAD_LOCALS"],
    [83,28,"RETURN_VALUE"]
  ];
  benchmark_Point.co_consts = ["None", 2, 3, "CODEOBJ: benchmark_getPoint"];
  benchmark_Point.co_names = ["__name__", "__module__", "x", "y", "getPoint"];
  benchmark_Point.co_filename = benchmark.py;
  benchmark_Point.co_firstlineno = 5;
  benchmark_Point.co_stacksize = 1;
  benchmark_Point.co_flags = 66;

var benchmark_getPoint = new Object();
  benchmark_getPoint.co_name = "getPoint";
  benchmark_getPoint.co_argcount = 0;
  benchmark_getPoint.co_nlocals = 0;
  benchmark_getPoint.co_varnames = [];
  benchmark_getPoint.co_cellvars = [];
  benchmark_getPoint.co_freevars = [];
  benchmark_getPoint.co_code =   [ //Instructions
    [100,0,1,"CONSTANT","1","LOAD_CONST"],
    [83,3,"RETURN_VALUE"]
  ];
  benchmark_getPoint.co_consts = ["None", 1];
  benchmark_getPoint.co_names = [];
  benchmark_getPoint.co_filename = benchmark.py;
  benchmark_getPoint.co_firstlineno = 8;
  benchmark_getPoint.co_stacksize = 1;
  benchmark_getPoint.co_flags = 67;

