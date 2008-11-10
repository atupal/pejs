// This file was automatically created with pejs.py

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var two_plus_five = new Object();
    two_plus_five.co_name = "?";
    two_plus_five.co_argcount = 0;
    two_plus_five.co_nlocals = 0;
    two_plus_five.co_varnames = [];
    two_plus_five.co_cellvars = [];
    two_plus_five.co_freevars = [];
    two_plus_five.co_code =     [ //Instructions
      [100,0,0,"CONSTANT","2","LOAD_CONST"],
      [100,3,1,"CONSTANT","5","LOAD_CONST"],
      [23,6,"BINARY_ADD"],
      [71,7,"PRINT_ITEM"],
      [72,8,"PRINT_NEWLINE"],
      [100,9,2,"CONSTANT","None","LOAD_CONST"],
      [83,12,"RETURN_VALUE"]
    ];
    two_plus_five.co_consts = [2, 5, "None"];
    two_plus_five.co_names = [];
    two_plus_five.co_filename = two_plus_five.py;
    two_plus_five.co_firstlineno = 1;
    two_plus_five.co_stacksize = 2;
    two_plus_five.co_flags = 64;
    two_plus_five.co_locals = [];

