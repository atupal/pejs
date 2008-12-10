

var PEJS = function() {
  this.stack = new PEJS.prototype.Stack();
  this.blockStack = new PEJS.prototype.Stack();
  this.globals = new PEJS.prototype.Globals();
}

PEJS.prototype = {
  compareOps: ['<','<=','==','!=','>','>=','in','not in','is','is not','exception match','BAD'],

  interpret: function(progName, debugEnabled) {
    this.globals = new this.Globals();
    if (debugEnabled) { debug = true; }
    if (typeof(stdlib) != typeof(undefined)) {
      this.globals.add(stdlib.co_varnames, stdlib.co_locals);
      if (debug) { printfDebug("blue","Execution trace of PEJS Library"); }
      this.execute(stdlib);
    } else {
      throw "PEJS standard library not found";
    }
    this.stack = new this.Stack();
    this.blockStack = new this.Stack();
    var code_object = eval(progName);
    this.globals.add(code_object.co_varnames, code_object.co_locals);
    if (debug) { printfDebug("blue","Execution trace of "+progName); }
    this.execute(code_object);
  },

  execute: function(code_object) {
    if (debug) { printfDebug("blue","Execution trace of "+code_object.co_name); }
    var bytecode, offset, argument;
    var prog = code_object.co_code;
    var stack = this.stack;
    for (var pc=0; pc<prog.length;) {
      bytecode = prog[pc];
      if (bytecode >= 90) {
        argument = prog[pc+2];
        pc += 3;
      } else {
        pc++;
      }
    
      if (debug) { printInstruction(bytecode, argument, pc, stack); }
    
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
        case 15: //UNARY_INVERT
            stack.push(~stack.pop());
	    break;
        case 18: //LIST_APPEND
            throw "LIST_APPEND is not implemented yet!";
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
	    stack.push(stack.pop().store[temp]);
	    break;
        case 26: //BINARY_FLOOR_DIVIDE
            throw "BINARY_FLOOR_DIVIDE is not implemented yet!";
        case 27: //BINARY_TRUE_DIVIDE
            throw "BINARY_TRUE_DIVIDE is not implemented yet!";
        case 28: //INPLACE_FLOOR_DIVIDE
            throw "INPLACE_FLOOR_DIVIDE is not implemented yet!";
        case 29: //INPLACE_TRUE_DIVIDE
            throw "INPLACE_TRUE_DIVIDE is not implemented yet!";
        case 30: //SLICE+0
            stack.push(new this.types.PyList(stack.pop().store.slice(0)));
            break;
        case 31: //SLICE+1
            var start = stack.pop();
            stack.push(new this.types.PyList(stack.pop().store.slice(start)));
            break;
        case 32: //SLICE+2
            var end = stack.pop();
            stack.push(new this.types.PyList(stack.pop().store.slice(0,end)));
            break;
        case 33: //SLICE+3
            var end = stack.pop();
            var start = stack.pop();
            stack.push(new this.types.PyList(stack.pop().store.slice(start,end)));
            break;
        case 40: //STORE_SLICE+0
            var list = stack.pop().store;
            var args = [0,list.length].concat(stack.pop().store);
            Array.prototype.splice.apply(list,args);
            break;
        case 41: //STORE_SLICE+1
            var start = stack.pop();
            var list = stack.pop().store;
            var args = [start,list.length].concat(stack.pop().store);
            Array.prototype.splice.apply(list,args);
            break;
        case 42: //STORE_SLICE+2
            var end = stack.pop();
            var list = stack.pop().store;
            var args = [0,end].concat(stack.pop().store);
            Array.prototype.splice.apply(list,args);
            break;
        case 43: //STORE_SLICE+3
            var end = stack.pop();
            var start = stack.pop();
            var list = stack.pop().store;
            var args = [start,end-start].concat(stack.pop().store);
            Array.prototype.splice.apply(list,args);
            break;
        case 50: //DELETE_SLICE+0
            var list = stack.pop().store;
            list.splice(0,list.length);
            break;
        case 51: //DELETE_SLICE+1
            var start = stack.pop();
            var list = stack.pop().store;
            list.splice(start,list.length-start);
            break;
        case 52: //DELETE_SLICE+2
            var end = stack.pop();
            var list = stack.pop().store;
            list.splice(0,end);
            break;
        case 53: //DELETE_SLICE+3
            var end = stack.pop();
            var start = stack.pop();
            var list = stack.pop().store;
            list.splice(start,end-start);
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
        case 59: //INPLACE_MODULO
            var temp = stack.pop();
            stack.push(stack.pop() % temp);
            break;
        case 60: //STORE_SUBSCR
            var temp = stack.pop();
            stack.pop().store[temp] = stack.pop();
            break;
        case 61: //DELETE_SUBSCR
          //Implements del TOS1[TOS].
            var temp = stack.pop();
            delete stack.pop().store[temp];
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
            var iter = stack.pop();
            if (!(iter instanceof this.types.PyObject)) {
              iter = new this.types.PyIterator(iter);
            }
            stack.push(iter);
            break;
        case 70: //PRINT_EXPR
            throw "PRINT_EXPR is not implemented yet!";
        case 71: //PRINT_ITEM
            this.printOut(stack.pop());
            break;
        case 72: //PRINT_NEWLINE
            this.printNewline();
            break;
        case 73: //PRINT_ITEM_TO
            throw "PRINT_ITEM_TO is not implemented yet!";
        case 74: //PRINT_NEWLINE_TO
            throw "PRINT_NEWLINE_TO is not implemented yet!";
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
            pc = this.blockStack.pop();
            break;
        case 82: //LOAD_LOCALS
            //Pushes a reference to the locals of the
            //current scope on the stack.
            //This is used in the code for a class definition:
            // After the class body is evaluated,
            //the locals are passed to the class definition. 
            stack.push(code_object);
            break;
        case 83: //RETURN_VALUE
            stack.removeFrame(code_object.co_nlocals, code_object.co_locals);
            return true;
        case 84: //IMPORT_STAR
            throw "IMPORT_STAR is not implemented yet!";
        case 85: //EXEC_STMT
	  //Implements exec TOS2,TOS1,TOS. The compiler fills
	  //missing optional parameters with None.
            var varname = stack.pop();
            var lang = stack.pop();
            var stmt = stack.pop();
            if (lang == "JavaScript") {
              var value = eval(stmt);
              if (varname != "None") {
                var index = code_object.co_varnames.indexOf(varname);
                if (index > -1) {
                  if (index < code_object.co_nlocals) {
                    stack.write(index, value);
                  }
                  code_object.co_locals[index] = value;
                } else if(this.globals.contains(varname)) {
                  this.globals.store(varname, value);
                } else {
                    //new variable
                  var index = code_object.co_varnames.length;
                  code_object.co_varnames[index] = varname;
                  code_object.co_locals[index] = value;
                }
              }
            } else {
              throw "EXEC_STMT is not implemented for Python statements yet!";
            }
            break;
        case 86: //YIELD_VALUE
            throw "YIELD_VALUE is not implemented yet!";
        case 87: //POP_BLOCK
            this.blockStack.pop();
            break;
        case 88: //END_FINALLY
            //Terminates a finally clause. The interpreter recalls whether
            //the exception has to be re-raised, or whether the function
            //returns, and continues with the outer-next block. 
            this.blockStack.pop();
            break;
        case 89: //BUILD_CLASS
            //Creates a new class object. TOS is the methods dictionary,
            // TOS1 the tuple of the names of the base classes, and TOS2
            // the class name.
            var codeObj = stack.pop();
            var bases = stack.pop();
            var className = stack.pop();
            stack.push(new PEJS.prototype.types.PyClass(className, bases.store, codeObj));
            break;
        case 90: //STORE_NAME --------------- HAVE_ARGUMENT ---------------
            //Implements name = TOS. namei is the index of name in the attribute
            //co_names of the code object.
            //The compiler tries to use STORE_LOCAL or STORE_GLOBAL if possible
            var name = code_object.co_names[argument];
            var index = code_object.co_varnames.indexOf(name);
            if (index > -1) {
              var value = stack.pop();
              if (index < code_object.co_nlocals) {
                stack.write(index, value);
              }
              code_object.co_locals[index] = value;
            } else if (this.globals.contains(name)) {
              this.globals.store(name, stack.pop());
            } else {
	      //new variable
              var index = code_object.co_varnames.length;
              code_object.co_varnames[index] = name;
              code_object.co_locals[index] = stack.pop();
            }
            break;
        case 91: //DELETE_NAME
            var name = code_object.co_names[argument];
            var index = code_object.co_varnames.indexOf(name);
            if (index > -1) {
              if (index < code_object.co_nlocals) {
                stack.remove(index, value);
              }
              delete code_object.co_locals[index];
              delete code_object.co_varnames[index];
            } else if (this.globals.contains(name)) {
              this.globals.remove(name);
            } else { throw "Could not find name \""+name+"\" to delete"; }
            break;
        case 92: //UNPACK_SEQUENCE
            //Unpacks TOS into count individual values, which are put onto the
            //stack right-to-left. 
            var seq = stack.pop().store; //Assumes tuple
            for (var i = 0; i < seq.length; i++) {
              stack.push(seq[i]);
            }
            break;
        case 93: //FOR_ITER
            //TOS is an iterator. Call its next() method. If this yields a new
            //value, push it on the stack (leaving the iterator below it). If
            //the iterator indicates it is exhausted TOS is popped, and the
            //byte code counter is incremented by delta.
            var iterator = stack.peek();
            if (iterator instanceof this.types.PyObject) {
              var codeObject = iterator.class.codeObject;
              index = codeObject.co_varnames.indexOf("next");
              stack.push(codeObject.co_locals[index]);
              stack.newFrame(codeObject.co_nlocals+1,[iterator]);
              if (!this.execute(codeObject.co_locals[index].codeObject)) {
                stack.pop();
                stack.pop();
                pc += argument;
              }
            } else {
              try {
                stack.push(iterator.next(iterator)());
              } catch(e) {
                stack.pop();
                pc += argument;
              }
            }
            break;
        case 95: //STORE_ATTR
            //Implements TOS.name = TOS1, where namei is
            //the index of name in co_names.
            var object = stack.pop();
            var name = code_object.co_names[argument];
            if (object instanceof this.types.PyClass){
              var index = object.codeObject.co_varnames.indexOf(name);
              if (index > -1) {
		//Set value of existing field
                object.codeObject.co_locals[index] = stack.pop();
              } else {
		//Inject field
                var index = object.codeObject.co_varnames.length;
                object.codeObject.co_varnames[index] = name;
                object.codeObject.co_locals[index] = stack.pop();
              }
            } else {
              object.fields[name] = stack.pop();
            }
            break;
        case 96: //DELETE_ATTR
            throw "DELETE_ATTR is not implemented yet!";
        case 97: //STORE_GLOBAL
            this.globals.store(code_object.co_names[argument], stack.pop());
            break;
        case 98: //DELETE_GLOBAL
            var name = code_object.co_names[argument];
            delete code_object.co_names[argument];
            if (this.globals.contains(name)) {
              this.globals.remove(name);
            }
            break;
        case 99: //DUP_TOPX
            throw "DUP_TOPX is not implemented yet!";
        case 100: //LOAD_CONST
            var value = code_object.co_consts[argument];
            if (typeof(value) == typeof("") && value.match(/^CODEOBJ: \w+$/)) {
              value = eval(value.substring(9, value.length));
            } else if (value instanceof Array) {
              value = new this.types.PyTuple(value);
            }
            stack.push(value);
            break;
        case 101: //LOAD_NAME
            //Pushes the value associated with "co_names[namei]" onto the stack.
            //First we try to find the value in locals then in globals.
            var name = code_object.co_names[argument];
            var index = code_object.co_varnames.indexOf(name);
            if (index > -1) {
              if (index < code_object.nlocals) {
                stack.push(stack.read(index));
              } else {
                stack.push(code_object.co_locals[index]);
              }
            } else if (this.globals.contains(name)) {
              stack.push(this.globals.lookup(name));
            } else if (name == "__name__") {
              stack.push(stack.peek().codeObject.co_name);
            } else {
              throw "LOAD_NAME attempted to load non-existing name \""+name+"\"";
            }
            break;
        case 102: //BUILD_TUPLE
            // Creates a tuple consuming count items from the stack,
            // and pushes the resulting tuple onto the stack.
            var tuple = [];
            for(var j=argument-1; j>=0; j--) {
              tuple[j] = stack.pop();
            }
            stack.push(new this.types.PyTuple(tuple));
            break;
        case 103: //BUILD_LIST
            //Works as BUILD_TUPLE, but creates a list.
            var list = [];
            for(var j=argument-1; j>=0; j--) {
              list[j] = stack.pop();
            }
            stack.push(new this.types.PyList(list));
            break;
        case 104: //BUILD_MAP
            //Pushes a new empty dictionary object onto the stack.
            //The argument is ignored and set to zero by the compiler.
            stack.push(new this.types.PyDict());
            break;
        case 105: //LOAD_ATTR
            //Replaces TOS with getattr(TOS, co_names[namei])
            var object = stack.pop();
            var name = code_object.co_names[argument];
            if (object instanceof this.types.PyList || 
                object instanceof this.types.PyDict || 
                object instanceof this.types.PyIterator) {
              stack.push(object[name](object));
            } else if (object instanceof this.types.PyObject) {
              if (object.fields[name] != undefined) {
                stack.push(object.fields[name]);
              } else {
                function lookup(class,name) {
                  index = class.codeObject.co_varnames.indexOf(name);
                  if (index > -1)
                  return class.codeObject.co_locals[index];
                  var result;
                  for (var i=0;i<class.__bases__.length;i++) {
                    var result = lookup(class.__bases__[i],name);
                    if (result) { return result; }
                  }
                }
                var attrObject = lookup(object.class,name);
                if (attrObject instanceof PEJS.prototype.types.PyFunction) {
                  attrObject.codeObject.co_varnames[0] = "self";
                  attrObject.codeObject.co_locals[0] = object;
                } else {
                  throw "LOAD_ATTR tried to load non-function "+ name +
                      " from class "+ object.class.__name__;
                }
                stack.push(attrObject);
              }
            } else if(object instanceof this.types.PyClass) {
              index = object.codeObject.co_varnames.indexOf(name);
              stack.push(object.codeObject.co_locals[index]);
            } else {
              throw "LOAD_ATTR tried to load "+ name +
                  " from "+ typeof(object) +" "+ object;
            }
            break;
        case 106: //COMPARE_OP
            var temp1 = stack.pop();
            var temp2 = stack.pop();          
            if(typeof(temp1) == typeof("") || typeof(temp2) == typeof("")) {
              temp1 = "\"" + temp1 + "\"";
              temp2 = "\"" + temp2 + "\"";
            }
            stack.push(eval(temp2 + this.compareOps[argument] + temp1));
            break;
        case 107: //IMPORT_NAME
            //Imports the module co_names[namei]. The module object is pushed
            //onto the stack. The current namespace is not affected: for a
            //proper import statement, a subsequent STORE_FAST instruction
            //modifies the namespace.
            var module = code_object.co_names[argument];
            var codeObj = eval(module);
            this.globals.add(codeObj.co_varnames, codeObj.co_locals);
            this.execute(codeObj);
            var class = new this.types.PyClass(module, [], codeObj);
            var object = new this.types.PyObject(class);
    
            for (var j=0; j<codeObj.co_locals.length; j++) {
              if (/__\w+__/.test(codeObj.co_varnames[j])) { continue; }
              if (codeObj.co_locals[j] instanceof PEJS.prototype.types.PyFunction) { continue; }
              object.fields[codeObj.co_varnames[j]] = codeObj.co_locals[j];
            }
            stack.pop(); //Remove return value from the executed codeObject
            stack.push(object);
            break;
        case 108: //IMPORT_FROM
            //Loads the attribute co_names[namei] from the module found in TOS. 
            //The resulting object is pushed onto the stack, to be subsequently 
            //stored by a STORE_FAST instruction.
            var codeObject = stack.pop().class.codeObject; 
            var attrname = code_object.co_names[argument];           
            var attr = codeObject.co_locals[codeObject.co_varnames.indexOf(attrname)];
            stack.push(attr);
            break;
        case 110: //JUMP_FORWARD
            pc += argument;
            break;
        case 111: //JUMP_IF_FALSE
            //If TOS is false, increment the byte code counter by delta.
            //TOS is not changed.
            if(!stack.peek()) {
              pc += argument;
            }
            break;
        case 112: //JUMP_IF_TRUE
            //If TOS is true, increment the byte code counter by delta.
            //TOS is left on the stack
            if(stack.peek()) {
              pc += argument;
            }
            break;
        case 113: //JUMP_ABSOLUTE
            pc = argument;
            break;
        case 116: //LOAD_GLOBAL
            // Loads the global named co_names[namei] onto the stack.
            var name = code_object.co_names[argument];
            if (name == "__name__") {
              stack.push(code_object.co_name);
            } else {
              stack.push(this.globals.lookup(name));
            }
            break;
        case 119: //CONTINUE_LOOP
            throw "CONTINUE_LOOP is not implemented yet!";
        case 120: //SETUP_LOOP
            //Pushes a block for a loop onto the block stack.
            //The block spans from the current instruction with
            //a size of delta bytes.
            this.blockStack.push(pc+argument);
            break;
        case 121: //SETUP_EXCEPT
	    //Pushes a try block from a try-except clause onto the block
	    //stack. delta points to the first except block.
            this.blockStack.push(pc+argument);
            break;
        case 122: //SETUP_FINALLY
	    //Pushes a try block from a try-except clause onto the block
	    //stack. delta points to the finally block.
            this.blockStack.push(pc+argument);
            break;
        case 124: //LOAD_FAST
            //Pushes a reference to the local co_varnames[var_num] onto the stack.
            stack.push(stack.read(argument));
            break;
        case 125: //STORE_FAST
            //Stores TOS into the local co_varnames[var_num].
            var value = stack.pop();
            stack.write(argument, value);
            code_object.co_locals[argument] = value;
            break;
        case 126: //DELETE_FAST
            stack.write(argument, undefined);
            delete code_object.co_locals[argument];
            delete code_object.co_varnames[argument];
            break;
        case 130: //RAISE_VARARGS
	    //Raises an exception. argc indicates the number of parameters
	    //to the raise statement, ranging from 0 to 3. The handler will
	    //find the traceback as TOS2, the parameter as TOS1, and the
	    //exception as TOS.
            var parameters = [];
            for (var j=0; j<argument; j++){
              parameters[j] = stack.pop();
            }

            if (parameters[0] instanceof this.types.PyObject) {
              if (parameters[0].class.__name__ == "StopIteration") {
                stack.removeFrame(code_object.co_nlocals, code_object.co_locals);
                return false;
              }
            }
            pc = this.blockStack.pop();
            break;
        case 131: //CALL_FUNCTION
	    this.callFunction(argument, stack, [], []);
            break;
        case 132: //MAKE_FUNCTION
            //Pushes a new function object on the stack. TOS is the code
            //associated with the function. The function object is defined
            //to have argc default parameters, which are found below TOS. 
            var pyFunction = new PEJS.prototype.types.PyFunction(argument, stack.pop());
            for (var j = argument-1; j >= 0; j--){
              pyFunction.addArg(j, stack.pop());
            }
            stack.push(pyFunction);
            break;
        case 133: //BUILD_SLICE
            throw "BUILD_SLICE is not implemented yet!";
        case 134: //MAKE_CLOSURE
            throw "MAKE_CLOSURE is not implemented yet!";
        case 135: //LOAD_CLOSURE
            throw "LOAD_CLOSURE is not implemented yet!";
        case 136: //LOAD_DEREF
            throw "LOAD_DEREF is not implemented yet!";
        case 137: //STORE_DEREF
            throw "STORE_DEREF is not implemented yet!";
        case 140: //CALL_FUNCTION_VAR
	    this.callFunction(argument, stack, stack.pop().store, []);
            break;
        case 141: //CALL_FUNTION_KW
	    this.callFunction(argument, stack, [], stack.pop().store);
            break;
        case 142: //CALL_FUNCTION_VAR_KW
	    var kwArgs = stack.pop().store;
	    this.callFunction(argument, stack, stack.pop().store, kwArgs);
            break;
        case 143: //EXTENDED_ARG
            throw "EXTENDED_ARG is not implemented yet!";
        default:
            throw "Unexpected bytecode:" + bytecode;
      }
    }
  },
  
  callFunction: function(argc, stack, varArgs, kwArgs) {
    var kwargc = argc >> 8;
    argc &= 255;
    var kwParams = {};
    for (name in kwArgs) {
      kwParams[name] = kwArgs[name];
    }
    var posParams = [];
    for (i in varArgs) {
      posParams[i] = varArgs[i];
    }
    for (var j = kwargc-1; j >= 0; j--) {
      var i = stack.pop();
      kwParams[stack.pop()] = i;
    }
    for (var j=0; j<argc; j++) {
      posParams.unshift(stack.pop());
    }
    if (stack.peek() instanceof this.types.PyFunction) {
      this.callPyFunction(argc, posParams, kwParams, stack, stack.peek());
    } else if (stack.peek() instanceof this.types.PyClass) {
      this.callPyClass(argc, posParams, kwParams, stack);
    } else if (stack.peek() instanceof Function) {
      stack.push(stack.pop()(posParams));
    } else {
      throw "CALL_FUNCTION tried to execute non-executable: "+stack.pop();
    }
  },

  callPyFunction: function(argc, posParams, kwParams, stack, pyFunction) {
    var codeObject = pyFunction.codeObject;
    if (codeObject.co_varnames[0] === "self") {
      //insert self reference
      posParams.unshift(codeObject.co_locals[0]);
    }
    if (argc < codeObject.co_argcount) {
      //insert default parameters if necessary
      var totalArgc = codeObject.co_argcount;
      var defArgc = pyFunction.defArgc;
      var defArgs = pyFunction.defArgs;
      var overlap = (argc + defArgc) - totalArgc;            
      var index = posParams.length;
      while (index < totalArgc) {
        posParams[index] = defArgs[index - argc + overlap];
        index = posParams.length;
      }
    } else if (argc > codeObject.co_argcount) {
      var list = [];
      for (var i=codeObject.co_argcount;i<posParams.length;i++) {
        list.push(posParams[i]);
      }
      if (list.length > 0) {
        codeObject.co_locals[codeObject.co_argcount] = new this.types.PyTuple(list);
      }
    }
    for (var name in kwParams) {
      var index = codeObject.co_varnames.indexOf(name);
      if (index > -1) {
	posParams[index] = kwParams[name];
	delete kwParams[name];
      }
    }
    var kwDict = new this.types.PyDict();
    kwDict.store = kwParams;
    if (codeObject.co_locals[codeObject.co_argcount] instanceof this.types.PyTuple) {
      codeObject.co_locals[codeObject.co_argcount+1] = kwDict;
    } else {
      codeObject.co_locals[codeObject.co_argcount] = kwDict;
    }
    //codeObject.co_locals = posParams;
    for (var i=0; i<codeObject.co_argcount; i++) {
      codeObject.co_locals[i] = posParams[i];
    }
    stack.newFrame(codeObject.co_nlocals, codeObject.co_locals);
    this.execute(codeObject);
  },
  
  callPyClass: function(actualArgc, posParams, kwParams, stack) {
    //Creation of new object
    var object = new this.types.PyObject(stack.peek());
    //Find all fields that belong to this object
    function injectFields(object, class) {
      for (var i=class.__bases__.length-1; i>=0; i--) {
        injectFields(object, class.__bases__[i]);
      }
      var codeObj = class.codeObject;
      for (var j=0; j<codeObj.co_locals.length; j++) {
        if (codeObj.co_locals[j] instanceof PEJS.prototype.types.PyFunction) { continue; }
        if (/__\w+__/.test(codeObj.co_varnames[j])) { continue; }
        object.fields[codeObj.co_varnames[j]] = codeObj.co_locals[j];
      }
    }
    injectFields(object, object.class);
    //Execute the __init__ method if it exists
    var codeObject = object.class.codeObject;
    var index = codeObject.co_varnames.indexOf("__init__");
    if (index > -1) {
      codeObject.co_locals[index].codeObject.co_locals[0] = object;
      this.callPyFunction(actualArgc, posParams, kwParams, stack, codeObject.co_locals[index]);
    }
    stack.pop();
    stack.push(object);
  },
  
  printOut: function(str) {
    switch(this.getEnvironment()) {
      case "browser":
          document.write(str);
      break;
      case "standalone":
          if (str == "42") {
            success++;
          }
          break;
    }
  },

  printNewline: function() {
    switch(this.getEnvironment()) {
      case "browser":
          document.write("<br/>");
      break;
      case "standalone":
          //No need to print a newline
          break;
    }
  },
  
  getEnvironment: function() {
    if(typeof(alert) == typeof(undefined)) {
      return "standalone";
    } else {
      return "browser";
    }
  }
}

PEJS.prototype.Stack = function() {
  var array = [];
  var sp = -1;
  var bp = -1;

  this.pop = function() { return array[sp--]; };

  this.newFrame = function(argcount, localVars) {
    this.push(bp);
    bp = sp;
    this.rotate2();
    for (var i=0;i<argcount;i++) {
      this.push(localVars[i]);
    }
  };

  this.removeFrame = function(argcount, co_locals) {
    var returnVal = array[sp];
    for (var i=1; i<=argcount; i++) {
      co_locals[i] = array[bp+i];
    }
    sp = bp-1;
    bp = array[sp];
    if (sp < 1) {
      sp = 0;
      bp = -1; 
    }
    array[sp] = returnVal;
  };

  this.push = function(val) { array[++sp] = val; };
  this.peek = function(val) { return array[sp]; };
  this.read = function(varNum) { return array[bp + 1 + varNum]; };
  this.write = function(varNum, value) { array[bp + 1 + varNum] = value; };

  this.rotate2 = function() {
    var temp = array[sp];
    array[sp] = array[sp-1];
    array[sp-1] = temp;
  };

  this.rotate3 = function() {
    var temp = array[sp];
    array[sp] = array[sp-1];
    array[sp-1] = array[sp-2];
    array[sp-2] = temp;
  };

  this.rotate4 = function() {
    var temp = array[sp];
    array[sp] = array[sp-1];
    array[sp-1] = array[sp-2];
    array[sp-2] = array[sp-3];
    array[sp-3] = temp;
  };

  this.duplicateTop = function() { this.push(array[sp]); };

  this.toString = function() {
    var res = "";
    for (var i = 0; i <= sp; i++) {
      res += array[i];
      if (i == bp) { res += " (bp)"; }
      if (i == sp) { res += " (sp)"; }
      res += ", ";
    }
    return res;
  };
}

PEJS.prototype.Globals = function() {
  this.values = [[]]; //Initialized with a special array for new globals
  this.names = [[]];

  this.add = function(nameArray, valueArray) {
    this.names[this.names.length] = nameArray;
    this.values[this.values.length] = valueArray;
  };

  this.store = function(name, value) {
    var index;
    for(var i=0; i<this.names.length; i++) {
      index = this.names[i].indexOf(name);
      if (index > -1) {
        this.values[i][index] = value;
        return;
      }
    }
    //new global variable - added to a special array
    index = this.names[0].length;
    this.names[0][index] = name;
    this.values[0][index] = value;
  };

  this.lookup = function(name) {
    for(var i=0; i<this.names.length; i++) {
      var index = this.names[i].indexOf(name);
      if (index > -1) { return this.values[i][index]; }
    }
    throw "Global lookup of \""+name+"\" failed.";
  };

  this.contains = function(name) {
    for(var i=0; i<this.names.length; i++) {
      var index = this.names[i].indexOf(name);
      if (index > -1) { return true; }
    }
    return false;
  };

  this.remove = function(name) {
    for(var i=0; i<this.names.length; i++) {
      var index = this.names[i].indexOf(name);
      if (index > -1) {
        delete this.names[i][index];
        delete this.values[i][index];
        return;
      }
    }
    throw "Global delete of \""+name+"\" failed.";
  };

  this.toString = function() {
    var res = "Globals: <br/>";
    for(var i=0; i<this.names.length; i++) {
      for(var j=0; j<this.names[i].length; j++) {
        res += " ["+i+"]["+j+"] "+ 
            this.names[i][j] +": "+ this.values[i][j] +"<br/>";
      }
    }
    return res;
  };
}


PEJS.prototype.types = {
  PyCodeObject: function() {
    this.toString = function() { return "CodeObject:"+this.co_name; };
  },

  PyClass: function(name, bases, codeObj) {
    this.__name__ = name;
    this.__bases__ = bases;
    //this.__methods__ = ;
    this.codeObject = codeObj;
    this.toString = function() { return "PyClass:"+this.__name__; };
  },
  
  PyObject: function(clss) {
    this.class = clss;
    this.fields = new Object();
    this.toString = function() { return "PyObject:"+this.class.__name__; };
  },

  PyFunction: function(defaultArgc, codeObj) {
    this.defArgc = defaultArgc;
    this.codeObject = codeObj;
    this.defArgs = [];
    this.addArg = function(index, val) { this.defArgs[index] = val; };
    this.toString = function() { return "PyFunction:"+this.codeObject.co_name; };
  },
  
  PyIterator: function(iterable) {
    this.store = iterable;
    if (iterable instanceof PEJS.prototype.types.PyList || iterable instanceof PEJS.prototype.types.PyTuple) {
      this.index = 0;
      this.next = function(it) { return function(vars) {
        //if (it.index == undefined) { it.index = 0; }
        if (it.store.store.length > it.index) {
          return it.store.store[it.index++];
        } else {
          throw "Iterator empty";
        }
      }; };
    } else if (iterable instanceof PEJS.prototype.types.PyDict) {
      throw "Iterator not implemented for dictionaries.";
    } else if (iterable instanceof PEJS.prototype.types.PyObject) {
      this.next = function(it) {
        var index = it.class.codeObject.co_varnames.indexOf("next");
        if (index > -1) { return it.class.codeObject.co_locals[index]; }
        throw "Object is not iterable.";
      }
    } else {
      throw "Object not iterable";
    }
    this.toString = function() { return "Iterator("+this.store+")"; };
  },
  
  PyDict: function() {
    this.store = new Object();
    this.toString = function() {
      var result = "[";
      for (i in this.store) { result += i +":"+ this.store[i] +","; }
      return result.replace(/,$/,"") +"]";
    };
    //remove all items from a
    this.clear = function(dict) {
      return function(vars) {
        for (i in dict.store) { delete dict.store[i]; } }; };
    //a (shallow) copy of a
    this.copy = function(dict) {
      return function(vars) {
        var result = new PEJS.prototype.types.PyDict();
        for (i in dict.store) { result.store[i] = dict.store[i]; }
        return result;
      }; };
    //Equivalent to k in a, use that form in new code
    this.has_key = function(dict) {
      return function(vars) {
        return (dict.store[vars[0]] ? true : false); }; };
    //a copy of a's list of (key, value) pairs
    this.items = function(dict) {
      return function(vars) { 
        var result = [];
        for (i in dict.store) { result.push(new PEJS.prototype.types.PyTuple([i, dict.store[i]])); }
        return new PEJS.prototype.types.PyList(result);
      }; };
    //a copy of a's list of keys
    this.keys = function(dict) {
      return function(vars) { 
        var result = [];
        for (i in dict.store) { result.push(i); }
        return new PEJS.prototype.types.PyList(result);
      }; };
    //updates a with key/value pairs from b, overwriting existing keys,
    //returns None
    this.update = function(dict) {
      return function(vars) { 
        for (i in vars[0].store) { dict.store[i] = vars[0].store[i]; }
        return "None";
      }; };
    //Creates a new dictionary with keys from seq and values set to value
    this.fromkeys = function(dict) {
      return function(vars) { throw "fromkeys not implemented yet" }; };
    //a copy of a's list of values
    this.values = function(dict) {
      return function(vars) { 
        var result = [];
        for (i in dict.store) { result.push(dict.store[i]); }
        return new PEJS.prototype.types.PyList(result);
      }; };
    //a[k] if k in a, else x
    this.get = function(dict) {
      return function(vars) { 
        if (dict.store[vars[0]]) { return dict.store[vars[0]]; }
        else { return vars[1]; }
      }; };
    //a[k] if k in a, else x (also setting it)
    this.setdefault = function(dict) {
      return function(vars) { 
        if (dict.store[vars[0]]) { return dict.store[vars[0]]; }
        else { dict.store[vars[0]] = vars[1]; return vars[1]; }
      }; };
    //a[k] if k in a, else x (and remove k)
    this.pop = function(dict) {
      return function(vars) { 
        if (dict.store[vars[0]]) {
          var result = dict.store[vars[0]];
          delete dict.store[vars[0]]; return result;
        } else { return vars[1]; }
      }; };
    //remove and return an arbitrary (key, value) pair
    this.popitem = function(dict) {
      return function(vars) {
        for (i in dict.store) { return [i, dict.store[i]]; } }; };
    //return an iterator over (key, value) pairs
    this.iteritems = function(dict) {
      return function(vars) { throw "iteritems is not implemented yet."; }; };
    //return an iterator over the mapping's keys
    this.iterkeys = function(dict) {
      return function(vars) { throw "iterkeys is not implemented yet."; }; };
    //return an iterator over the mapping's values
    this.itervalues = function(dict) {
      return function(vars) { throw "itervalues is not implemented yet."; }; };
  },

  PyTuple: function(elements) {
    this.store = elements;
    this.toString = function() { return "("+this.store+")"; };
  },

  PyList: function(elements) {
    this.store = elements;
    this.toString = function() { return "["+this.store+"]"; };
    this.__iter__ = function(list) {
      return function(vars) { return new PEJS.prototype.types.PyIterator(list); }; };
    this.__len__ = function(list) {
      return function(vars) { return list.store.length; }; };
    //Add an item to the end of the list; equivalent to a[len(a):] = [x]. 
    this.append = function(list) {
      return function(vars) { list.store.push(vars[0]); }; };
    //Extend the list by appending all the items in the given list;
    //equivalent to a[len(a):] = L. 
    this.extend = function(list) {
      return function(vars) { list.store.concat(vars[0]); }; };
    //Insert an item at a given position. The first argument is the
    //index of the element before which to insert, so a.insert(0, x)
    //inserts at the front of the list, and a.insert(len(a), x) is
    //equivalent to a.append(x). 
    this.insert = function(list) {
      return function(vars) { list.store.splice(vars[0],0,vars[1]); }; };
    //Remove the first item from the list whose value is x. It is an
    //error if there is no such item. 
    this.remove = function(list) {
      return function(vars) { 
        var i = list.store.indexOf(vars[0]);
        if (i > -1) { list.store.splice(i, 1); }
          else { throw "PEJS Error: "+vars[0]+" does not exist in list"; }
        }; };
    //Remove the item at the given position in the list, and return it.
    //If no index is specified, a.pop() removes and returns the last
    //item in the list.
    this.pop = function(list) {
      return function(vars) {
        if (vars[0]) {
          var result = list.store[vars[0]];
          list.store.splice(vars[0],1);
        } else { return list.store.pop(); }
      }; };
    //Return the index in the list of the first item whose value is x.
    //It is an error if there is no such item. 
    this.index = function(list) {
      return function(vars) { return list.store[vars[0]]; }; };
    //Return the number of times x appears in the list. 
    this.count = function(list) {
      return function(vars) { 
        var result = 0;
        for (i in list.store) { result += list.store[i] === vars[0] ? 1 : 0; }
        return result;
      }; };
    //Sort the items of the list, in place. 
    this.sort = function(list) {
      return function(vars) { list.store.sort() }; };
    //Reverse the elements of the list, in place. 
    this.reverse = function(list) {
      return function(vars) { list.store.reverse(); }; };
  }
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
    PEJS.prototype.printOut(str);
  }
}

function printfDebug(color, str) {
  printDebug("<tr><td colspan=\"7\" class=\""+color+"\">"+str+"</td></tr>");
}

var bytecodes = {
    0: "STOP_CODE",
    1: "POP_TOP",
    2: "ROT_TWO",
    3: "ROT_THREE",
    4: "DUP_TOP",
    5: "ROT_FOUR",
    9: "NOP",
    10: "UNARY_POSITIVE",
    11: "UNARY_NEGATIVE",
    12: "UNARY_NOT",
    13: "UNARY_CONVERT",
    15: "UNARY_INVERT",
    18: "LIST_APPEND",
    19: "BINARY_POWER",
    20: "BINARY_MULTIPLY",
    21: "BINARY_DIVIDE",
    22: "BINARY_MODULO",
    23: "BINARY_ADD",
    24: "BINARY_SUBTRACT",
    25: "BINARY_SUBSCR",
    26: "BINARY_FLOOR_DIVIDE",
    27: "BINARY_TRUE_DIVIDE",
    28: "INPLACE_FLOOR_DIVIDE",
    29: "INPLACE_TRUE_DIVIDE",
    30: "SLICE+0",
    31: "SLICE+1",
    32: "SLICE+2",
    33: "SLICE+3",
    40: "STORE_SLICE+0",
    41: "STORE_SLICE+1",
    42: "STORE_SLICE+2",
    43: "STORE_SLICE+3",
    50: "DELETE_SLICE+0",
    51: "DELETE_SLICE+1",
    52: "DELETE_SLICE+2",
    53: "DELETE_SLICE+3",
    55: "INPLACE_ADD",
    56: "INPLACE_SUBTRACT",
    57: "INPLACE_MULTIPLY",
    58: "INPLACE_DIVIDE",
    59: "INPLACE_MODULO",
    60: "STORE_SUBSCR",
    61: "DELETE_SUBSCR",
    62: "BINARY_LSHIFT",
    63: "BINARY_RSHIFT",
    64: "BINARY_AND",
    65: "BINARY_XOR",
    66: "BINARY_OR",
    67: "INPLACE_POWER",
    68: "GET_ITER",
    70: "PRINT_EXPR",
    71: "PRINT_ITEM",
    72: "PRINT_NEWLINE",
    73: "PRINT_ITEM_TO",
    74: "PRINT_NEWLINE_TO",
    75: "INPLACE_LSHIFT",
    76: "INPLACE_RSHIFT",
    77: "INPLACE_AND",
    78: "INPLACE_XOR",
    79: "INPLACE_OR",
    80: "BREAK_LOOP",
    82: "LOAD_LOCALS",
    83: "RETURN_VALUE",
    84: "IMPORT_STAR",
    85: "EXEC_STMT",
    86: "YIELD_VALUE",
    87: "POP_BLOCK",
    88: "END_FINALLY",
    89: "BUILD_CLASS",
    90: "STORE_NAME",
    91: "DELETE_NAME",
    92: "UNPACK_SEQUENCE",
    93: "FOR_ITER",
    95: "STORE_ATTR",
    96: "DELETE_ATTR",
    97: "STORE_GLOBAL",
    98: "DELETE_GLOBAL",
    99: "DUP_TOPX",
    100: "LOAD_CONST",
    101: "LOAD_NAME",
    102: "BUILD_TUPLE",
    103: "BUILD_LIST",
    104: "BUILD_MAP",
    105: "LOAD_ATTR",
    106: "COMPARE_OP",
    107: "IMPORT_NAME",
    108: "IMPORT_FROM",
    110: "JUMP_FORWARD",
    111: "JUMP_IF_FALSE",
    112: "JUMP_IF_TRUE",
    113: "JUMP_ABSOLUTE",
    116: "LOAD_GLOBAL",
    119: "CONTINUE_LOOP",
    120: "SETUP_LOOP",
    121: "SETUP_EXCEPT",
    122: "SETUP_FINALLY",
    124: "LOAD_FAST",
    125: "STORE_FAST",
    126: "DELETE_FAST",
    130: "RAISE_VARARGS",
    131: "CALL_FUNCTION",
    132: "MAKE_FUNCTION",
    133: "BUILD_SLICE",
    134: "MAKE_CLOSURE",
    135: "LOAD_CLOSURE",
    136: "LOAD_DEREF",
    137: "STORE_DEREF",
    140: "CALL_FUNCTION_VAR",
    141: "CALL_FUNTION_KW",
    142: "CALL_FUNCTION_VAR_KW",
    143: "EXTENDED_ARG"
}


function printPairs(names, values, title) {
  res = title +":<br/>";
  for (var i=0;i<names.length;i++) {
    res += "&nbsp;&nbsp;"+ names[i] +
	   ": "+values[i] +"<br/>";
  }
  printfDebug("green",res);
}

function printInstruction(inst, arg, pc, stack) {
  var res = "<tr>";
  if (inst < 90) {
    res += "<td class=\"offset\">"+pc+"</td>"+
        "<td class=\"inst\">"+bytecodes[inst]+"</td>"+
	   "<td></td>"+
	   "<td></td>"+
	   "<td class=\"code\">"+inst+"</td>"+
	   "<td></td>";
  } else {
    res += "<td class=\"offset\">"+pc+"</td>"+
	   "<td class=\"inst\">"+bytecodes[inst]+"</td>"+
	   "<td class=\"value\"></td>"+
	   "<td class=\"type\"></td>"+
	   "<td class=\"code\">"+inst+"</td>"+
	   "<td class=\"arg\">"+arg+"</td>";
  }
  res += "<td class=\"stack\">"+stack+"</td>";
  printDebug(res +"</tr>");
}


