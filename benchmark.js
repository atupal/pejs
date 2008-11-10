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
    benchmark.co_code =     [ //Instructions
      [100,0,0,"CONSTANT","'Point'","LOAD_CONST"],
      [102,3,0,"OTHER","0","BUILD_TUPLE"],
      [100,6,1,"CONSTANT","<code object Point at 0xb7f019a0, file \"benchmark.py\", line 4>","LOAD_CONST"],
      [132,9,0,"OTHER","0","MAKE_FUNCTION"],
      [131,12,0,"OTHER","0","CALL_FUNCTION"],
      [89,15,"BUILD_CLASS"],
      [90,16,0,"GLOBAL VARIABLE","Point","STORE_NAME"],
      [101,19,0,"GLOBAL VARIABLE","Point","LOAD_NAME"],
      [131,22,0,"OTHER","0","CALL_FUNCTION"],
      [90,25,1,"GLOBAL VARIABLE","myPoint","STORE_NAME"],
      [101,28,1,"GLOBAL VARIABLE","myPoint","LOAD_NAME"],
      [105,31,2,"GLOBAL VARIABLE","getExtra","LOAD_ATTR"],
      [100,34,2,"CONSTANT","5","LOAD_CONST"],
      [131,37,1,"OTHER","1","CALL_FUNCTION"],
      [71,40,"PRINT_ITEM"],
      [72,41,"PRINT_NEWLINE"],
      [100,42,3,"CONSTANT","None","LOAD_CONST"],
      [83,45,"RETURN_VALUE"]
    ];
    benchmark.co_consts = ["Point", "CODEOBJ: benchmark_Point", 5, "None"];
    benchmark.co_names = ["Point", "myPoint", "getExtra"];
    benchmark.co_filename = benchmark.py;
    benchmark.co_firstlineno = 4;
    benchmark.co_stacksize = 3;
    benchmark.co_flags = 64;
    benchmark.co_locals = [];

var benchmark_Point = new Object();
    benchmark_Point.co_name = "Point";
    benchmark_Point.co_argcount = 0;
    benchmark_Point.co_nlocals = 0;
    benchmark_Point.co_varnames = [];
    benchmark_Point.co_cellvars = [];
    benchmark_Point.co_freevars = [];
    benchmark_Point.co_code =     [ //Instructions
      [116,0,0,"GLOBAL VARIABLE","__name__","LOAD_GLOBAL"],
      [90,3,1,"GLOBAL VARIABLE","__module__","STORE_NAME"],
      [100,6,1,"CONSTANT","2","LOAD_CONST"],
      [90,9,2,"GLOBAL VARIABLE","x","STORE_NAME"],
      [100,12,2,"CONSTANT","<code object getExtra at 0xb7f01a60, file \"benchmark.py\", line 6>","LOAD_CONST"],
      [132,15,0,"OTHER","0","MAKE_FUNCTION"],
      [90,18,3,"GLOBAL VARIABLE","getExtra","STORE_NAME"],
      [82,21,"LOAD_LOCALS"],
      [83,22,"RETURN_VALUE"]
    ];
    benchmark_Point.co_consts = ["None", 2, "CODEOBJ: benchmark_Point_getExtra"];
    benchmark_Point.co_names = ["__name__", "__module__", "x", "getExtra"];
    benchmark_Point.co_filename = benchmark.py;
    benchmark_Point.co_firstlineno = 4;
    benchmark_Point.co_stacksize = 1;
    benchmark_Point.co_flags = 66;
    benchmark_Point.co_locals = [];

var benchmark_Point_getExtra = new Object();
    benchmark_Point_getExtra.co_name = "getExtra";
    benchmark_Point_getExtra.co_argcount = 2;
    benchmark_Point_getExtra.co_nlocals = 3;
    benchmark_Point_getExtra.co_varnames = ["self", "tal1", "w"];
    benchmark_Point_getExtra.co_cellvars = [];
    benchmark_Point_getExtra.co_freevars = [];
    benchmark_Point_getExtra.co_code =     [ //Instructions
      [100,0,1,"CONSTANT","6","LOAD_CONST"],
      [125,3,2,"LOCAL VARIABLE","w","STORE_FAST"],
      [124,6,2,"LOCAL VARIABLE","w","LOAD_FAST"],
      [124,9,0,"LOCAL VARIABLE","self","LOAD_FAST"],
      [105,12,2,"GLOBAL VARIABLE","x","LOAD_ATTR"],
      [23,15,"BINARY_ADD"],
      [83,16,"RETURN_VALUE"]
    ];
    benchmark_Point_getExtra.co_consts = ["None", 6];
    benchmark_Point_getExtra.co_names = ["w", "self", "x"];
    benchmark_Point_getExtra.co_filename = benchmark.py;
    benchmark_Point_getExtra.co_firstlineno = 6;
    benchmark_Point_getExtra.co_stacksize = 2;
    benchmark_Point_getExtra.co_flags = 67;
    benchmark_Point_getExtra.co_locals = [];

