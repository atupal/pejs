// This file was automatically created with pejs.py

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var pejs_library = new Object();
    pejs_library.co_name = "?";
    pejs_library.co_argcount = 0;
    pejs_library.co_nlocals = 0;
    pejs_library.co_varnames = ["False", "range", "True", "str"];
    pejs_library.co_cellvars = [];
    pejs_library.co_freevars = [];
    pejs_library.co_code =     [ //Instructions
      [100,0,0,"CONSTANT","1","LOAD_CONST"],
      [90,3,0,"GLOBAL VARIABLE","True","STORE_NAME"],
      [100,6,1,"CONSTANT","0","LOAD_CONST"],
      [90,9,1,"GLOBAL VARIABLE","False","STORE_NAME"],
      [100,12,2,"CONSTANT","<code object str at 0xb7ec37a0, file \"pejs_library.py\", line 4>","LOAD_CONST"],
      [132,15,0,"OTHER","0","MAKE_FUNCTION"],
      [90,18,2,"GLOBAL VARIABLE","str","STORE_NAME"],
      [100,21,3,"CONSTANT","<code object range at 0xb7ec3b20, file \"pejs_library.py\", line 7>","LOAD_CONST"],
      [132,24,0,"OTHER","0","MAKE_FUNCTION"],
      [90,27,3,"GLOBAL VARIABLE","range","STORE_NAME"],
      [100,30,4,"CONSTANT","None","LOAD_CONST"],
      [83,33,"RETURN_VALUE"]
    ];
    pejs_library.co_consts = [1, 0, "CODEOBJ: pejs_library_str", "CODEOBJ: pejs_library_range", "None"];
    pejs_library.co_names = ["True", "False", "str", "range"];
    pejs_library.co_filename = pejs_library.py;
    pejs_library.co_firstlineno = 1;
    pejs_library.co_stacksize = 1;
    pejs_library.co_flags = 64;
    pejs_library.co_locals = [];

var pejs_library_str = new Object();
    pejs_library_str.co_name = "str";
    pejs_library_str.co_argcount = 1;
    pejs_library_str.co_nlocals = 1;
    pejs_library_str.co_varnames = ["value"];
    pejs_library_str.co_cellvars = [];
    pejs_library_str.co_freevars = [];
    pejs_library_str.co_code =     [ //Instructions
      [124,0,0,"LOCAL VARIABLE","value","LOAD_FAST"],
      [100,3,1,"CONSTANT","''","LOAD_CONST"],
      [23,6,"BINARY_ADD"],
      [83,7,"RETURN_VALUE"]
    ];
    pejs_library_str.co_consts = ["None", ""];
    pejs_library_str.co_names = ["value"];
    pejs_library_str.co_filename = pejs_library.py;
    pejs_library_str.co_firstlineno = 4;
    pejs_library_str.co_stacksize = 2;
    pejs_library_str.co_flags = 67;
    pejs_library_str.co_locals = [];

var pejs_library_range = new Object();
    pejs_library_range.co_name = "range";
    pejs_library_range.co_argcount = 2;
    pejs_library_range.co_nlocals = 2;
    pejs_library_range.co_varnames = ["start", "end"];
    pejs_library_range.co_cellvars = [];
    pejs_library_range.co_freevars = [];
    pejs_library_range.co_code =     [ //Instructions
      [124,0,0,"LOCAL VARIABLE","start","LOAD_FAST"],
      [124,3,1,"LOCAL VARIABLE","end","LOAD_FAST"],
      [102,6,2,"OTHER","2","BUILD_TUPLE"],
      [83,9,"RETURN_VALUE"]
    ];
    pejs_library_range.co_consts = ["None"];
    pejs_library_range.co_names = ["start", "end"];
    pejs_library_range.co_filename = pejs_library.py;
    pejs_library_range.co_firstlineno = 7;
    pejs_library_range.co_stacksize = 2;
    pejs_library_range.co_flags = 67;
    pejs_library_range.co_locals = [];

