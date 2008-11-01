// This file was automaticly created with pejs.py

// The structure of the code object is:
// [ [[opcode]+] , [const*] , [] , [Symbols*] ]

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var benchmark =
[ //Code object
  [ //Instructions
    [100,0,0,"CONSTANT","'ost'","LOAD_CONST"],
    [100,3,1,"CONSTANT","'cheese'","LOAD_CONST"],
    [106,6,2,"COMPARE OPERATOR","==","COMPARE_OP"],
    [111,9,9,"RELATIVE JUMP","21","JUMP_IF_FALSE"],
    [1,12,"POP_TOP"],
    [100,13,2,"CONSTANT","'hat'","LOAD_CONST"],
    [71,16,"PRINT_ITEM"],
    [72,17,"PRINT_NEWLINE"],
    [110,18,1,"RELATIVE JUMP","22","JUMP_FORWARD"],
    [1,21,"POP_TOP"],
    [100,22,3,"CONSTANT","None","LOAD_CONST"],
    [83,25,"RETURN_VALUE"]
  ],
  [ //Constants
    "ost",
    "cheese",
    "hat",
    "None"
  ],
  [], //Local vars
  [ //Symbol table

  ]
];