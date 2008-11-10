// This file was automatically created with pejs.py

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var variables = new Object();
    variables.co_name = "?";
    variables.co_argcount = 0;
    variables.co_nlocals = 0;
    variables.co_varnames = ["four", "three", "two", "one"];
    variables.co_cellvars = [];
    variables.co_freevars = [];
    variables.co_code =     [ //Instructions
      [100,0,0,"CONSTANT","1","LOAD_CONST"],
      [90,3,0,"GLOBAL VARIABLE","one","STORE_NAME"],
      [101,6,0,"GLOBAL VARIABLE","one","LOAD_NAME"],
      [100,9,1,"CONSTANT","2","LOAD_CONST"],
      [20,12,"BINARY_MULTIPLY"],
      [90,13,1,"GLOBAL VARIABLE","two","STORE_NAME"],
      [101,16,0,"GLOBAL VARIABLE","one","LOAD_NAME"],
      [101,19,1,"GLOBAL VARIABLE","two","LOAD_NAME"],
      [23,22,"BINARY_ADD"],
      [90,23,2,"GLOBAL VARIABLE","three","STORE_NAME"],
      [101,26,2,"GLOBAL VARIABLE","three","LOAD_NAME"],
      [101,29,1,"GLOBAL VARIABLE","two","LOAD_NAME"],
      [23,32,"BINARY_ADD"],
      [101,33,0,"GLOBAL VARIABLE","one","LOAD_NAME"],
      [24,36,"BINARY_SUBTRACT"],
      [90,37,3,"GLOBAL VARIABLE","four","STORE_NAME"],
      [101,40,3,"GLOBAL VARIABLE","four","LOAD_NAME"],
      [100,43,2,"CONSTANT","''","LOAD_CONST"],
      [23,46,"BINARY_ADD"],
      [101,47,1,"GLOBAL VARIABLE","two","LOAD_NAME"],
      [23,50,"BINARY_ADD"],
      [71,51,"PRINT_ITEM"],
      [72,52,"PRINT_NEWLINE"],
      [100,53,3,"CONSTANT","None","LOAD_CONST"],
      [83,56,"RETURN_VALUE"]
    ];
    variables.co_consts = [1, 2, "", "None"];
    variables.co_names = ["one", "two", "three", "four"];
    variables.co_filename = variables.py;
    variables.co_firstlineno = 1;
    variables.co_stacksize = 2;
    variables.co_flags = 64;
    variables.co_locals = [];

