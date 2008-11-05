var compareOps = ['<', '<=', '==', '!=', '>', '>=', 'in', 'not in', 'is', 'is not', 'exception match', 'BAD'];

function Stack() {
  var array = [0,0];
  var sp = 1;
  var bp = 1;

  this.pop = function() {
    return array[sp--];
  }

  this.newFrame = function() {
    this.push(bp);
    bp = sp;
    this.rotate2();
  }

  this.removeFrame = function() {
    var returnVal = array[sp];
    sp = bp-1;
    bp = array[sp];
    array[sp] = returnVal;
  }

  this.push = function(val) {
    array[++sp] = val;
  }

  this.peek = function(val) {
    return array[bp + val];
  }

  this.peekTop = function() {
    return array[sp];
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

  this.printStack = function(desc) {
    document.write("<br/><br/>--- stack: " + desc + " ---<br/>");
    for (var i = array.length-1; i >= 0; i--) {
      document.write(array[i]);
      if (i == sp) document.write(" &lt;-- sp");
      if (i == bp) document.write(" &lt;-- bp");
      document.write("<br/>");
    }
    document.write("--- stack end ---<br/><br/>");
  }
}

var stack = new Stack();

function contains(array, elm) {
  for (var i = 0; i<array.length; i++) {
    if (array[i] == elm) return true;
  }
  return false;
}

function FunctionObject(defaultArgc, codeObject) {
  var defArgc = defaultArgc;
  var codeObject = codeObject;
  var defArgs = new Array();

  this.getArgs = function() {
    return defArgs;
  }

  this.addArg = function(index, val) {
    defArgs[index] = val;
  }

  this.getArgc = function() {
    return argc;
  }

  this.getArgs = function() {
    return defArgs;
  }

  this.getCodeObject = function() {
    return codeObject;
  }
} 

var globalVars = new Array();

function interpret(progName) {
  execute(eval(progName));
}

function execute(code_object) {
  var bytecode, offset, argument;
  var prog = code_object.co_code;
  for (var i=0; i<prog.length; i++) {
    bytecode = prog[i][0];
    offset = prog[i][1];
    argument = prog[i][2]; // Unknown contents if no argument
    switch(bytecode) {
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
          var temp = stack.pop();
          stack.push(stack.pop() * temp);
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
          var temp = stack.pop();
          stack.push(stack.pop() + temp);
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
          var temp = stack.pop();
          stack.push(stack.pop() + temp);
          break;
      case 56: //INPLACE_SUBTRACT
          var temp = stack.pop();
          stack.push(stack.pop() - temp);
          break;
      case 57: //INPLACE_MULTIPLY
          var temp = stack.pop();
          stack.push(stack.pop() * temp);
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
          //Pushes a reference to the locals of the current scope on the stack.
          stack.push(code_object.co_locals);
          break;
      case 83: //RETURN_VALUE
          stack.removeFrame();
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
          //Creates a new class object. TOS is the methods dictionary,
          // TOS1 the tuple of the names of the base classes, and TOS2
          // the class name.
          stack.printStack("Before build");
          var methods = stack.pop();
          var base = stack.pop();
          var className = stack.pop();
          stack.push(new Class(className, base, methods));
          break;
      case 90: //STORE_NAME ------------------ HAVE_ARGUMENT ------------------
          //Implements name = TOS. namei is the index of name in the attribute
          // co_names of the code object 
          //The compiler tries to use STORE_LOCAL or STORE_GLOBAL if possible
          var name = code_object.co_names[argument];
          if (contains(code_object.co_varnames, name) {
            code_object.co_locals[argument] = stack.pop();
          } else {
            globalVars[argument] = stack.pop();
          }
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
          globalVars[argument] = stack.pop();
          break;
      case 98: //DELETE_GLOBAL
          delete globalVars[argument];
          break;
      case 99: //DUP_TOPX
          throw "DUP_TOPX is not implemented yet!";
          break;
      case 100: //LOAD_CONST
          //Only works for type GLOBAL VARIABLE
          var temp = code_object.co_consts[argument];
          if (typeof(temp) == typeof("") && temp.match(/^CODEOBJ: \w+$/)) {
            stack.push(eval(temp.substring(9, temp.length)));
          } else {
            stack.push(temp);
          }
 
          
          break;
      case 101: //LOAD_NAME
          //TODO: check if name is a local or global
          var val = code_object.localVars[argument];
          if (typeof(val) == "undefined") {
            var name = code_object.co_names[argument];
            if (name == "True") {
              val = true;
            } else if (name == "False"){
              val = false;
            }
          }
          stack.push(val);
          break;
      case 102: //BUILD_TUPLE
          // Creates a tuple consuming count items from the stack,
          // and pushes the resulting tuple onto the stack.
          var tuple = [];
          var j = argument - 1;
          while(j >= 0){
            tuple[j] = stack.pop();
            j--;
          }
          stack.push(tuple);
          stack.printStack("After Build tuple");
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
          var temp = stack.pop();
          stack.push(eval(stack.pop() + compareOps[argument] + temp));
          break;
      case 107: //IMPORT_NAME
          throw "IMPORT_NAME is not implemented yet!";
          break;
      case 108: //IMPORT_FROM
          throw "IMPORT_FROM is not implemented yet!";
          break;
      case 110: //JUMP_FORWARD
          // current_offset + jump + bytecode + argument
          var targetOffset = offset + argument + 1 + 2;
          var j = parseInt(i) + 1;
          while(prog[j][1] != targetOffset) {
            j = j + 1;
          }
          i = j - 1;
          break;
      case 111: //JUMP_IF_FALSE 
          //If TOS is false, increment the byte code counter by delta.
          //TOS is not changed.
          //stack.printStack("before JUMP_IF_FALSE");
          if(!stack.peekTop()) {
            // current_offset + jump + bytecode + argument
            var targetOffset = offset + argument + 1 + 2;
            if (argument > 0) {
              var j = parseInt(i);
              while(prog[j][1] != targetOffset) {
                j = j + 1;
              }
              i = j - 1;
            } else {
              var j = parseInt(i);
              while(prog[j][1] != targetOffset) {
                j = j - 1;
              }
              i = j - 1;
            }
          }
          break;
      case 112: //JUMP_IF_TRUE 
          //If TOS is true, increment the byte code counter by delta.
          //TOS is left on the stack
          //stack.printStack("before JUMP_IF_TRUE");
          if(stack.peekTop()) {
            // current_offset + jump + bytecode + argument
            var targetOffset = offset + argument + 1 + 2;
            if (argument > 0) {
              var j = parseInt(i);
              while(prog[j][1] != targetOffset) {
                j = j + 1;
              }
              i = j - 1;
            } else {
              var j = parseInt(i);
              while(prog[j][1] != targetOffset) {
                j = j - 1;
              }
              i = j - 1;
            }
          }
          break;
      case 113: //JUMP_ABSOLUTE
          //Perhaps a bit naive
          var j = 1;
          while(prog[j][1] != argument) {
            j = j + 1;
          }
          i = j - 1;
          break;
      case 116: //LOAD_GLOBAL
          // Loads the global named co_names[namei] onto the stack.
          if (code_object.co_names[argument] == "__name__") {
            stack.push(code_object.co_name);
          } else {
            stack.push(globalVars[argument]);
          }
          break;
      case 119: //CONTINUE_LOOP
          throw "CONTINUE_LOOP is not implemented yet!";
          break;
      case 120: //SETUP_LOOP
          // Pushes a block for a loop onto the block stack.
          // The block spans from the current instruction with
          // a size of delta bytes.

          // Implementation needed to support correct scoping rules.

          //throw "SETUP_LOOP is not implemented yet!";
          break;
      case 121: //SETUP_EXCEPT
          throw "SETUP_EXCEPT is not implemented yet!";
          break;
      case 122: //SETUP_FINALLY
          throw "SETUP_FINALLY is not implemented yet!";
          break;
      case 124: //LOAD_FAST - Pushes a reference to the local co_varnames[var_num] onto the stack. 
          stack.push(code_object.localVars[argument]);
          break;
      case 125: //STORE_FAST - Stores TOS into the local co_varnames[var_num]. 
          code_object.localVars[argument] = stack.pop();
          break;
      case 126: //DELETE_FAST
          delete code_object.localVars[argument];
          break;
      case 130: //RAISE_VARARGS
          throw "RAISE_VARARGS is not implemented yet!";
          break;
      case 131: //CALL_FUNCTION
          var localVars = new Array();
          for (var j = argument-1; j >= 0; j--){
            localVars[j] = [stack.pop()];
          }
          stack.newFrame();
          var codeObject = stack.peek(0).getCodeObject();
          codeObject[2] = localVars;
          execute(codeObject);
          break;
      case 132: //MAKE_FUNCTION
          var functionObject = new FunctionObject(argument, stack.pop());
          for (var j = argument-1; j >= 0; j--){
            functionObject.addArg(j, stack.pop());
          }
          stack.push(functionObject);
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
      default:
          throw "Unexpected bytecode!";
          break;
    }
  }
}

function Class(name, base, methods) {
  this.__name__ = name;
  this.__base__ = base;


  this.__methods__ = methods;

}


function printOut(str) {
  switch(env) {
    case "browser":
      document.write(str);
      break;
    case "v8":
      print(str);
      break;
    case "JSUnit":
      printResult += str;
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