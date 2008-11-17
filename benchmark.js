// This file was automatically created with pejs.py

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var benchmark = new Object();
    benchmark.co_name = "?";
    benchmark.co_argcount = 0;
    benchmark.co_nlocals = 0;
    benchmark.co_varnames = ["a", "b"];
    benchmark.co_cellvars = [];
    benchmark.co_freevars = [];
    benchmark.co_code =     [ //Instructions
      [101,0,0,"GLOBAL VARIABLE","True","LOAD_NAME"],
      [111,3,16,"RELATIVE JUMP","22","JUMP_IF_FALSE"],
      [1,6,"POP_TOP"],
      [100,7,0,"CONSTANT","7","LOAD_CONST"],
      [90,10,1,"GLOBAL VARIABLE","a","STORE_NAME"],
      [100,13,1,"CONSTANT","35","LOAD_CONST"],
      [90,16,2,"GLOBAL VARIABLE","b","STORE_NAME"],
      [110,19,1,"RELATIVE JUMP","23","JUMP_FORWARD"],
      [1,22,"POP_TOP"],
      [101,23,3,"GLOBAL VARIABLE","False","LOAD_NAME"],
      [111,26,10,"RELATIVE JUMP","39","JUMP_IF_FALSE"],
      [1,29,"POP_TOP"],
      [100,30,2,"CONSTANT","0","LOAD_CONST"],
      [90,33,1,"GLOBAL VARIABLE","a","STORE_NAME"],
      [110,36,1,"RELATIVE JUMP","40","JUMP_FORWARD"],
      [1,39,"POP_TOP"],
      [101,40,1,"GLOBAL VARIABLE","a","LOAD_NAME"],
      [100,43,2,"CONSTANT","0","LOAD_CONST"],
      [106,46,4,"COMPARE OPERATOR",">","COMPARE_OP"],
      [111,49,13,"RELATIVE JUMP","65","JUMP_IF_FALSE"],
      [1,52,"POP_TOP"],
      [101,53,1,"GLOBAL VARIABLE","a","LOAD_NAME"],
      [101,56,2,"GLOBAL VARIABLE","b","LOAD_NAME"],
      [23,59,"BINARY_ADD"],
      [71,60,"PRINT_ITEM"],
      [72,61,"PRINT_NEWLINE"],
      [110,62,6,"RELATIVE JUMP","71","JUMP_FORWARD"],
      [1,65,"POP_TOP"],
      [101,66,2,"GLOBAL VARIABLE","b","LOAD_NAME"],
      [71,69,"PRINT_ITEM"],
      [72,70,"PRINT_NEWLINE"],
      [100,71,3,"CONSTANT","None","LOAD_CONST"],
      [83,74,"RETURN_VALUE"]
    ];
    benchmark.co_consts = [7, 35, 0, "None"];
    benchmark.co_names = ["True", "a", "b", "False"];
    benchmark.co_filename = benchmark.py;
    benchmark.co_firstlineno = 1;
    benchmark.co_stacksize = 2;
    benchmark.co_flags = 64;
    benchmark.co_locals = [];

