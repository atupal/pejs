// This file was automaticly created with pejs.py

// The structure of the code object is:
// [ [[opcode]+], [const*], [], [Symbols*] ]

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var functions =
[ //Code object
  [ //Instructions
    [100,0,0,"CONSTANT","<code object one at 0xb7f12c60, file \"functions.py\", line 1>","LOAD_CONST"],
    [132,3,0,"OTHER","0","MAKE_FUNCTION"],
    [90,6,0,"GLOBAL VARIABLE","one","STORE_NAME"],
    [100,9,1,"CONSTANT","<code object two at 0xb7f12a20, file \"functions.py\", line 4>","LOAD_CONST"],
    [132,12,0,"OTHER","0","MAKE_FUNCTION"],
    [90,15,1,"GLOBAL VARIABLE","two","STORE_NAME"],
    [100,18,2,"CONSTANT","<code object add at 0xb7f127a0, file \"functions.py\", line 7>","LOAD_CONST"],
    [132,21,0,"OTHER","0","MAKE_FUNCTION"],
    [90,24,2,"GLOBAL VARIABLE","add","STORE_NAME"],
    [101,27,2,"GLOBAL VARIABLE","add","LOAD_NAME"],
    [101,30,0,"GLOBAL VARIABLE","one","LOAD_NAME"],
    [131,33,0,"OTHER","0","CALL_FUNCTION"],
    [101,36,1,"GLOBAL VARIABLE","two","LOAD_NAME"],
    [131,39,0,"OTHER","0","CALL_FUNCTION"],
    [131,42,2,"OTHER","2","CALL_FUNCTION"],
    [90,45,3,"GLOBAL VARIABLE","three","STORE_NAME"],
    [100,48,3,"CONSTANT","<code object inc at 0xb7f12b20, file \"functions.py\", line 12>","LOAD_CONST"],
    [132,51,0,"OTHER","0","MAKE_FUNCTION"],
    [90,54,4,"GLOBAL VARIABLE","inc","STORE_NAME"],
    [100,57,4,"CONSTANT","<code object four at 0xb7c91960, file \"functions.py\", line 15>","LOAD_CONST"],
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
  ],
  [ //Constants
    [ //Code object
      [ //Instructions
        [100,0,1,"CONSTANT","1","LOAD_CONST"],
        [83,3,"RETURN_VALUE"]
      ],
      [ //Constants
        "None",
        1
      ],
      [], //Local vars
      [ //Symbol table

      ]
,
      "one"
    ],
    [ //Code object
      [ //Instructions
        [100,0,1,"CONSTANT","2","LOAD_CONST"],
        [83,3,"RETURN_VALUE"]
      ],
      [ //Constants
        "None",
        2
      ],
      [], //Local vars
      [ //Symbol table

      ]
,
      "two"
    ],
    [ //Code object
      [ //Instructions
        [124,0,0,"LOCAL VARIABLE","left","LOAD_FAST"],
        [124,3,1,"LOCAL VARIABLE","right","LOAD_FAST"],
        [23,6,"BINARY_ADD"],
        [83,7,"RETURN_VALUE"]
      ],
      [ //Constants
        "None"
      ],
      [], //Local vars
      [ //Symbol table
        "left",
        "right"
      ]
,
      "add"
    ],
    [ //Code object
      [ //Instructions
        [124,0,0,"LOCAL VARIABLE","value","LOAD_FAST"],
        [116,3,1,"GLOBAL VARIABLE","one","LOAD_GLOBAL"],
        [131,6,0,"OTHER","0","CALL_FUNCTION"],
        [23,9,"BINARY_ADD"],
        [83,10,"RETURN_VALUE"]
      ],
      [ //Constants
        "None"
      ],
      [], //Local vars
      [ //Symbol table
        "value",
        "one"
      ]
,
      "inc"
    ],
    [ //Code object
      [ //Instructions
        [116,0,0,"GLOBAL VARIABLE","inc","LOAD_GLOBAL"],
        [116,3,1,"GLOBAL VARIABLE","three","LOAD_GLOBAL"],
        [131,6,1,"OTHER","1","CALL_FUNCTION"],
        [83,9,"RETURN_VALUE"]
      ],
      [ //Constants
        "None"
      ],
      [], //Local vars
      [ //Symbol table
        "inc",
        "three"
      ]
,
      "four"
    ],
    "",
    "None"
  ],
  [], //Local vars
  [ //Symbol table
    "one",
    "two",
    "add",
    "three",
    "inc",
    "four"
  ]
,
  "?"
];