
function Stack() {
  var array = new Array();
  var sp = -1;

  this.pop = function() {
    return array[sp--];
  }

  this.push = function(val) {
    array[++sp] = val;
  }

  this.rotate2 = function() {
    var temp = array[sp];
    array[sp] = array[sp-1];
    array[sp-1] = temp;
  }

  this.rotate3 = function() {
    var temp = array[sp];
    array[sp] = array[sp-1];
    array[sp-1] = array[sp-2];
    array[sp-2] = temp;
  }

  this.rotate4 = function() {
    var temp = array[sp];
    array[sp] = array[sp-1];
    array[sp-1] = array[sp-2];
    array[sp-2] = array[sp-3];
    array[sp-3] = temp;
  }

  this.duplicateTop = function() {
    this.push(array[sp]);
  }
}

var stack = new Stack();

function interpret(progName) {
  var prog = eval(progName); 
  var constPool = eval(progName+"Const");
  var symbolTable = [];

  for (i in prog) {
    switch(prog[i][0]) {
      case 0: //STOP_CODE
          break;
      case 1: //POP_TOP
          stack.pop();
          break;
      case 2: //ROT_TWO
          stack.rotate2();
          break;
      case 3: //ROT_THREE
          stack.rotate3();
          break;
      case 4: //DUP_TOP
          stack.duplicateTop();
          break;
      case 5: //ROT_FOUR
          stack.rotate4();
          break;
      case 9: //NOP
          break;
      case 10: //UNARY_POSITIVE
          stack.push(+stack.pop());
          break;
      case 11: //UNARY_NEGATIVE
          stack.push(-stack.pop());
          break;
      case 12: //UNARY_NOT
          stack.push(!stack.pop());
          break;
      case 13: //UNARY_CONVERT
          throw "UNARY_CONVERT is not implemented yet!";
          break;
      case 15: //UNARY_INVERT
          stack.push(~stack.pop());
          break;
      case 18: //LIST_APPEND
          throw "LIST_APPEND is not implemented yet!";
          break;
      case 19: //BINARY_POWER
          var temp = stack.pop();
          stack.push(Math.pow(stack.pop(), temp));
          break;
      case 20: //BINARY_MULTIPLY
          stack.push(stack.pop() * stack.pop());
          break;
      case 21: //BINARY_DIVIDE
          var temp = stack.pop();
          stack.push(stack.pop() / temp);
          throw "BINARY_DIVIDE is not implemented yet!";
          break;
      case 22: //BINARY_MODULO
          var temp = stack.pop();
          stack.push(stack.pop() % temp);
          break;
      case 23: //BINARY_ADD
          stack.push(stack.pop() + stack.pop());
          break;
      case 24: //BINARY_SUBTRACT
          var temp = stack.pop();
          stack.push(stack.pop() - temp);
          break;
      case 25: //BINARY_SUBSCR
          var temp = stack.pop();
          stack.push(stack.pop()[temp]);
          break;
      case 26: //BINARY_FLOOR_DIVIDE
          throw "BINARY_FLOOR_DIVIDE is not implemented yet!";
          break;
      case 27: //BINARY_TRUE_DIVIDE
          throw "BINARY_TRUE_DIVIDE is not implemented yet!";
          break;
      case 28: //INPLACE_FLOOR_DIVIDE
          throw "INPLACE_FLOOR_DIVIDE is not implemented yet!";
          break;
      case 29: //INPLACE_TRUE_DIVIDE
          throw "INPLACE_TRUE_DIVIDE is not implemented yet!";
          break;
      case 30: //SLICE+0
          throw "SLICE+0 is not implemented yet!";
          break;
      case 31: //SLICE+1
          throw "SLICE+1 is not implemented yet!";
          break;
      case 32: //SLICE+2
          throw "SLICE+2 is not implemented yet!";
          break;
      case 33: //SLICE+3
          throw "SLICE+3 is not implemented yet!";
          break;
      case 40: //STORE_SLICE+0
          throw "STORE_SLICE+0 is not implemented yet!";
          break;
      case 41: //STORE_SLICE+1
          throw "STORE_SLICE+1 is not implemented yet!";
          break;
      case 42: //STORE_SLICE+2
          throw "STORE_SLICE+2 is not implemented yet!";
          break;
      case 43: //STORE_SLICE+3
          throw "STORE_SLICE+3 is not implemented yet!";
          break;
      case 50: //DELETE_SLICE+0
          throw "DELETE_SLICE+0 is not implemented yet!";
          break;
      case 51: //DELETE_SLICE+1
          throw "DELETE_SLICE+1 is not implemented yet!";
          break;
      case 52: //DELETE_SLICE+2
          throw "DELETE_SLICE+2 is not implemented yet!";
          break;
      case 53: //DELETE_SLICE+3
          throw "DELETE_SLICE+3 is not implemented yet!";
          break;
      case 55: //INPLACE_ADD
          stack.push(stack.pop() + stack.pop());
          break;
      case 56: //INPLACE_SUBTRACT
          var temp = stack.pop();
          stack.push(stack.pop() - temp);
          break;
      case 57: //INPLACE_MULTIPLY
          stack.push(stack.pop() * stack.pop());
          break;
      case 58: //INPLACE_DIVIDE
          throw "INPLACE_DIVIDE is not implemented yet!";
          break;
      case 59: //INPLACE_MODULO
          var temp = stack.pop();
          stack.push(stack.pop() % temp);
          break;
      case 60: //STORE_SUBSCR
          var temp = stack.pop();
          stack.pop()[temp] = stack.pop();
          break;
      case 61: //DELETE_SUBSCR
          throw "DELETE_SUBSCR is not implemented yet!";
          break;
      case 62: //BINARY_LSHIFT
          var temp = stack.pop();
          stack.push(stack.pop() << temp);
          break;
      case 63: //BINARY_RSHIFT
          var temp = stack.pop();
          stack.push(stack.pop() >> temp);
          break;
      case 64: //BINARY_AND
          var temp = stack.pop();
          stack.push(stack.pop() & temp);
          break;
      case 65: //BINARY_XOR
          var temp = stack.pop();
          stack.push(stack.pop() ^ temp);
          break;
      case 66: //BINARY_OR
          var temp = stack.pop();
          stack.push(stack.pop() | temp);
          break;
      case 67: //INPLACE_POWER
          var temp = stack.pop();
          stack.push(Math.pow(stack.pop(), temp));
          break;
      case 68: //GET_ITER
          throw "GET_ITER is not implemented yet!";
          break;
      case 70: //PRINT_EXPR
          throw "PRINT_EXPR is not implemented yet!";
          break;
      case 71: //PRINT_ITEM
          printOut(stack.pop());
          break;
      case 72: //PRINT_NEWLINE
          printOut("\n");
          break;
      case 73: //PRINT_ITEM_TO
          throw "PRINT_ITEM_TO is not implemented yet!";
          break;
      case 74: //PRINT_NEWLINE_TO
          throw "PRINT_NEWLINE_TO is not implemented yet!";
          break;
      case 75: //INPLACE_LSHIFT
          var temp = stack.pop();
          stack.push(stack.pop() << temp);
          break;
      case 76: //INPLACE_RSHIFT
          var temp = stack.pop();
          stack.push(stack.pop() >> temp);
          break;
      case 77: //INPLACE_AND
          var temp = stack.pop();
          stack.push(stack.pop() & temp);
          break;
      case 78: //INPLACE_XOR
          var temp = stack.pop();
          stack.push(stack.pop() ^ temp);
          break;
      case 79: //INPLACE_OR
          var temp = stack.pop();
          stack.push(stack.pop() | temp);
          break;
      case 80: //BREAK_LOOP
          throw "BREAK_LOOP is not implemented yet!";
          break;
      case 82: //LOAD_LOCALS
          throw "LOAD_LOCALS is not implemented yet!";
          break;
      case 83: //RETURN_VALUE
          throw "RETURN_VALUE is not implemented yet!";
          break;
      case 84: //IMPORT_STAR
          throw "IMPORT_STAR is not implemented yet!";
          break;
      case 85: //EXEC_STMT
          throw "EXEC_STMT is not implemented yet!";
          break;
      case 86: //YIELD_VALUE
          throw "YIELD_VALUE is not implemented yet!";
          break;
      case 87: //POP_BLOCK
          throw "POP_BLOCK is not implemented yet!";
          break;
      case 88: //END_FINALLY
          throw "END_FINALLY is not implemented yet!";
          break;
      case 89: //BUILD_CLASS
          throw "BUILD_CLASS is not implemented yet!";
          break;
      case 90: //STORE_NAME ------------------ HAVE_ARGUMENT ------------------
          throw "STORE_NAME is not implemented yet!";
          break;
      case 91: //DELETE_NAME
          throw "DELETE_NAME is not implemented yet!";
          break;
      case 92: //UNPACK_SEQUENCE
          throw "UNPACK_SEQUENCE is not implemented yet!";
          break;
      case 93: //FOR_ITER
          throw "FOR_ITER is not implemented yet!";
          break;
      case 95: //STORE_ATTR
          throw "STORE_ATTR is not implemented yet!";
          break;
      case 96: //DELETE_ATTR
          throw "DELETE_ATTR is not implemented yet!";
          break;
      case 97: //STORE_GLOBAL
          throw "STORE_GLOBAL is not implemented yet!";
          break;
      case 98: //DELETE_GLOBAL
          throw "DELETE_GLOBAL is not implemented yet!";
          break;
      case 99: //DUP_TOPX
          throw "DUP_TOPX is not implemented yet!";
          break;
      case 100: //LOAD_CONST
          stack.push(constPool[prog[i][1]]);
          break;
      case 101: //LOAD_NAME
          throw "LOAD_NAME is not implemented yet!";
          break;
      case 102: //BUILD_TUPLE
          throw "BUILD_TUPLE is not implemented yet!";
          break;
      case 103: //BUILD_LIST
          throw "BUILD_LIST is not implemented yet!";
          break;
      case 104: //BUILD_MAP
          throw "BUILD_MAP is not implemented yet!";
          break;
      case 105: //LOAD_ATTR
          throw "LOAD_ATTR is not implemented yet!";
          break;
      case 106: //COMPARE_OP
          throw "COMPARE_OP is not implemented yet!";
          break;
      case 107: //IMPORT_NAME
          throw "IMPORT_NAME is not implemented yet!";
          break;
      case 108: //IMPORT_FROM
          throw "IMPORT_FROM is not implemented yet!";
          break;
      case 110: //JUMP_FORWARD
          throw "JUMP_FORWARD is not implemented yet!";
          break;
      case 111: //JUMP_IF_FALSE
          throw "JUMP_IF_FALSE is not implemented yet!";
          break;
      case 112: //JUMP_IF_FALSE
          throw "JUMP_IF_FALSE is not implemented yet!";
          break;
      case 113: //JUMP_ABSOLUTE
          throw "JUMP_ABSOLUTE is not implemented yet!";
          break;
      case 116: //LOAD_GLOBAL
          throw "LOAD_GLOBAL is not implemented yet!";
          break;
      case 119: //CONTINUE_LOOP
          throw "CONTINUE_LOOP is not implemented yet!";
          break;
      case 120: //SETUP_LOOP
          throw "SETUP_LOOP is not implemented yet!";
          break;
      case 121: //SETUP_EXCEPT
          throw "SETUP_EXCEPT is not implemented yet!";
          break;
      case 122: //SETUP_FINALLY
          throw "SETUP_FINALLY is not implemented yet!";
          break;
      case 124: //LOAD_FAST
          throw "LOAD_FAST is not implemented yet!";
          break;
      case 125: //STORE_FAST
          throw "STORE_FAST is not implemented yet!";
          break;
      case 126: //DELETE_FAST
          throw "DELETE_FAST is not implemented yet!";
          break;
      case 130: //RAISE_VARARGS
          throw "RAISE_VARARGS is not implemented yet!";
          break;
      case 131: //CALL_FUNCTION
          throw "CALL_FUNCTION is not implemented yet!";
          break;
      case 132: //MAKE_FUNCTION
          throw "MAKE_FUNCTION is not implemented yet!";
          break;
      case 133: //BUILD_SLICE
          throw "BUILD_SLICE is not implemented yet!";
          break;
      case 134: //MAKE_CLOSURE
          throw "MAKE_CLOSURE is not implemented yet!";
          break;
      case 135: //LOAD_CLOSURE
          throw "LOAD_CLOSURE is not implemented yet!";
          break;
      case 136: //LOAD_DEREF
          throw "LOAD_DEREF is not implemented yet!";
          break;
      case 137: //STORE_DEREF
          throw "STORE_DEREF is not implemented yet!";
          break;
      case 140: //CALL_FUNCTION_VAR
          throw "CALL_FUNCTION_VAR is not implemented yet!";
          break;
      case 141: //CALL_FUNTION_KW
          throw "CALL_FUNTION_KW is not implemented yet!";
          break;
      case 142: //CALL_FUNCTION_VAR_KW
          throw "CALL_FUNCTION_VAR_KW is not implemented yet!";
          break;
      case 143: //EXTENDED_ARG
          throw "EXTENDED_ARG is not implemented yet!";
          break;
    }
  }
}

function printOut(str) {
  switch(env) {
    case "browser":
      document.write(str);
      break;
    case "v8":
      print(str);
      break;
  }
}

var env;
function setEnv() {
  if(typeof(alert) == "undefined") {
    env = "v8";
  } else {
    env = "browser";
  }
}

setEnv();