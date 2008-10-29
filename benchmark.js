var benchmark =
[ //Code object
  [ //Instructions
    [100,0,"CONSTANT","'ost'","LOAD_CONST",0],
    [100,1,"CONSTANT","'cheese'","LOAD_CONST",3],
    [106,2,"COMPARE OPERATOR","==","COMPARE_OP",6],
    [111,9,"RELATIVE JUMP","21","JUMP_IF_FALSE",9],
    [1,"POP_TOP",12],
    [100,2,"CONSTANT","'hat'","LOAD_CONST",13],
    [71,"PRINT_ITEM",16],
    [72,"PRINT_NEWLINE",17],
    [110,1,"RELATIVE JUMP","22","JUMP_FORWARD",18],
    [1,"POP_TOP",21],
    [100,3,"CONSTANT","None","LOAD_CONST",22],
    [83,"RETURN_VALUE",25]
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