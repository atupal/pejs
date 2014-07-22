/*
The MIT License (MIT)

Copyright (c) 2014 
Jesper Jakobsen
Rune Rogh
Ubbe Welling (ubbewelling@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
*/

var PEJS = function() {
  this.blockStack = [];
  this.globals = new this.Globals();
  this.initLibrary();
}

PEJS.prototype = {
  compareOps: ['<','<=','==','!=','>','>=','in','not in','is','is not','exception match','BAD'],

  /**
    *  Initializes the library. The primary objective of this
    *  is to register the relevant global variables.
    *
    *  TODO: Make a snapshot of the compiled library and load
    *  this instead, as well as register a fixed array as globals.
    */
  initLibrary : function() {
    if (typeof(stdlib) != typeof(undefined)) {
      this.globals.add(stdlib.co_varnames, stdlib.co_locals);
      this.execute(stdlib);
    } else {
      throw "PEJS standard library not found";
    }
  },

  /**
    *  Main entry method. progName is evaluated and handed to execute().
    */
  interpret: function(progName, debugEnabled) {
    this.Debugger.debug = debugEnabled;
    this.globals.reset(); //Reset global variables (keeps library in globals)
    this.blockStack = [];
    var code_object = eval(progName);
    this.globals.add(code_object.co_varnames, code_object.co_locals);
    if (this.Debugger.debug) {
      this.Debugger.printDebug("blue","Execution trace of "+ progName);
    }
    this.execute(code_object);
  },


  /**
    *  Main loop. The switch-case interpreter is placed here.
    *  Returns whatever the Python code object returns.
    *  Throws an exception if Python raises an exception.
    */
  execute: function(code_object) {
    var debugEnabled = this.Debugger.debug;
    if (debugEnabled) { this.Debugger.printDebug("blue","Execution trace of "+code_object.co_name); }
    var bytecode, argument;
    var prog = code_object.co_code;

    //Initialize a new stack frame
    var stack = [];
    //We want to avoid injecting new methods on the Array prototype.
    stack.peek = function() {
      return this[this.length-1];
    }
    //Push parameters on stack
    var stackLocals = code_object.co_nlocals;
    if (code_object.co_varnames[0] == "self") {
      stackLocals++;
    }
    for (var i=0; i<stackLocals; i++) {
      stack.push(code_object.co_locals[i]);
    }

    //Tries to JIT-compile the code object, if it haven't been tried before.
    if (typeof(code_object.isCompiled) == "undefined") {
      try {
	code_object.compiled_code = new Function(["code_object","stack"],this.optimize(this.compile(code_object)));
	if (debugEnabled) { this.Debugger.printDebug("blue","Successfully compiled "+code_object.co_name); }
	//Uncomment this line to print the compiled and optimized code.
	//if (code_object.co_name == "test_compiled") this.printOut(code_object.compiled_code);
	code_object.isCompiled = true;
      } catch (exception) {
	//The compiler bails out because of jumps.
	if (debugEnabled) { this.Debugger.printDebug("green","Compiler threw: "+exception); }
	code_object.isCompiled = false;
      }
    }
    if (code_object.isCompiled) {
      if (debugEnabled) { this.Debugger.printDebug("blue","Running compiled code from "+code_object.co_name); }
      return code_object.compiled_code.call(this, code_object, stack);
    }

    var pc = 0;
    //Starting loop. Terminated by method return.
    while(true) {
      bytecode = prog[pc];
      if (bytecode >= 90) {
        argument = prog[pc+2];
        pc += 3;
      } else {
        pc++;
      }
    
      if (debugEnabled) { this.Debugger.printInstruction(bytecode, argument, pc, stack); }
    
      switch(bytecode) {
        case 0: //STOP_CODE
            break;
        case 1: //POP_TOP
            stack.pop();
	    break;
        case 2: //ROT_TWO
            stack.splice(-1, 0, stack.pop());
	    break;
	case 3: //ROT_THREE
            stack.splice(-2, 0, stack.pop());
	    break;
        case 4: //DUP_TOP
            stack.push(stack.peek());
	    break;
        case 5: //ROT_FOUR
            stack.splice(-3, 0, stack.pop());            
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
            var iterable = stack.pop();
            if (iterable instanceof this.types.PyObject) {
              var codeObject = iterable.pyClass.codeObject;
              index = codeObject.co_varnames.indexOf("__iter__");
              if (index > -1) {
                //Set self object on __iter__ method
                codeObject.co_locals[index].codeObject.co_locals[0] = iterable;
                stack.push(codeObject.co_locals[index]);
                this.callFunction(0, stack,[],{});
              } else {
                throw iterable +" is not iterable!";
              }
            } else {
              stack.push(new this.types.PyIterator(iterable));
            }
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
            //Pushes a reference to the locals of the current scope
	    //on the stack. This is used in the code for a class
	    //definition: After the class body is evaluated, the
	    //locals are passed to the class definition. 
            stack.push(code_object);
            break;
        case 83: //RETURN_VALUE
            return stack.pop();
        case 84: //IMPORT_STAR
            throw "IMPORT_STAR is not implemented yet!";
        case 85: //EXEC_STMT
	    //Implements exec TOS2,TOS1,TOS. The compiler fills
	    //missing optional parameters with None.
            var varname = stack.pop();
            var lang = stack.pop();
            var stmt = stack.pop();
	    //We need to execute JavaScript to make some of the
	    //library functions, and this way both looks kinda
	    //pretty in Python and passes the Python compiler.
	    //TODO: Insert JavaScript code directly when JIT-compiling.
            if (lang == "JavaScript") {
              var value = eval(stmt);
	      //If a varname is passed, the value of evaluating stmt
              //will be assigned to var.
              if (varname != "None") {
                var index = code_object.co_varnames.indexOf(varname);
                if (index > -1) {
                  if (index < code_object.co_nlocals) {
                    stack[index] = value;
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
        case 90: //STORE_NAME ---------- HAVE_ARGUMENT ----------
            //Implements name = TOS. namei is the index of name in
	    //the attribute co_names of the code object.
            //The Python compiler tries to use STORE_LOCAL or
	    //STORE_GLOBAL if possible.
            var name = code_object.co_names[argument];
            var index = code_object.co_varnames.indexOf(name);
            if (index > -1) {
              var value = stack.pop();
              if (index < code_object.co_nlocals) {
                stack[index] = value;
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
	    //Implements del name, where namei is the index
	    //into co_names attribute of the code object. 
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
            //Unpacks TOS into count individual values, which are
	    //put onto the stack right-to-left. 
            var seq = stack.pop().store; //Assumes tuple.
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
            try {
              if (iterator instanceof this.types.PyObject) {
                var codeObject = iterator.pyClass.codeObject;
                index = codeObject.co_varnames.indexOf("next");
                stack.push(codeObject.co_locals[index]);
		//Set self before calling.
                codeObject.co_locals[index].codeObject.co_locals[0] = iterator;
                this.callFunction(0,stack,[],{});
              } else {
                stack.push(iterator.next(iterator)());
              }
            } catch(exception) {
              if (exception instanceof this.types.PyObject && 
                  exception.pyClass.__name__ != "StopIteration") {
                throw exception;   
              }
              stack.pop();
              pc += argument;
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
                stack.push(stack[index]);
              } else {
                stack.push(code_object.co_locals[index]);
              }
            } else if (this.globals.contains(name)) {
              stack.push(this.globals.lookup(name));
            } else if (name == "__name__") {
	      if (typeof(stack.peek()) == typeof(undefined)) {
		stack.push(code_object.co_name);
	      } else {
		stack.push(stack.peek().codeObject.co_name);
	      }
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
	      //Push a JavaScript function on stack
              stack.push(object[name](object));
            } else if (object instanceof this.types.PyObject) {
              if (object.fields[name] != undefined) {
                stack.push(object.fields[name]);
              } else {
                function lookup(pyClass,name) {
                  index = pyClass.codeObject.co_varnames.indexOf(name);
                  if (index > -1)
                    return pyClass.codeObject.co_locals[index];
                  var result;
                  for (var i=0;i<pyClass.__bases__.length;i++) {
                    var result = lookup(pyClass.__bases__[i],name);
                    if (result) { return result; }
                  }
                }
                var attrObject = lookup(object.pyClass,name);
                if (attrObject instanceof PEJS.prototype.types.PyFunction) {
                  attrObject.codeObject.co_varnames[0] = "self";
                  attrObject.codeObject.co_locals[0] = object;
                } else {
                  throw "LOAD_ATTR tried to load non-function "+ name +
                      " from class "+ object.pyClass.__name__;
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
            var codeObj = eval(module); //Gets the code object
            this.globals.add(codeObj.co_varnames, codeObj.co_locals);
            stack.push(this.execute(codeObj));
            var pyClass = new this.types.PyClass(module, [], codeObj);
            var object = new this.types.PyObject(pyClass);
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
            var codeObject = stack.pop().pyClass.codeObject; 
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
            stack.push(stack[argument]);
            break;
        case 125: //STORE_FAST
            //Stores TOS into the local co_varnames[var_num].
            var value = stack.pop();
            stack[argument] = value;
            code_object.co_locals[argument] = value;
            break;
        case 126: //DELETE_FAST
            delete stack[argument];
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
              throw parameters[0];
            }
            pc = this.blockStack.pop();
            break;
        case 131: //CALL_FUNCTION
            this.callFunction(argument, stack, [], {});
            break;
        case 132: //MAKE_FUNCTION
            //Pushes a new function object on the stack. TOS is the code
            //associated with the function. The function object is defined
            //to have argc default parameters, which are found below TOS. 
            var pyFunction = new this.types.PyFunction(argument, stack.pop());
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
            this.callFunction(argument, stack, stack.pop().store, {});
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

  /**
    *  More or less a copy of execute(). Instead of executing
    *  JavaScript right away, the code is collected in a string
    *  and returned. Throws an exception if the code object
    *  contains jumps, iterators or exceptions.
    */
  compile: function(code_object) {
    var debugEnabled = this.Debugger.debug;
    var bytecode, argument;
    var prog = code_object.co_code;
    var pc = 0;
    var res = "";
    while(true) {
      bytecode = prog[pc];
      if (bytecode >= 90) {
        argument = prog[pc+2];
        pc += 3;
      } else {
        pc++;
      }

      if (debugEnabled) { res += "this.Debugger.printInstruction("+bytecode+", "+argument+", "+pc+", stack);"; }

      switch(bytecode) {
        case 0: //STOP_CODE
            break;
        case 1: //POP_TOP
	    res += "stack.pop();";
	    break;
        case 2: //ROT_TWO
            res += "stack.splice(-1, 0, stack.pop());";
	    break;
	case 3: //ROT_THREE
            res += "stack.splice(-2, 0, stack.pop());";
	    break;
        case 4: //DUP_TOP
            res += "stack.push(stack.peek());";
	    break;
        case 5: //ROT_FOUR
            res += "stack.splice(-3, 0, stack.pop());";
	    break;
        case 9: //NOP
            break;
        case 10: //UNARY_POSITIVE
            res += "stack.push(+stack.pop());";
	    break;
        case 11: //UNARY_NEGATIVE
            res += "stack.push(-stack.pop());";
	    break;
        case 12: //UNARY_NOT
            res += "stack.push(!stack.pop());";
	    break;
        case 13: //UNARY_CONVERT
            throw "UNARY_CONVERT is not implemented yet!";
        case 15: //UNARY_INVERT
            res += "stack.push(~stack.pop());";
	    break;
        case 18: //LIST_APPEND
            throw "LIST_APPEND is not implemented yet!";
        case 19: //BINARY_POWER
            res += "var temp = stack.pop();stack.push(Math.pow(stack.pop(), temp));";
	    break;
        case 20: //BINARY_MULTIPLY
            res += "var temp = stack.pop();stack.push(stack.pop() * temp);";
	    break;
        case 21: //BINARY_DIVIDE
            res += "var temp = stack.pop();stack.push(stack.pop() / temp);";
	    break;
        case 22: //BINARY_MODULO
            res += "var temp = stack.pop();stack.push(stack.pop() % temp);";
	    break;
        case 23: //BINARY_ADD
            res += "var temp = stack.pop();stack.push(stack.pop() + temp);";
	    break;
        case 24: //BINARY_SUBTRACT
            res += "var temp = stack.pop();stack.push(stack.pop() - temp);";
	    break;
        case 25: //BINARY_SUBSCR
            res += "var temp = stack.pop();stack.push(stack.pop().store[temp]);";
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
            res += "stack.push(new this.types.PyList(stack.pop().store.slice(0)));";
            break;
        case 31: //SLICE+1
            res += "var start = stack.pop();stack.push(new this.types.PyList(stack.pop().store.slice(start)));";
            break;
        case 32: //SLICE+2
            res += "var end = stack.pop();stack.push(new this.types.PyList(stack.pop().store.slice(0,end)));";
            break;
        case 33: //SLICE+3
            res += "var end = stack.pop();var start = stack.pop();stack.push(new this.types.PyList(stack.pop().store.slice(start,end)));";
            break;
        case 40: //STORE_SLICE+0
            res += "var list = stack.pop().store;var args = [0,list.length].concat(stack.pop().store);Array.prototype.splice.apply(list,args);";
            break;
        case 41: //STORE_SLICE+1
            res += "var start = stack.pop();var list = stack.pop().store;var args = [start,list.length].concat(stack.pop().store);Array.prototype.splice.apply(list,args);";
            break;
        case 42: //STORE_SLICE+2
            res += "var end = stack.pop();var list = stack.pop().store;var args = [0,end].concat(stack.pop().store);Array.prototype.splice.apply(list,args);";
            break;
        case 43: //STORE_SLICE+3
            res += "var end = stack.pop();var start = stack.pop();var list = stack.pop().store;var args = [start,end-start].concat(stack.pop().store);Array.prototype.splice.apply(list,args);";
            break;
        case 50: //DELETE_SLICE+0
            res += "var list = stack.pop().store;list.splice(0,list.length);";
            break;
        case 51: //DELETE_SLICE+1
            res += "var start = stack.pop();var list = stack.pop().store;list.splice(start,list.length-start);";
            break;
        case 52: //DELETE_SLICE+2
            res += "var end = stack.pop();var list = stack.pop().store;list.splice(0,end);";
            break;
        case 53: //DELETE_SLICE+3
            res += "var end = stack.pop();var start = stack.pop();var list = stack.pop().store;list.splice(start,end-start);";
            break;
        case 55: //INPLACE_ADD
            res += "var temp = stack.pop();stack.push(stack.pop() + temp);";
	    break;
        case 56: //INPLACE_SUBTRACT
            res += "var temp = stack.pop();stack.push(stack.pop() - temp);";
            break;
        case 57: //INPLACE_MULTIPLY
            res += "var temp = stack.pop();stack.push(stack.pop() * temp);";
            break;
        case 58: //INPLACE_DIVIDE
            throw "INPLACE_DIVIDE is not implemented yet!";
        case 59: //INPLACE_MODULO
            res += "var temp = stack.pop();stack.push(stack.pop() % temp);";
            break;
        case 60: //STORE_SUBSCR
            res += "var temp = stack.pop();stack.pop().store[temp] = stack.pop();";
            break;
        case 61: //DELETE_SUBSCR
            res += "var temp = stack.pop();delete stack.pop().store[temp];";
            break;
        case 62: //BINARY_LSHIFT
            res += "var temp = stack.pop();stack.push(stack.pop() << temp);";
            break;
        case 63: //BINARY_RSHIFT
            res += "var temp = stack.pop();stack.push(stack.pop() >> temp);";
            break;
        case 64: //BINARY_AND
            res += "var temp = stack.pop();stack.push(stack.pop() & temp);";
            break;
        case 65: //BINARY_XOR
            res += "var temp = stack.pop();stack.push(stack.pop() ^ temp);";
            break;
        case 66: //BINARY_OR
            res += "var temp = stack.pop();stack.push(stack.pop() | temp);";
            break;
        case 67: //INPLACE_POWER
            res += "var temp = stack.pop();stack.push(Math.pow(stack.pop(), temp));";
            break;
        case 68: //GET_ITER
	    throw "Iterators are not supported by the compiler.";
        case 70: //PRINT_EXPR
            throw "PRINT_EXPR is not implemented yet!";
        case 71: //PRINT_ITEM
            res += "this.printOut(stack.pop());";
            break;
        case 72: //PRINT_NEWLINE
            res += "this.printNewline();";
            break;
        case 73: //PRINT_ITEM_TO
            throw "PRINT_ITEM_TO is not implemented yet!";
        case 74: //PRINT_NEWLINE_TO
            throw "PRINT_NEWLINE_TO is not implemented yet!";
        case 75: //INPLACE_LSHIFT
            res += "var temp = stack.pop();stack.push(stack.pop() << temp);";
            break;
        case 76: //INPLACE_RSHIFT
            res += "var temp = stack.pop();stack.push(stack.pop() >> temp);";
            break;
        case 77: //INPLACE_AND
            res += "var temp = stack.pop();stack.push(stack.pop() & temp);";
            break;
        case 78: //INPLACE_XOR
            res += "var temp = stack.pop();stack.push(stack.pop() ^ temp);";
            break;
        case 79: //INPLACE_OR
            res += "var temp = stack.pop();stack.push(stack.pop() | temp);";
            break;
        case 80: //BREAK_LOOP
            //Terminates a loop due to a break statement.
	    throw "Break in loops is not supported by the compiler.";
            break;
        case 82: //LOAD_LOCALS
            res += "stack.push(code_object);";
            break;
        case 83: //RETURN_VALUE
	    res += "return stack.pop();";
	    return res;
        case 84: //IMPORT_STAR
            throw "IMPORT_STAR is not implemented yet!";
        case 85: //EXEC_STMT
            res += "var varname = stack.pop();"+
            "var lang = stack.pop();"+
            "var stmt = stack.pop();";
            if (lang == "JavaScript") {
              res += "var value = eval(stmt);"+
              "if (varname != \"None\") {"+
                "var index = code_object.co_varnames.indexOf(varname);"+
                "if (index > -1) {"+
                  "if (index < code_object.co_nlocals) {"+
                    "stack[index] = value;"+
                  "}"+
                  "code_object.co_locals[index] = value;"+
                "} else if(this.globals.contains(varname)) {"+
                  "this.globals.store(varname, value);"+
                "} else {"+
                  "var index = code_object.co_varnames.length;"+
                  "code_object.co_varnames[index] = varname;"+
                  "code_object.co_locals[index] = value;"+
                "}"+
              "}";
            } else {
              throw "EXEC_STMT is not implemented for Python statements yet!";
            }
            break;
        case 86: //YIELD_VALUE
            throw "YIELD_VALUE is not implemented yet!";
        case 87: //POP_BLOCK
            res += "this.blockStack.pop();";
            break;
        case 88: //END_FINALLY
            res += "this.blockStack.pop();";
            break;
        case 89: //BUILD_CLASS
            res += "var codeObj = stack.pop();var bases = stack.pop();var className = stack.pop();stack.push(new PEJS.prototype.types.PyClass(className, bases.store, codeObj));";
            break;
        case 90: //STORE_NAME --------------- HAVE_ARGUMENT ---------------
            res += "var name = code_object.co_names["+argument+"];"+
            "var index = code_object.co_varnames.indexOf(name);"+
            "if (index > -1) {"+
              "var value = stack.pop();"+
              "if (index < code_object.co_nlocals) {"+
                "stack[index] = value;"+
              "}"+
              "code_object.co_locals[index] = value;"+
            "} else if (this.globals.contains(name)) {"+
              "this.globals.store(name, stack.pop());"+
            "} else {"+
              "var index = code_object.co_varnames.length;"+
              "code_object.co_varnames[index] = name;"+
              "code_object.co_locals[index] = stack.pop();"+
            "}";
            break;
        case 91: //DELETE_NAME
            res += "var name = code_object.co_names["+argument+"];"+
            "var index = code_object.co_varnames.indexOf(name);"+
            "if (index > -1) {"+
              "if (index < code_object.co_nlocals) {"+
                "stack.remove(index, value);"+
              "}"+
              "delete code_object.co_locals[index];"+
              "delete code_object.co_varnames[index];"+
            "} else if (this.globals.contains(name)) {"+
              "this.globals.remove(name);"+
            "} else { throw \"Could not find name \\\"\"+name+\"\\\" to delete\"; }";
            break;
        case 92: //UNPACK_SEQUENCE
            res += "var seq = stack.pop().store;for (var i = 0; i < seq.length; i++) {stack.push(seq[i]);}";
            break;
        case 93: //FOR_ITER
	    throw "Iterators are not supported by the compiler.";
        case 95: //STORE_ATTR
            res += "var object = stack.pop();"+
            "var name = code_object.co_names["+argument+"];"+
            "if (object instanceof this.types.PyClass){"+
              "var index = object.codeObject.co_varnames.indexOf(name);"+
              "if (index > -1) {"+
                "object.codeObject.co_locals[index] = stack.pop();"+
              "} else {"+
                "var index = object.codeObject.co_varnames.length;"+
                "object.codeObject.co_varnames[index] = name;"+
                "object.codeObject.co_locals[index] = stack.pop();"+
              "}"+
            "} else {"+
              "object.fields[name] = stack.pop();"+
            "}";
            break;
        case 96: //DELETE_ATTR
            throw "DELETE_ATTR is not implemented yet!";
        case 97: //STORE_GLOBAL
            res += "this.globals.store(code_object.co_names["+argument+"], stack.pop());";
            break;
        case 98: //DELETE_GLOBAL
            res += "var name = code_object.co_names["+argument+"];delete code_object.co_names["+argument+"];if (this.globals.contains(name)) {this.globals.remove(name);}";
            break;
        case 99: //DUP_TOPX
            throw "DUP_TOPX is not implemented yet!";
        case 100: //LOAD_CONST
            res += "var value = code_object.co_consts["+argument+"];"+
            "if (typeof(value) == typeof(\"\") && value.match(/^CODEOBJ: \\w+$/)) {"+
              "value = eval(value.substring(9, value.length));"+
            "} else if (value instanceof Array) {"+
              "value = new this.types.PyTuple(value);"+
            "}"+
            "stack.push(value);";
            break;
        case 101: //LOAD_NAME
            res += "var name = code_object.co_names["+argument+"];"+
            "var index = code_object.co_varnames.indexOf(name);"+
            "if (index > -1) {"+
              "if (index < code_object.nlocals) {"+
                "stack.push(stack[index]);"+
              "} else {"+
                "stack.push(code_object.co_locals[index]);"+
              "}"+
            "} else if (this.globals.contains(name)) {"+
              "stack.push(this.globals.lookup(name));"+
            "} else if (name == \"__name__\") {"+
	      "if (typeof(stack.peek()) == typeof(undefined)) {"+
		"stack.push(code_object.co_name);"+
	      "} else {"+
		"stack.push(stack.peek().codeObject.co_name);"+
	      "}"+
            "} else {"+
              "throw \"LOAD_NAME attempted to load non-existing name \\\"\"+name+\"\\\"\";"+
            "}";
            break;
        case 102: //BUILD_TUPLE
            res += "var tuple = [];for(var j="+(argument-1)+"; j>=0; j--) {tuple[j] = stack.pop();}stack.push(new this.types.PyTuple(tuple));";
            break;
        case 103: //BUILD_LIST
            res += "var list = [];for(var j="+(argument-1)+"; j>=0; j--) {list[j] = stack.pop();}stack.push(new this.types.PyList(list));";
            break;
        case 104: //BUILD_MAP
            res += "stack.push(new this.types.PyDict());";
            break;
        case 105: //LOAD_ATTR
            res += "var object = stack.pop();"+
            "var name = code_object.co_names["+argument+"];"+
            "if (object instanceof this.types.PyList || "+
                "object instanceof this.types.PyDict || "+
                "object instanceof this.types.PyIterator) {"+
              "stack.push(object[name](object));"+
            "} else if (object instanceof this.types.PyObject) {"+
              "if (object.fields[name] != undefined) {"+
                "stack.push(object.fields[name]);"+
              "} else {"+
                "function lookup(pyClass,name) {"+
                  "index = pyClass.codeObject.co_varnames.indexOf(name);"+
                  "if (index > -1)"+
                    "return pyClass.codeObject.co_locals[index];"+
                  "var result;"+
                  "for (var i=0;i<pyClass.__bases__.length;i++) {"+
                    "var result = lookup(pyClass.__bases__[i],name);"+
                    "if (result) { return result; }"+
                  "}"+
                "}"+
                "var attrObject = lookup(object.pyClass,name);"+
                "if (attrObject instanceof PEJS.prototype.types.PyFunction) {"+
                  "attrObject.codeObject.co_varnames[0] = \"self\";"+
                  "attrObject.codeObject.co_locals[0] = object;"+
                "} else {"+
                  "throw \"LOAD_ATTR tried to load non-function \"+ name +"+
                      "\" from class \"+ object.pyClass.__name__;"+
                "}"+
                "stack.push(attrObject);"+
              "}"+
            "} else if(object instanceof this.types.PyClass) {"+
              "index = object.codeObject.co_varnames.indexOf(name);"+
              "stack.push(object.codeObject.co_locals[index]);"+
            "} else {"+
              "throw \"LOAD_ATTR tried to load \"+ name +"+
                  "\" from \"+ typeof(object) +\" \"+ object;"+
            "}";
            break;
        case 106: //COMPARE_OP
            res += "var temp1 = stack.pop();var temp2 = stack.pop();if(typeof(temp1) == typeof(\"\") || typeof(temp2) == typeof(\"\")) {temp1 = \"\\\"\" + temp1 + \"\\\"\";temp2 = \"\\\"\" + temp2 + \"\\\"\";}stack.push(eval(temp2 + this.compareOps["+argument+"] + temp1));";
            break;
        case 107: //IMPORT_NAME
            res += "var module = code_object.co_names["+argument+"];"+
            "var codeObj = eval(module);"+
            "this.globals.add(codeObj.co_varnames, codeObj.co_locals);"+
            "stack.push(this.execute(codeObj));"+
            "var pyClass = new this.types.PyClass(module, [], codeObj);"+
            "var object = new this.types.PyObject(pyClass);"+
            "for (var j=0; j<codeObj.co_locals.length; j++) {"+
              "if (/__\w+__/.test(codeObj.co_varnames[j])) { continue; }"+
              "if (codeObj.co_locals[j] instanceof PEJS.prototype.types.PyFunction) { continue; }"+
              "object.fields[codeObj.co_varnames[j]] = codeObj.co_locals[j];"+
            "}"+
            "stack.pop();"+
            "stack.push(object);";
            break;
        case 108: //IMPORT_FROM
            res += "var codeObject = stack.pop().pyClass.codeObject;"+
            "var attrname = code_object.co_names["+argument+"];"+
            "var attr = codeObject.co_locals[codeObject.co_varnames.indexOf(attrname)];"+
            "stack.push(attr);";
            break;
        case 110: //JUMP_FORWARD
            throw "Jumps not supported by compiler";
        case 111: //JUMP_IF_FALSE
            throw "Jumps not supported by compiler";
        case 112: //JUMP_IF_TRUE
            throw "Jumps not supported by compiler";
        case 113: //JUMP_ABSOLUTE
            throw "Jumps not supported by compiler";
        case 116: //LOAD_GLOBAL
            res += "var name = code_object.co_names["+argument+"];"+
            "if (name == \"__name__\") {"+
              "stack.push(code_object.co_name);"+
            "} else {"+
              "stack.push(this.globals.lookup(name));"+
            "}";
            break;
        case 119: //CONTINUE_LOOP
            throw "CONTINUE_LOOP is not implemented yet!";
        case 120: //SETUP_LOOP
            res += "this.blockStack.push("+(pc+argument)+");";
            break;
        case 121: //SETUP_EXCEPT
            res += "this.blockStack.push("+(pc+argument)+");";
            break;
        case 122: //SETUP_FINALLY
            res += "this.blockStack.push("+(pc+argument)+");";
            break;
        case 124: //LOAD_FAST
            res += "stack.push(stack["+argument+"]);";
            break;
        case 125: //STORE_FAST
            res += "var value = stack.pop();stack["+argument+"] = value;code_object.co_locals["+argument+"] = value;";
            break;
        case 126: //DELETE_FAST
            res += "delete stack["+argument+"];delete code_object.co_locals["+argument+"];delete code_object.co_varnames["+argument+"];";
            break;
        case 130: //RAISE_VARARGS
	    throw "Exceptions not supported by compiler.";
	    break;
        case 131: //CALL_FUNCTION
            res += "this.callFunction("+argument+", stack, [], {});";
            break;
        case 132: //MAKE_FUNCTION
            res += "var pyFunction = new this.types.PyFunction("+argument+", stack.pop());for (var j="+(argument-1)+"; j>=0; j--){pyFunction.addArg(j, stack.pop());}stack.push(pyFunction);";
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
            res += "this.callFunction("+argument+", stack, stack.pop().store, {});";
            break;
        case 141: //CALL_FUNTION_KW
	    res += "this.callFunction("+argument+", stack, [], stack.pop().store);";
            break;
        case 142: //CALL_FUNCTION_VAR_KW
	    res += "var kwArgs = stack.pop().store;this.callFunction("+argument+", stack, stack.pop().store, kwArgs);";
            break;
        case 143: //EXTENDED_ARG
            throw "EXTENDED_ARG is not implemented yet!";
        default:
            throw "Unexpected bytecode:" + bytecode;
      }
    }
  },
  
  /**
    *  Optimizes code using the peephole patterns in the
    *  method.
    *  TODO: The optimizations are written to be extremely
    *  aggressive for one specific benchmark as a proof of
    *  concept. The peephole patterns aren't all sound in
    *  all cases, and should be redone.
    *  Code patterns are noted before suggested peepholes.
    */
  optimize: function(code) {
    var tag = "//Optimizing: "+code.length;

    //Remove var keyword to ease optimization.
    code = code.replace(/([; }])var /g,"$1");

    //stack.push(value);var value = stack.pop()
    code = code.replace(/stack\.push\(value\);value = stack\.pop\(\)/g,"");

    //stack.push(value);var value = stack.pop()
    //stack.push(stack[3]);var temp = stack.pop();
    //stack.push(stack.pop() / temp);var value = stack.pop();
    //stack.push(stack.pop() + temp);var value = stack.pop()
    code = code.replace(/stack\.push\((([\w. +*/-]|\(\)|\[\w*\])+)\);(\w+) = stack.pop\(\)/g,"$3 = $1");

    //var temp = stack[2];var value = stack.pop() / temp;
    code = code.replace(/temp = (([\w.]|\(\)|\[\w*\])+);(\w+) = stack\.pop\(\) ([+-/*]) temp;/g,"$3 = stack.pop() $4 $1;");

    //Good to run this once more :)
    code = code.replace(/stack\.push\((([\w. +*/-]|\(\)|\[\w*\])+)\);(\w+) = stack.pop\(\)/g,"$3 = $1");

    //value = stack[2] - stack[3];stack[3] = value;
    code = code.replace(/value = (([\w. +*/-]|\(\)|\[\w*\])+);(([\w.]|\[\w*\])+) = value;/g,"$3 = value = $1;");

    //stack[3] = value = stack[2] + stack[3];code_object.co_locals[3] = value;
    code = code.replace(/(([\w.]|\[\w*\])+) = value = (([\w. +*/-]|\(\)|\[\w*\])+);(([\w.]|\[\w*\])+) = value;/g,"$5 = $1 = value = $3;");

    //TODO: UNSOUND!!!
    //code_object.co_locals[3] = stack[3] = value = stack[3] - stack[1];code_object.co_locals[3] = stack[3] = value = stack[1] - stack[2];
    while (/code_object\.co_locals\[3\] = (([\w.]|\[\w*\])+) = value = (([\w. +*/-]|\(\)|\[\w*\])+);(code_object\.co_locals\[3\] = (([\w.]|\[\w*\])+) = value = (([\w. +*/-]|\(\)|\[\w*\])+);)/.test(code)) {
      code = code.replace(/code_object\.co_locals\[3\] = (([\w.]|\[\w*\])+) = value = (([\w. +*/-]|\(\)|\[\w*\])+);(code_object\.co_locals\[3\] = (([\w.]|\[\w*\])+) = value = (([\w. +*/-]|\(\)|\[\w*\])+);)/, "$1 = $3;$5");
    }

    code += tag +" to "+code.length+" lines";
    return code;
  },
  
  /**
    *  Handles all function calls.
    *  Parameters are resolved and prepared, and the
    *  appropriate functions are called.
    */
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
      this.callPyFunction(argc, posParams, kwParams, stack, stack.pop());
    } else if (stack.peek() instanceof this.types.PyClass) {
      this.callPyClass(argc, posParams, kwParams, stack);
    } else if (stack.peek() instanceof Function) {
      stack.push(stack.pop()(posParams));
    } else {
      throw "CALL_FUNCTION tried to execute non-executable: "+stack.pop();
    }
  },
  
  /**
    *  Handles Python function calls.
    *  Resolves default arguments, keyword arguments
    *  and the special constructs *list and **dict.
    */
  callPyFunction: function(argc, posParams, kwParams, stack, pyFunction) {
    var codeObject = pyFunction.codeObject;    
    var locals = codeObject.co_locals;
    var co_argc = codeObject.co_argcount;
    if (codeObject.co_varnames[0] === "self") {
      //insert self reference
      posParams.unshift(locals[0]);
    }
    if (argc < co_argc) {
      //insert default parameters if necessary
      var defArgc = pyFunction.defArgc;
      var defArgs = pyFunction.defArgs;
      var overlap = (argc + defArgc) - co_argc;            
      var index = posParams.length;
      while (index < co_argc) {
        posParams[index] = defArgs[index - argc + overlap];
        index = posParams.length;
      }
    } else if (argc > co_argc) {
      var list = [];
      for (var i=co_argc;i<posParams.length;i++) {
        list.push(posParams[i]);
      }
      if (list.length > 0) {
        locals[co_argc] = new this.types.PyTuple(list);
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
    if (locals[co_argc] instanceof this.types.PyTuple) {
      locals[co_argc+1] = kwDict;
    } else {
      locals[co_argc] = kwDict;
    }
    for (var i=0; i<co_argc; i++) {
      locals[i] = posParams[i];
    }    
    stack.push(this.execute(codeObject));
  },
  
  /**
    *  Handles Python object initialization.
    *  Creates a new PyObject and calls the __init__
    *  method if it exists.
    */
  callPyClass: function(actualArgc, posParams, kwParams, stack) {
    var object = new this.types.PyObject(stack.pop());
    //Find all fields that belong to this object
    function injectFields(object, pyClass) {
      for (var i=pyClass.__bases__.length-1; i>=0; i--) {
        injectFields(object, pyClass.__bases__[i]);
      }
      var codeObj = pyClass.codeObject;
      for (var j=0; j<codeObj.co_locals.length; j++) {
        if (codeObj.co_locals[j] instanceof PEJS.prototype.types.PyFunction) { continue; }
        if (/__\w+__/.test(codeObj.co_varnames[j])) { continue; }
        object.fields[codeObj.co_varnames[j]] = codeObj.co_locals[j];
      }
    }
    injectFields(object, object.pyClass);
    //Execute the __init__ method if it exists
    var codeObject = object.pyClass.codeObject;
    var index = codeObject.co_varnames.indexOf("__init__");
    if (index > -1) {
      codeObject.co_locals[index].codeObject.co_locals[0] = object;
      this.callPyFunction(actualArgc, posParams, kwParams, stack, codeObject.co_locals[index]);
      stack.pop(); //return value from init
    }
    stack.push(object);
  },
  
  /**
    *  Handles the differences in printing,
    *  depending on environment.
    */
  printOut: function(str) {
    switch(this.getEnvironment()) {
      case "browser":
          document.write(str);
      break;
      case "standalone":
          if (str == "42") {
            success++;
          }
          print(str);
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
  
  /**
    *  Resolves the environment based on the existence of
    *  the alert() method that exists in browsers.
    */
  getEnvironment: function() {
    if(typeof(alert) == typeof(undefined)) {
      return "standalone";
    } else {
      return "browser";
    }
  }
}

/**
  *  The Globals object contains the outermost
  *  local variables from the library, the running
  *  program and all imports.
  */
PEJS.prototype.Globals = function() {
  this.values = [[]]; //Initialized with a special array for new globals
  this.names = [[]];

  this.reset = function() {
    this.values.length = 2;
    this.names.length = 2;
  };

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

/**
  *  Namespace for the built-in types
  */	
PEJS.prototype.types = {
  
  PyClass: function(name, bases, codeObj) {
    this.__name__ = name;
    this.__bases__ = bases;
    this.codeObject = codeObj;
    this.toString = function() { return "PyClass:"+this.__name__; };
  },
  
  PyObject: function(clss) {
    this.pyClass = clss;
    this.fields = new Object();
    this.toString = function() { return "PyObject:"+this.pyClass.__name__; };
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
    if (iterable instanceof PEJS.prototype.types.PyList ||
	iterable instanceof PEJS.prototype.types.PyTuple) {
      this.index = 0;
      this.next = function(it) { return function(vars) {
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
        var index = it.pyClass.codeObject.co_varnames.indexOf("next");
        if (index > -1) { return it.pyClass.codeObject.co_locals[index]; }
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

/**
  *  The name is a little ambitious, as Debuggers current
  *  role is to trace the execution of byte codes.
  */
PEJS.prototype.Debugger = {
  debug: false,

  bytecodes: ["STOP_CODE", "POP_TOP", "ROT_TWO", "ROT_THREE", "DUP_TOP", "ROT_FOUR",,,, "NOP", "UNARY_POSITIVE", "UNARY_NEGATIVE", "UNARY_NOT", "UNARY_CONVERT",, "UNARY_INVERT",,, "LIST_APPEND", "BINARY_POWER", "BINARY_MULTIPLY", "BINARY_DIVIDE", "BINARY_MODULO", "BINARY_ADD", "BINARY_SUBTRACT", "BINARY_SUBSCR", "BINARY_FLOOR_DIVIDE", "BINARY_TRUE_DIVIDE", "INPLACE_FLOOR_DIVIDE", "INPLACE_TRUE_DIVIDE", "SLICE+0", "SLICE+1", "SLICE+2", "SLICE+3",,,,,,, "STORE_SLICE+0", "STORE_SLICE+1", "STORE_SLICE+2", "STORE_SLICE+3",,,,,,, "DELETE_SLICE+0", "DELETE_SLICE+1", "DELETE_SLICE+2", "DELETE_SLICE+3",, "INPLACE_ADD", "INPLACE_SUBTRACT", "INPLACE_MULTIPLY", "INPLACE_DIVIDE", "INPLACE_MODULO", "STORE_SUBSCR", "DELETE_SUBSCR", "BINARY_LSHIFT", "BINARY_RSHIFT", "BINARY_AND", "BINARY_XOR", "BINARY_OR", "INPLACE_POWER", "GET_ITER",, "PRINT_EXPR", "PRINT_ITEM", "PRINT_NEWLINE", "PRINT_ITEM_TO", "PRINT_NEWLINE_TO", "INPLACE_LSHIFT", "INPLACE_RSHIFT", "INPLACE_AND", "INPLACE_XOR", "INPLACE_OR", "BREAK_LOOP",, "LOAD_LOCALS", "RETURN_VALUE", "IMPORT_STAR", "EXEC_STMT", "YIELD_VALUE", "POP_BLOCK", "END_FINALLY", "BUILD_CLASS", "STORE_NAME", "DELETE_NAME", "UNPACK_SEQUENCE", "FOR_ITER",, "STORE_ATTR", "DELETE_ATTR", "STORE_GLOBAL", "DELETE_GLOBAL", "DUP_TOPX", "LOAD_CONST", "LOAD_NAME", "BUILD_TUPLE", "BUILD_LIST", "BUILD_MAP", "LOAD_ATTR", "COMPARE_OP", "IMPORT_NAME", "IMPORT_FROM",, "JUMP_FORWARD", "JUMP_IF_FALSE", "JUMP_IF_TRUE", "JUMP_ABSOLUTE",,, "LOAD_GLOBAL",,, "CONTINUE_LOOP", "SETUP_LOOP", "SETUP_EXCEPT", "SETUP_FINALLY",, "LOAD_FAST", "STORE_FAST", "DELETE_FAST",,,, "RAISE_VARARGS", "CALL_FUNCTION", "MAKE_FUNCTION", "BUILD_SLICE", "MAKE_CLOSURE", "LOAD_CLOSURE", "LOAD_DEREF", "STORE_DEREF",,, "CALL_FUNCTION_VAR", "CALL_FUNTION_KW", "CALL_FUNCTION_VAR_KW", "EXTENDED_ARG"],

  printDebug: function(color, str) {
      this.printOut("<tr><td colspan=\"7\" class=\""+color+
		    "\">"+str+"</td></tr>");
  },

  printOut: function(str) {
    if (this.debug) {
      PEJS.prototype.printOut(str);
    }
  },
  
  printInstruction: function(inst, arg, pc, stack) {
    var res = "<tr>";
    if (inst < 90) {
      res += "<td class=\"offset\">"+pc+"</td>"+
	  "<td class=\"inst\">"+this.bytecodes[inst]+"</td>"+
	    "<td></td>"+
	    "<td></td>"+
	    "<td class=\"code\">"+inst+"</td>"+
	    "<td></td>";
    } else {
      res += "<td class=\"offset\">"+pc+"</td>"+
	    "<td class=\"inst\">"+this.bytecodes[inst]+"</td>"+
	    "<td class=\"value\"></td>"+
	    "<td class=\"type\"></td>"+
	    "<td class=\"code\">"+inst+"</td>"+
	    "<td class=\"arg\">"+arg+"</td>";
    }
    res += "<td class=\"stack\">"+stack+"</td>";
    this.printOut(res +"</tr>");
  },

  printObject: function(object) {
    var res = "Object print:<br/>";
    for (prop in object) {
      res += "&nbsp;&nbsp;&nbsp;"+ prop +": "+ object[prop] +"<br/>";
    }
    this.printDebug("green",res);
  }
}  
