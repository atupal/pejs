/*
[0] Opcode
[1] Argument   (optional)
[2] Arg Type   (optional)
[3] Arg Value  (optional)
[4] Opcode name
[5] Offset
 */
var benchmarkNames = new Array();
  benchmarkNames[0] = "test";

var benchmarkConst = new Array();
  benchmarkConst[0] = [
   [100,1,"CONSTANT","'prut'","LOAD_CONST","0"],
   [71,"PRINT_ITEM","3"],
   [72,"PRINT_NEWLINE","4"],
   [100,0,"CONSTANT","None","LOAD_CONST","5"],
   [83,"RETURN_VALUE","8"]];
  benchmarkConst[1] = "prut"

var benchmark = [
   [100,0,"CONSTANT","<code object test at 0xb7f56a60, file \"benchmark.py\", line 4>","LOAD_CONST","0"],
   [132,0,"OTHER","0","MAKE_FUNCTION","3"],
   [90,0,"GLOBAL VARIABLE","test","STORE_NAME","6"],
   [101,0,"GLOBAL VARIABLE","test","LOAD_NAME","9"],
   [131,0,"OTHER","0","CALL_FUNCTION","12"],
   [1,"POP_TOP","15"],
   [100,1,"CONSTANT","None","LOAD_CONST","16"],
   [83,"RETURN_VALUE","19"]];