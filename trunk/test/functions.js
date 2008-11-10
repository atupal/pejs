// This file was automatically created with pejs.py

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var functions = new Object();
    functions.co_name = "?";
    functions.co_argcount = 0;
    functions.co_nlocals = 0;
    functions.co_varnames = ["three", "two", "four", "add", "one", "inc"];
    functions.co_cellvars = [];
    functions.co_freevars = [];
    functions.co_code =     [ //Instructions
      [100,0,0,"CONSTANT","<code object one at 0xb7eb39e0, file \"functions.py\", line 1>","LOAD_CONST"],
      [132,3,0,"OTHER","0","MAKE_FUNCTION"],
      [90,6,0,"GLOBAL VARIABLE","one","STORE_NAME"],
      [100,9,1,"CONSTANT","<code object two at 0xb7eb3c20, file \"functions.py\", line 4>","LOAD_CONST"],
      [132,12,0,"OTHER","0","MAKE_FUNCTION"],
      [90,15,1,"GLOBAL VARIABLE","two","STORE_NAME"],
      [100,18,2,"CONSTANT","<code object add at 0xb7eb3be0, file \"functions.py\", line 7>","LOAD_CONST"],
      [132,21,0,"OTHER","0","MAKE_FUNCTION"],
      [90,24,2,"GLOBAL VARIABLE","add","STORE_NAME"],
      [101,27,2,"GLOBAL VARIABLE","add","LOAD_NAME"],
      [101,30,0,"GLOBAL VARIABLE","one","LOAD_NAME"],
      [131,33,0,"OTHER","0","CALL_FUNCTION"],
      [101,36,1,"GLOBAL VARIABLE","two","LOAD_NAME"],
      [131,39,0,"OTHER","0","CALL_FUNCTION"],
      [131,42,2,"OTHER","2","CALL_FUNCTION"],
      [90,45,3,"GLOBAL VARIABLE","three","STORE_NAME"],
      [100,48,3,"CONSTANT","<code object inc at 0xb7eb39a0, file \"functions.py\", line 12>","LOAD_CONST"],
      [132,51,0,"OTHER","0","MAKE_FUNCTION"],
      [90,54,4,"GLOBAL VARIABLE","inc","STORE_NAME"],
      [100,57,4,"CONSTANT","<code object four at 0xb7eb3a60, file \"functions.py\", line 15>","LOAD_CONST"],
      [132,60,0,"OTHER","0","MAKE_FUNCTION"],
      [90,63,5,"GLOBAL VARIABLE","four","STORE_NAME"],
      [101,66,5,"GLOBAL VARIABLE","four","LOAD_NAME"],
      [131,69,0,"OTHER","0","CALL_FUNCTION"],
      [100,72,5,"CONSTANT","''","LOAD_CONST"],
      [23,75,"BINARY_ADD"],
      [101,76,1,"GLOBAL VARIABLE","two","LOAD_NAME"],
      [131,79,0,"OTHER","0","CALL_FUNCTION"],
      [23,82,"BINARY_ADD"],
      [71,83,"PRINT_ITEM"],
      [72,84,"PRINT_NEWLINE"],
      [100,85,6,"CONSTANT","None","LOAD_CONST"],
      [83,88,"RETURN_VALUE"]
    ];
    functions.co_consts = ["CODEOBJ: functions_one", "CODEOBJ: functions_two", "CODEOBJ: functions_add", "CODEOBJ: functions_inc", "CODEOBJ: functions_four", "", "None"];
    functions.co_names = ["one", "two", "add", "three", "inc", "four"];
    functions.co_filename = functions.py;
    functions.co_firstlineno = 1;
    functions.co_stacksize = 3;
    functions.co_flags = 64;
    functions.co_locals = [];

var functions_one = new Object();
    functions_one.co_name = "one";
    functions_one.co_argcount = 0;
    functions_one.co_nlocals = 0;
    functions_one.co_varnames = [];
    functions_one.co_cellvars = [];
    functions_one.co_freevars = [];
    functions_one.co_code =     [ //Instructions
      [100,0,1,"CONSTANT","1","LOAD_CONST"],
      [83,3,"RETURN_VALUE"]
    ];
    functions_one.co_consts = ["None", 1];
    functions_one.co_names = [];
    functions_one.co_filename = functions.py;
    functions_one.co_firstlineno = 1;
    functions_one.co_stacksize = 1;
    functions_one.co_flags = 67;
    functions_one.co_locals = [];

var functions_two = new Object();
    functions_two.co_name = "two";
    functions_two.co_argcount = 0;
    functions_two.co_nlocals = 0;
    functions_two.co_varnames = [];
    functions_two.co_cellvars = [];
    functions_two.co_freevars = [];
    functions_two.co_code =     [ //Instructions
      [100,0,1,"CONSTANT","2","LOAD_CONST"],
      [83,3,"RETURN_VALUE"]
    ];
    functions_two.co_consts = ["None", 2];
    functions_two.co_names = [];
    functions_two.co_filename = functions.py;
    functions_two.co_firstlineno = 4;
    functions_two.co_stacksize = 1;
    functions_two.co_flags = 67;
    functions_two.co_locals = [];

var functions_add = new Object();
    functions_add.co_name = "add";
    functions_add.co_argcount = 2;
    functions_add.co_nlocals = 2;
    functions_add.co_varnames = ["left", "right"];
    functions_add.co_cellvars = [];
    functions_add.co_freevars = [];
    functions_add.co_code =     [ //Instructions
      [124,0,0,"LOCAL VARIABLE","left","LOAD_FAST"],
      [124,3,1,"LOCAL VARIABLE","right","LOAD_FAST"],
      [23,6,"BINARY_ADD"],
      [83,7,"RETURN_VALUE"]
    ];
    functions_add.co_consts = ["None"];
    functions_add.co_names = ["left", "right"];
    functions_add.co_filename = functions.py;
    functions_add.co_firstlineno = 7;
    functions_add.co_stacksize = 2;
    functions_add.co_flags = 67;
    functions_add.co_locals = [];

var functions_inc = new Object();
    functions_inc.co_name = "inc";
    functions_inc.co_argcount = 1;
    functions_inc.co_nlocals = 1;
    functions_inc.co_varnames = ["value"];
    functions_inc.co_cellvars = [];
    functions_inc.co_freevars = [];
    functions_inc.co_code =     [ //Instructions
      [124,0,0,"LOCAL VARIABLE","value","LOAD_FAST"],
      [116,3,1,"GLOBAL VARIABLE","one","LOAD_GLOBAL"],
      [131,6,0,"OTHER","0","CALL_FUNCTION"],
      [23,9,"BINARY_ADD"],
      [83,10,"RETURN_VALUE"]
    ];
    functions_inc.co_consts = ["None"];
    functions_inc.co_names = ["value", "one"];
    functions_inc.co_filename = functions.py;
    functions_inc.co_firstlineno = 12;
    functions_inc.co_stacksize = 2;
    functions_inc.co_flags = 67;
    functions_inc.co_locals = [];

var functions_four = new Object();
    functions_four.co_name = "four";
    functions_four.co_argcount = 0;
    functions_four.co_nlocals = 0;
    functions_four.co_varnames = [];
    functions_four.co_cellvars = [];
    functions_four.co_freevars = [];
    functions_four.co_code =     [ //Instructions
      [116,0,0,"GLOBAL VARIABLE","inc","LOAD_GLOBAL"],
      [116,3,1,"GLOBAL VARIABLE","three","LOAD_GLOBAL"],
      [131,6,1,"OTHER","1","CALL_FUNCTION"],
      [83,9,"RETURN_VALUE"]
    ];
    functions_four.co_consts = ["None"];
    functions_four.co_names = ["inc", "three"];
    functions_four.co_filename = functions.py;
    functions_four.co_firstlineno = 15;
    functions_four.co_stacksize = 2;
    functions_four.co_flags = 67;
    functions_four.co_locals = [];

