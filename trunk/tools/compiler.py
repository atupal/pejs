#!/usr/bin/python
# Input a .py or .pyc file, and a .js file of the same name will be created.
# The .js file contains a number of JavaScript objects, each representing a
# Python code object.

import sys, py_compile, marshal, opcode, os

queue = []

# Handle tedious input details.
def main(filename):
  if file_exists(filename):
    if filename.endswith(".py"):
      if file_exists(filename + "c"):
        os.remove(filename + "c")
      py_compile.compile(filename)
      if file_exists(filename + "c"):
        filename = filename + "c"
      else:
        print "Syntactic errors in input file"
        return
    elif not filename.endswith(".pyc"):
      print "Usage:\n ./pejs.py [pythonfile.{py|pyc}]"
      return
    global code_object
    code_object = get_code_object(filename)
    js_file_print(code_object, filename[:len(filename) - 4])
  else:
    print "File \"%s\" doesnt exist" % (filename)

# Create a codeobject from pyc file.
def get_code_object(filename):
  f = open(filename, "rb")
  magic = f.read(4)      #Read magic number
  moddate = f.read(4)    #Read modification date
  return marshal.load(f) #Read the code

# Create python array containing instructions.
def decompile(code_object):
  code = code_object.co_code
  variables = code_object.co_cellvars + code_object.co_freevars
  instructions = []
  n = len(code)
  i = 0
  e = 0
  while i < n:
    i_offset = i
    i_opcode = ord(code[i])
    i = i + 1
    if i_opcode >= opcode.HAVE_ARGUMENT:
      i_argument = ord(code[i]) + (ord(code[i+1]) << (8)) + e
      i = i +2
      if i_opcode == opcode.EXTENDED_ARG:
        e = iarg << 16
      else:
        e = 0
      if i_opcode in opcode.hasconst:
        i_arg_value = repr(code_object.co_consts[i_argument])
        i_arg_type = 'CONSTANT'
      elif i_opcode in opcode.hasname:
        i_arg_value = code_object.co_names[i_argument]
        i_arg_type = 'GLOBAL VARIABLE'
      elif i_opcode in opcode.hasjrel:
        i_arg_value = repr(i + i_argument)
        i_arg_type = 'RELATIVE JUMP'
      elif i_opcode in opcode.haslocal:
        i_arg_value = code_object.co_varnames[i_argument]
        i_arg_type = 'LOCAL VARIABLE'
      elif i_opcode in opcode.hascompare:
        i_arg_value = opcode.cmp_op[i_argument]
        i_arg_type = 'COMPARE OPERATOR'
      elif i_opcode in opcode.hasfree:
        i_arg_value = variables[i_argument]
        i_arg_type = 'FREE VARIABLE'
      else:
        i_arg_value = i_argument
        i_arg_type = 'OTHER'
    else:
      i_argument = None
      i_arg_value = None
      i_arg_type = None
    instructions.append( (i_offset, i_opcode, opcode.opname[i_opcode],\
                          i_argument, i_arg_type, i_arg_value) )
  return instructions

# Opens the js file for reading, calls the print methods and closes the file.
def js_file_print(code_object, filename):
  file = open(filename + ".js", 'w')
  file.write("//This file was automatically created with compiler.py\n\n")
  global queue
  file.write(print_code(code_object, filename))
  while len(queue) > 0:
    code_object, varname = queue[0]
    queue.remove((code_object, varname))
    file.write(print_code(code_object, varname))
  file.close()

# Creates a string with the js code, calls the appropriate methods
# to collect all the information.
def print_code(code_object, varname):
  instructions = decompile(code_object)
  result = "var "+ varname + " = {\n"
  result = result + "co_name: \"" + code_object.co_name + "\",\n"
  result = result + "co_argcount: " + str(code_object.co_argcount) + ",\n"
  result = result + "co_nlocals: " + str(code_object.co_nlocals) + ",\n"
  result = result + "co_varnames: " + print_names(code_object.co_varnames) + ",\n"
  result = result + "co_code: " + print_instructions(instructions)+",\n"
#  result = result + "co_code2: " + print_instructions2(instructions)+",\n"
  result = result + "co_consts: " + print_consts(code_object.co_consts, varname) + ",\n"
  result = result + "co_names: " + print_names(code_object.co_names)  + ",\n"
  result = result + "co_stacksize: " + str(code_object.co_stacksize) + ",\n"
  result = result + "co_locals: [],\n"
  result = result + "toString: function() { return \"CodeObject:"+varname+"\"} };\n\n"
  return result

# Helper for print_code, prints names
def print_names(names):
  result = "["
  i = 0
  for (name) in names:
    result = result +"\""+ name +"\", "
    i = i + 1
  if i > 0:
    result = result[:len(result)-2]
  return result +"]"

# Helper for print_code, prints the constants.
def print_consts(consts, varname):
  result = "["
  i = 0
  for (const) in consts:
    if type(const) == type(""):
      result = result +"\""+ const.replace("\"","\\\"") +"\", "
    elif type(const) == type(42):
      result = result + str(const) +", "
    elif type(const) == type(None):
      result = result +"\""+ str(const) +"\", "
    elif type(const) == type(code_object):
      result = result +"\"CODEOBJ: "+ varname +"_"+ const.co_name + "\", "
      queue.append((const, varname +"_"+ const.co_name))
    elif type(const) == type(()):
      result = result + print_consts(const, varname) +", "
    else:
      result = result + str(const) +", "
    i = i + 1
  if i > 0:
    result = result[:len(result) - 2]
  return result +"]"

def padZeroes(string, count):
  while len(string) < count:
    string = "0"+ string
  return string

def print_instructions(instructions):
  result = "["
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    result = result + str(op) +","        # Opcode value
    if (op >= opcode.HAVE_ARGUMENT):
      result = result +"0,"+ str(argument) +","     # Argument
  return result[:len(result)-1] +"]"

# Helper for print_code, prints the instructions.
def print_instructions2(instructions):
 result = "[ //Instructions\n"
 i = 0
 for (offset, op, name, argument, argtype, argvalue) in instructions:
   result = result + "  ["+ str(op)        # Opcode value
   result = result +","+ str(offset)               # Offset
   if (op >= opcode.HAVE_ARGUMENT):
     result = result +","+ str(argument)           # Argument
     result = result +",\""+ str(argtype) +"\""    # Argument Type
     if type(argvalue) == type(""):
       argvalue = argvalue.replace("\"","\\\"")
     result = result +",\""+ str(argvalue) +"\""   # Argument Value
   result = result +",\""+ str(name) +"\""+ "],\n" # Name
   i = i + 1
 return result[:len(result)-2] + "\n]"

# Boolean file_exist test.
def file_exists(filename):
  try:
    file = open(filename)
  except IOError:
    return False
  return True

if __name__ == "__main__":
  if len(sys.argv) < 2:
    print "Usage:\n ./pejs.py [pythonfile.{py|pyc}]"
  else:
    main(sys.argv[1])