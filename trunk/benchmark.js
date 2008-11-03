// This file was automaticly created with pejs.py

// The structure of the code object is:
// [ [[opcode]+], [const*], [], [Symbols*] ]

// The structure of an instruction is:
// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]

var benchmark =
[ //Code object
  [ //Instructions
    [100,0,0,"CONSTANT","'point'","LOAD_CONST"],
    [102,3,0,"OTHER","0","BUILD_TUPLE"],
    [100,6,1,"CONSTANT","<code object point at 0xb7e6c9a0, file \"benchmark.py\", line 5>","LOAD_CONST"],
    [132,9,0,"OTHER","0","MAKE_FUNCTION"],
    [131,12,0,"OTHER","0","CALL_FUNCTION"],
    [89,15,"BUILD_CLASS"],
    [90,16,0,"GLOBAL VARIABLE","point","STORE_NAME"],
    [100,19,2,"CONSTANT","None","LOAD_CONST"],
    [83,22,"RETURN_VALUE"]
  ],
  [ //Constants
    "point",
    [ //Code object
      [ //Instructions
        [116,0,0,"GLOBAL VARIABLE","__name__","LOAD_GLOBAL"],
        [90,3,1,"GLOBAL VARIABLE","__module__","STORE_NAME"],
        [100,6,1,"CONSTANT","2","LOAD_CONST"],
        [90,9,2,"GLOBAL VARIABLE","x","STORE_NAME"],
        [100,12,2,"CONSTANT","3","LOAD_CONST"],
        [90,15,3,"GLOBAL VARIABLE","y","STORE_NAME"],
        [100,18,3,"CONSTANT","<code object getPoint at 0xb7e6ca60, file \"benchmark.py\", line 8>","LOAD_CONST"],
        [132,21,0,"OTHER","0","MAKE_FUNCTION"],
        [90,24,4,"GLOBAL VARIABLE","getPoint","STORE_NAME"],
        [82,27,"LOAD_LOCALS"],
        [83,28,"RETURN_VALUE"]
      ],
      [ //Constants
        "None",
        2,
        3,
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
          "getPoint"
        ]
      ],
      [], //Local vars
      [ //Symbol table
        "__name__",
        "__module__",
        "x",
        "y",
        "getPoint"
      ]
,
      "point"
    ],
    "None"
  ],
  [], //Local vars
  [ //Symbol table
    "point"
  ]
,
  "?"
];