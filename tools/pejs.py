#!/usr/bin/python
# Input a .py or .pyc file, and a js file with an array
# containing the instructions, constants, local varialbles(initialy empty)
# and symboltable will be created.
# The array is named the same as the python file.
# An instruction consists of an array with the following:
# [0] Opcode
# [1] Offset
# [2] Argument        (Optional)
# [3] Argument Type   (Optional)
# [4] Argument Value  (Optional)
# [5] Opcode name

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
    #print "%s.js created" % (filename[:len(filename) - 4])
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
  file.write("// This file was automatically created with pejs.py\n\n")
  file.write("// The structure of an instruction is:\n")
  file.write("// [Opcode, Offset, (Arg, Arg Type, Arg Value,)? Opcode Name]\n\n")
  global queue
  file.write(print_code(code_object, "", filename))
  while len(queue) > 0:
    code_object, varname = queue[0]
    queue.remove((code_object, varname))
    #varname = filename+"_"+code_object.co_name
    file.write(print_code(code_object, "", varname))
  file.close()

# [0] Opcode
# [1] Offset
# [2] Argument        (Optional)
# [3] Argument Type   (Optional)
# [4] Argument Value  (Optional)
# [5] Opcode name
# Creates a string with the js code, calls the appropriete methods
# to collect all the information.
def print_code(code_object, indent, varname):
  instructions = decompile(code_object)
  result = "var "+ varname + " = {\n"
  result = result + "co_name: \"" + code_object.co_name + "\",\n"
  result = result + "co_argcount: " + str(code_object.co_argcount) + ",\n"
  result = result + "co_nlocals: " + str(code_object.co_nlocals) + ",\n"
  result = result + "co_varnames: " + print_names(code_object.co_varnames, "") + ",\n"
  #result = result + "co_cellvars: " + print_names(code_object.co_cellvars, "") + ",\n"
  #result = result + "co_freevars: " + print_names(code_object.co_freevars, "") + ",\n"
  result = result + "co_code: " + print_instructions(instructions, indent + "    ")+",\n"
  result = result + "co_code2: " + print_instructions2(instructions, indent + "    ")+",\n"
  result = result + "co_consts: " + print_consts(code_object.co_consts, "", varname) + ",\n"
  result = result + "co_names: " + print_names(code_object.co_names, "")  + ",\n"
  #result = result + "co_filename: \"" + code_object.co_filename + "\",\n"
  #result = result + "co_firstlineno: " + str(code_object.co_firstlineno) + ",\n"
  #result = result + "co_lnotab: " + code_object.co_lnotab + ",\n"
  result = result + "co_stacksize: " + str(code_object.co_stacksize) + ",\n"
  #result = result + "co_flags: " + str(code_object.co_flags) + ",\n"
  result = result + "co_locals: [],\n"
  result = result + "toString: function() { return \"CodeObject:"+varname+"\"} };\n\n"
  return result

# Helper for print_code, prints names
def print_names(names, indent):
  result = indent + "["
  i = 0
  for (name) in names:
    result = result + indent + "\"" + name +"\", "
    i = i + 1
  if i > 0:
    result = result[:len(result)-2]
  return result + indent + "]"

# Helper for print_code, prints the constants.
def print_consts(consts, indent, varname):
  result = indent + "["
  i = 0
  for (const) in consts:
    if type(const) == type(""):
      result = result + indent + "\""+ const.replace("\"","\\\"") + "\", "
    elif type(const) == type(42):
      result = result + indent + str(const) + ", "
    elif type(const) == type(None):
      result = result + indent + "\"" + str(const) + "\"" + ", "
    elif type(const) == type(code_object):
      result = result + indent + "\"CODEOBJ: " + varname +"_"+const.co_name + "\", "
      queue.append((const, varname +"_"+const.co_name))
    elif type(const) == type(()):
      #print "CONST: "+str(const)
      result = result + print_consts(const, indent, varname) + ", "
      #result = result + "["
      #for i in const:
       # print_consts
    else:
      result = result + indent + str(const) + ", "
    i = i + 1
  if i > 0:
    result = result[:len(result) - 2]
  return result + indent +"]"

def padZeroes(string, count):
  while len(string) < count:
    string = "0"+ string
  return string

# Helper for print_code, prints the instructions.
#def print_instructions(instructions, indent):
  #result = indent + "\""
  #for (offset, op, name, argument, argtype, argvalue) in instructions:
    #result = result + padZeroes(str(op),3)        # Opcode value
    #if (op >= opcode.HAVE_ARGUMENT):
      #result = result + padZeroes(str(argument),6)      # Argument
  #return result + "\""

def print_instructions(instructions, indent):
  result = indent + "["
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    result = result + str(op) +","        # Opcode value
    if (op >= opcode.HAVE_ARGUMENT):
      result = result +"0,"+ str(argument) +","     # Argument
  return result[:len(result)-1] + "]"

# Helper for print_code, prints the instructions.
def print_instructions2(instructions, indent):
  result = indent + "[ //Instructions\n"
  i = 0
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    result = result + indent +"  ["+ str(op)        # Opcode value
    result = result +","+ str(offset)               # Offset
    if (op >= opcode.HAVE_ARGUMENT):
      result = result +","+ str(argument)           # Argument
      result = result +",\""+ str(argtype) +"\""    # Argument Type
      if type(argvalue) == type(""):
        argvalue = argvalue.replace("\"","\\\"")
      result = result +",\""+ str(argvalue) +"\""   # Argument Value
    result = result +",\""+ str(name) +"\""+ "],\n" # Name
    i = i + 1
  return result[:len(result)-2] + "\n" + indent + "]"

# Boolean file_exist test.
def file_exists(filename):
  try:
    file = open(filename)
  except IOError:
    exists = 0
  else:
    exists = 1
  return exists

if __name__ == "__main__":
  if len(sys.argv) < 2:
    print "Usage:\n ./pejs.py [pythonfile.{py|pyc}]"
  else:
    main(sys.argv[1])