// This file was automaticly created with pejs.py

// The structure of the code object is:
// [ [[opcode]+], [const*], [], [Symbols*] ]

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var two_plus_five =
[ //Code object
  [ //Instructions
    [100,0,0,"CONSTANT","2","LOAD_CONST"],
    [100,3,1,"CONSTANT","5","LOAD_CONST"],
    [23,6,"BINARY_ADD"],
    [71,7,"PRINT_ITEM"],
    [72,8,"PRINT_NEWLINE"],
    [100,9,2,"CONSTANT","None","LOAD_CONST"],
    [83,12,"RETURN_VALUE"]
  ],
  [ //Constants
    2,
    5,
    "None"
  ],
  [], //Local vars
  [ //Symbol table

  ]
,
  "?"
];