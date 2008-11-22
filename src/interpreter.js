var compareOps = ['<', '<=', '==', '!=',
                  '>', '>=', 'in', 'not in',
                  'is', 'is not', 'exception match',
                  'BAD'];

function Stack() {
  var array = [];
  var sp = -1;
  var bp = -1;

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
    if (sp < 1) {
      sp = 0;
      bp = -1; 
    }
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
    printDebug("<tr><td colspan=\"6\" class=\"stackHeader\">Stack print: "+desc+"</td></tr>")
    for (var i = array.length-1; i >= 0; i--) {
      printDebug("<tr><td colspan=\"3\" class=\"stackContent\">");
      printDebug(array[i]);
      printDebug("</td><td colspan=\"3\" class=\"stackPointer\">");
      if (i == sp) printDebug(" &lt;-- sp");
      if (i == bp) printDebug(" &lt;-- bp");
      printDebug("</td><td></td></tr>");
    }
  }

  this.printLine = function(desc) {
    var res = "";
    for (var i = 0; i <= sp; i++) {
      res += array[i];
      if (i == bp) res += " (bp)";
      if (i == sp) res += " (sp)";
      res += ", ";
    }
    return res;
  }
}

var stack = new Stack();
var blockStack = new Stack();

function contains(array, elm) {
  for (var i = 0; i<array.length; i++) {
    if (array[i] == elm) return true;
  }
  return false;
}

function FunctionObject(defaultArgc, codeObj) {
  this.defArgc = defaultArgc;
  this.codeObject = codeObj;
  this.defArgs = new Array();

  this.getArgs = function() {
    return this.defArgs;
  }

  this.addArg = function(index, val) {
    this.defArgs[index] = val;
  }

  this.getArgc = function() {
    return this.defArgc;
  }

  this.getArgs = function() {
    return this.defArgs;
  }

  this.getCodeObject = function() {
    return this.codeObject;
  }
}

var globals = new Globals();
function Globals() {
  var values = [[]]; //Initialized with a special array for new globals
  var names = [[]];

  this.add = function(nameArray, valueArray) {
    names[names.length] = nameArray;
    values[values.length] = valueArray;
  }

  this.store = function(name, value) {
    for(var i=0; i<names.length; i++) {
      var index = names[i].indexOf(name);
      if (index > -1) {
	values[i][index] = value;
	return;
      }
    }
    //new global variable - added to a special array
    var index = names[0].length;
    names[0][index] = name;
    values[0][index] = value;
  }

  this.lookup = function(name) {
    for(var i=0; i<names.length; i++) {
      var index = names[i].indexOf(name);
      if (index > -1) return values[i][index];
    }
    throw "Global lookup of \""+name+"\" failed.";
  }

  this.contains = function(name) {
    for(var i=0; i<names.length; i++) {
      var index = names[i].indexOf(name);
      if (index > -1) return true;
    }
    return false;
  }

  this.delete = function(name) {
    for(var i=0; i<names.length; i++) {
      var index = names[i].indexOf(name);
      if (index > -1) {
	delete names[i][index];
	delete values[i][index];
	return;
      }
    }
    throw "Global lookup of \""+name+"\" failed.";
  }
}

function interpret(progName, debugEnabled) {
  if (debugEnabled)
    debug = true;
  if (typeof(pejs_library) != typeof(undefined)) {
    globals.add(pejs_library.co_varnames, pejs_library.co_locals);
    printfDebug("blue","Execution trace of PEJS Library");
    execute(pejs_library);
  } else {
    throw "pejs_library not found";
  }

  stack = new Stack();
  blockStack = new Stack();
  var code_object = eval(progName);
  globals.add(code_object.co_varnames, code_object.co_locals);
  printfDebug("blue","Execution trace of "+progName);
  execute(code_object);
}

function execute(code_object) {
  printfDebug("blue","Execution trace of "+code_object.co_name);
  var bytecode, offset, argument;
  var prog = code_object.co_code;
  for (var pc=0; pc<prog.length; pc++) {
    bytecode = prog[pc][0];
    offset = prog[pc][1];
    argument = prog[pc][2]; //Unknown contents if no argument
    
    printInstruction(prog[pc]);
    
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
          //Implements TOS = iter(TOS).
          break;
      case 70: //PRINT_EXPR
          throw "PRINT_EXPR is not implemented yet!";
          break;
      case 71: //PRINT_ITEM
          printOut(stack.pop());
          break;
      case 72: //PRINT_NEWLINE
          printNewline();
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
	  //Terminates a loop due to a break statement.
	  var block = blockStack.pop();
	  var targetOffset = block[0] + block[1] + 1;
          var j = pc + 1;
          while(prog[j][1] != targetOffset) {
            j = j + 1;
          }
          pc = j - 1;
          break;
      case 82: //LOAD_LOCALS
          //Pushes a reference to the locals of the
          //current scope on the stack.
          //This is used in the code for a class definition:
	  // After the class body is evaluated,
          //the locals are passed to the class definition. 
          //document.write("Locals: "+code_object.co_locals);
          //stack.push([code_object.co_varnames, code_object.co_locals]);
          stack.push(code_object);
          break;
      case 83: //RETURN_VALUE
          stack.removeFrame();
          return;
      case 84: //IMPORT_STAR
          throw "IMPORT_STAR is not implemented yet!";
          break;
      case 85: //EXEC_STMT
	  //Implements exec TOS2,TOS1,TOS. The compiler fills
	  //missing optional parameters with None.
	  var expr1 = stack.pop();
	  var expr2 = stack.pop();
	  var stmt = stack.pop();
	  if (expr2 == "JavaScript") {
	    eval(stmt);
	  } else {
	    printfDebug("blue", "Could not execute \""+stmt+"\"");
	    throw "EXEC_STMT is not implemented for Python statements yet!";
	  }
          break;
      case 86: //YIELD_VALUE
          throw "YIELD_VALUE is not implemented yet!";
          break;
      case 87: //POP_BLOCK
	  blockStack.pop();
          break;
      case 88: //END_FINALLY
	  //Terminates a finally clause. The interpreter recalls whether
	  //the exception has to be re-raised, or whether the function
	  //returns, and continues with the outer-next block. 
	  blockStack.pop();
          break;
      case 89: //BUILD_CLASS
          //Creates a new class object. TOS is the methods dictionary,
          // TOS1 the tuple of the names of the base classes, and TOS2
          // the class name.
          var codeObj = stack.pop();
          var base = stack.pop();
          var className = stack.pop();
          //document.write("Methods: " + methods);
          stack.push(new PyClass(className, base, codeObj));
          break;
      case 90: //STORE_NAME ------------------ HAVE_ARGUMENT ------------------
          //Implements name = TOS. namei is the index of name in the attribute
          //co_names of the code object.
          //The compiler tries to use STORE_LOCAL or STORE_GLOBAL if possible
          var name = code_object.co_names[argument];
          if (contains(code_object.co_varnames, name)) {
            code_object.co_locals[code_object.co_varnames.indexOf(name)] = stack.pop();
          } else if(globals.contains(name)) {
            globals.store(name, stack.pop());
          } else {
            //new variable
            var index = code_object.co_varnames.length;
            code_object.co_varnames[index] = name;
            code_object.co_locals[index] = stack.pop();
          }
          break;
      case 91: //DELETE_NAME
          throw "DELETE_NAME is not implemented yet!";
          break;
      case 92: //UNPACK_SEQUENCE
          throw "UNPACK_SEQUENCE is not implemented yet!";
          break;
      case 93: //FOR_ITER
          //TOS is an iterator. Call its next() method. If this yields a new value,
          //push it on the stack (leaving the iterator below it). If the iterator
          //indicates it is exhausted TOS is popped, and the byte code counter is
          //incremented by delta.
          var pair = stack.peekTop();
          if (pair[0] <= pair[1]) {
            stack.push(pair[0]++);
          } else {
            stack.pop();

            var targetOffset = offset + argument + 1 + 2;
            if (argument > 0) {
              var j = pc;
              while(prog[j][1] != targetOffset) {
                j = j + 1;
              }
              pc = j - 1;
            } else {
              var j = pc;
              while(prog[j][1] != targetOffset) {
                j = j - 1;
              }
              pc = j - 1;
            }
          }
          break;
      case 95: //STORE_ATTR
          //Implements TOS.name = TOS1, where namei is
          //the index of name in co_names.
          var obj = stack.pop();
          var name = code_object.co_names[argument];
          var index = obj.fieldNames.indexOf(name);
          if (index > -1) {
            obj.fieldValues[index] = stack.pop();
          } else {
            index = obj.fieldNames.length;
            obj.fieldNames[index] = name;
            obj.fieldValues[index] = stack.pop();
          }
          break;
      case 96: //DELETE_ATTR
          throw "DELETE_ATTR is not implemented yet!";
          break;
      case 97: //STORE_GLOBAL
          globals.store(code_object.co_names[argument], stack.pop());
          break;
      case 98: //DELETE_GLOBAL
          var name = code_object.co_names[argument];
          delete code_object.co_names[argument];
          if (globals.contains(name)) {
            globals.delete(name);
          }
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
          //Pushes the value associated with "co_names[namei]" onto the stack.
          // First we try to find the value in locals then in globals.
          var name = code_object.co_names[argument];
          if(contains(code_object.co_varnames, name)){
             stack.push(code_object.co_locals[code_object.co_varnames.indexOf(name)]);
          } else if (globals.contains(name)) {
             stack.push(globals.lookup(name));
          } else {
            throw "LOAD_NAME attempted to load nonexisting name \""+name+"\"";
          }
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
          break;
      case 103: //BUILD_LIST
          throw "BUILD_LIST is not implemented yet!";
          break;
      case 104: //BUILD_MAP
          throw "BUILD_MAP is not implemented yet!";
          break;
      case 105: //LOAD_ATTR
          //Replaces TOS with getattr(TOS, co_names[namei])
          var object = stack.pop();
          var name = code_object.co_names[argument];
          var index = object.fieldNames.indexOf(name);
          if (index > -1) {
            stack.push(object.fieldValues[index]);
          } else {
            var index = object.class.getCodeObject().co_varnames.indexOf(name);
            var attrObject = object.class.getCodeObject().co_locals[index];
            if (typeof(attrObject.getCodeObject) == typeof(function() {})) {
              attrObject.getCodeObject().co_varnames[0] = "self";
              attrObject.getCodeObject().co_locals[0] = object;
            } else {
              throw "LOAD_ATTR tried to load non-function "+ name +
                    " from class "+ object.class.__name__;
            }
            stack.push(attrObject);
          }
          break;
      case 106: //COMPARE_OP
          var temp = stack.pop();
          stack.push(eval(stack.pop() + compareOps[argument] + temp));
          break;
      case 107: //IMPORT_NAME
	  //Imports the module co_names[namei]. The module object is pushed
	  //onto the stack. The current namespace is not affected: for a
	  //proper import statement, a subsequent STORE_FAST instruction
	  //modifies the namespace.
	  var module = code_object.co_names[argument];
	  //document.write("<script language=\"text/javascript\" src=\""+ module +".js\"></scr"+"ipt>");
	  var codeObj = eval(module);
	  globals.add(codeObj.co_varnames, codeObj.co_locals);
	  execute(codeObj);
	  var class = new PyClass(module, [], codeObj);
	  var newObj = new PyObject(class);

	  for (var j=0; j<codeObj.co_locals.length; j++) {
	    if (typeof(codeObj.co_locals[j].getCodeObject) == typeof(function() {}))
	      continue;
	    if (/__\w+__/.test(codeObj.co_varnames[j]))
	      continue;
	    newObj.fieldNames.push(codeObj.co_varnames[j]);
	    newObj.fieldValues.push(codeObj.co_locals[j]);
	  }
	  stack.push(newObj);
          break;
      case 108: //IMPORT_FROM
          throw "IMPORT_FROM is not implemented yet!";
          break;
      case 110: //JUMP_FORWARD
          // current_offset + jump + bytecode + argument
          var targetOffset = offset + argument + 1 + 2;
          var j = pc + 1;
          while(prog[j][1] != targetOffset) {
            j = j + 1;
          }
          pc = j - 1;
          break;
      case 111: //JUMP_IF_FALSE
          //If TOS is false, increment the byte code counter by delta.
          //TOS is not changed.
          if(!stack.peekTop()) {
            // current_offset + jump + bytecode + argument
            var targetOffset = offset + argument + 1 + 2;
            if (argument > 0) {
              var j = pc;
              while(prog[j][1] != targetOffset) {
                j = j + 1;
              }
              pc = j - 1;
            } else {
              var j = pc;
              while(prog[j][1] != targetOffset) {
                j = j - 1;
              }
              pc = j - 1;
            }
          }
          break;
      case 112: //JUMP_IF_TRUE
          //If TOS is true, increment the byte code counter by delta.
          //TOS is left on the stack
          if(stack.peekTop()) {
            // current_offset + jump + bytecode + argument
            var targetOffset = offset + argument + 1 + 2;
            if (argument > 0) {
              var j = pc;
              while(prog[j][1] != targetOffset) {
                j = j + 1;
              }
              pc = j - 1;
            } else {
              var j = pc;
              while(prog[j][1] != targetOffset) {
                j = j - 1;
              }
              pc = j - 1;
            }
          }
          break;
      case 113: //JUMP_ABSOLUTE
          //Perhaps a bit naive
          var j = 1;
          while(prog[j][1] != argument) {
            j = j + 1;
          }
          pc = j - 1;
          break;
      case 116: //LOAD_GLOBAL
          // Loads the global named co_names[namei] onto the stack.
          var name = code_object.co_names[argument];
          if (name == "__name__") {
            stack.push(code_object.co_name);
          } else {
            stack.push(globals.lookup(name));
          }
          break;
      case 119: //CONTINUE_LOOP
          throw "CONTINUE_LOOP is not implemented yet!";
          break;
      case 120: //SETUP_LOOP
          // Pushes a block for a loop onto the block stack.
          // The block spans from the current instruction with
          // a size of delta bytes.
	  blockStack.push([offset,argument,"loop"]);
          break;
      case 121: //SETUP_EXCEPT
	  //Pushes a try block from a try-except clause onto the block
	  //stack. delta points to the first except block.
	  blockStack.push([offset,argument,"except"]);
          break;
      case 122: //SETUP_FINALLY
	  //Pushes a try block from a try-except clause onto the block
	  //stack. delta points to the finally block.
	  blockStack.push([offset,argument,"finally"]);
          break;
      case 124: //LOAD_FAST
          // Pushes a reference to the local co_varnames[var_num] onto the stack.
          stack.push(code_object.co_locals[argument]);
          break;
      case 125: //STORE_FAST
          // Stores TOS into the local co_varnames[var_num].
          code_object.co_locals[argument] = stack.pop();
          break;
      case 126: //DELETE_FAST
          delete code_object.co_locals[argument];
          delete code_object.co_varnames[argument];
          break;
      case 130: //RAISE_VARARGS
	  //Raises an exception. argc indicates the number of parameters
	  //to the raise statement, ranging from 0 to 3. The handler will
	  //find the traceback as TOS2, the parameter as TOS1, and the
	  //exception as TOS.
	  var parameters = [];
	  for (var j = argument-1; j >= 0; j--){
	    parameters[j] = stack.pop();
	  }
	  var exceptBlock = blockStack.pop();
	  
	  var targetOffset = exceptBlock[0] + exceptBlock[1] + 1 + 2;
	  var j = pc;
	  while(prog[j][1] != targetOffset) {
	    j = j + 1;
	  }
	  pc = j - 1;
          break;
      case 131: //CALL_FUNCTION
          var localVars = [];
          for (var j = argument; j > 0; j--){
            localVars[j] = stack.pop();
          }
	  printfDebug("blue", "Local vars: ["+localVars+"]");
	  if (typeof(stack.peekTop().__name__) == typeof("")) {
            var newObj = new PyObject(stack.pop());
            var classCodeObject = newObj.class.getCodeObject();
            var index = classCodeObject.co_varnames.indexOf("__init__");
            if (index > -1) {
              var initCodeObject = classCodeObject.co_locals[index].getCodeObject();
              localVars[0] = newObj;
              initCodeObject.co_locals = localVars;
              stack.newFrame();
              execute(initCodeObject);
            }
            for (var j=0; j<classCodeObject.co_locals.length; j++) {
              if (typeof(classCodeObject.co_locals[j].getCodeObject) == typeof(function() {}))
                continue;
              if (/__\w+__/.test(classCodeObject.co_varnames[j]))
                continue;
              newObj.fieldNames.push(classCodeObject.co_varnames[j]);
              newObj.fieldValues.push(classCodeObject.co_locals[j]);
            }
            stack.push(newObj);
          } else {
            stack.newFrame();
            var codeObject = stack.peekTop().getCodeObject();
            if (contains(codeObject.co_varnames, "self")) {
              //insert self reference
              localVars[0] = codeObject.co_locals[0];
            } else {
              //no self reference, move all parameters down 
              for (var j=0; j<localVars.length;) {
                localVars[j] = localVars[++j];
              }
              localVars.pop();
            }            
            //insert default parameters if necessary                        
            var totalArgc = codeObject.co_argcount;
            var actualArgc = argument;
            var defArgc = stack.peekTop().getArgc();
            var defArgs = stack.peekTop().getArgs();
            var overlap = (actualArgc + defArgc) - totalArgc;            
            var index = localVars.length;
            while (index < totalArgc) {
              localVars[index] = defArgs[index - actualArgc + overlap];
              index = localVars.length;
            }
            codeObject.co_locals = localVars;
            execute(codeObject);
          }
          break;
      case 132: //MAKE_FUNCTION
          //Pushes a new function object on the stack. TOS is the code
          //associated with the function. The function object is defined
          //to have argc default parameters, which are found below TOS. 
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

function PyClass(name, base, codeObj) {
  this.__name__ = name;
  this.__base__ = base;
  //this.__methods__ = ;
  this.codeObject = codeObj;

  this.getCodeObject = function() {
    return this.codeObject;
  }
}

function PyObject(clss) {
  this.class = clss;
  this.fieldNames = [];
  this.fieldValues = [];
}

function printObject(object) {
  var res = "Object print:<br/>";
  for (prop in object) {
    res += "&nbsp;&nbsp;&nbsp;"+ prop +": "+ object[prop] +"<br/>";
  }
  printfDebug("green",res);
}

var debug = false;
function printDebug(str) {
  if (debug) {
    printOut(str);
  }
}

function printfDebug(color, str) {
  printDebug("<tr><td colspan=\"7\" class=\""+color+"\">"+str+"</td></tr>");
}

function printInstruction(inst) {
  var res = "<tr>";
  if (inst.length == 3) {
    res += "<td class=\"offset\">"+inst[1]+"</td>"+
	   "<td class=\"inst\">"+inst[2]+"</td>"+
	   "<td></td>"+
	   "<td></td>"+
	   "<td class=\"code\">"+inst[0]+"</td>"+
	   "<td></td>";
  } else { //length == 6
    res += "<td class=\"offset\">"+inst[1]+"</td>"+
	   "<td class=\"inst\">"+inst[5]+"</td>"+
	   "<td class=\"value\">"+inst[4]+"</td>"+
	   "<td class=\"type\">"+inst[3]+"</td>"+
	   "<td class=\"code\">"+inst[0]+"</td>"+
	   "<td class=\"arg\">"+inst[2]+"</td>";
  }
  res += "<td class=\"stack\">"+stack.printLine()+"</td>";
  printDebug(res +"</tr>");
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

function printNewline() {
  switch(env) {
    case "browser":
      document.write("<br/>");
      break;
    case "v8":
      print("\n");
      break;
    case "JSUnit":
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