#!/usr/bin/python
# Input a .py or .pyc file, and a js file with an array
# containing the instructions will be created.
# Each index in the array will correspond to a singe
# instruction, the array is named the same as the python
# file.
# An instruction consists of an array with the following:
# [0] Offset
# [1] Opcode Value
# [2] Opcode Name
# [3] Argument
# [4] Argument Type
# [5] Argument Value

import sys, py_compile, marshal, opcode, os

constpool = []

# Handle tedious input details
def main():
  if len(sys.argv) < 2:
    print "Usage:\n ./pejs.py [pythonfile.{py|pyc}]"
  else:
    filename = sys.argv[1]
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
      inst = decompile(filename)
      js_file_print_trimmed(inst, filename[:len(filename) - 4])
    else:
      print "File \"%s\" doesnt exist" % (filename)

# Create a python array from .pyc file
def decompile(filename):
  f = open(filename, "rb")
  magic = f.read(4) #Read magic number
  moddate = f.read(4) #Read modification date
  code_object = marshal.load(f) #Read the code
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
  global constpool                        
  constpool = code_object.co_consts
  return instructions

# Pretty print the instructions
def pretty_print(instructions):
  print '%5s %-20s %3s  %5s  %-20s  %s' % \
    ('OFFSET', 'INSTRUCTION', 'OPCODE', 'ARG', 'TYPE', 'VALUE')
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    print '%5d  %-20s (%3d)  ' % (offset, name, op),
    if argument != None:
      print '%5d  %-20s  (%s)' % (argument, argtype, argvalue),
    print 

# Print js info to stdout from instructions
def js_print(instructions, filename):
  print "var %s = new Array();" % (filename)
  i = 0
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    print "\nvar temp = new Array();"
    print "  temp[0] = \"%s\";" % (offset)   # Offset
    print "  temp[1] = \"%s\";" % (op)       # Opcode value
    print "  temp[2] = \"%s\";" % (name)     # Name
    print "  temp[3] = \"%s\";" % (argument) # Argument
    print "  temp[4] = \"%s\";" % (argtype)  # Argument Type
    if type(argvalue) == type("v8 sucks!"):
      argvalue = argvalue.replace("\"","\\\"")
    print "  temp[5] = \"%s\";" % (argvalue) # Argument Value
    print "  %s[%d] = temp;" % (filename, i)
    i = i + 1

# Print js info to file from instructions
def js_file_print(instructions, filename):
  file = open(filename + ".js", 'w')
  file.write("var "+ filename +" = new Array();\n")
  i = 0
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    file.write("\nvar temp = new Array();\n")
    file.write("  temp[0] = \""+ str(offset) +"\";\n")    # Offset
    file.write("  temp[1] = \""+ str(op) +"\";\n")        # Opcode value
    file.write("  temp[2] = \""+ str(name) +"\";\n")      # Name
    file.write("  temp[3] = \""+ str(argument) +"\";\n")  # Argument
    file.write("  temp[4] = \""+ str(argtype) +"\";\n")   # Argument Type
    if type(argvalue) == type("v8 sucks!"):
      argvalue = argvalue.replace("\"","\\\"")
    file.write("  temp[5] = \""+ str(argvalue) +"\";\n")  # Argument Value
    file.write("  "+ filename +"["+ str(i) +"] = temp;\n")
    i = i + 1
  file.close()
  print "%s.js created" % (filename)
  
# Print js info to file from instructions
def js_file_print_trimmed(instructions, filename):
  global constpool
  
  file = open(filename + ".js", 'w')
  file.write("var "+ filename +"Const = new Array();\n")
  for i in range(0, len(constpool)):
    if type(constpool[i]) == type(""):
      file.write("  "+filename +"Const["+str(i)+"] = \""+constpool[i].replace("\"","\\\"")+"\"\n")
    elif type(constpool[i]) == type(42):
      file.write("  "+filename +"Const["+str(i)+"] = "+str(constpool[i])+"\n")
    elif type(constpool[i]) == type(None):
      file.write("  "+filename +"Const["+str(i)+"] = \""+str(constpool[i])+"\"\n")
    else:
      file.write("  "+filename +"Const["+str(i)+"] = undefined //"+str(constpool[i])+"\n")
  file.write("\nvar "+ filename +" = new Array();\n")
  i = 0
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    file.write("\nvar temp = new Array();\n")
    file.write("  temp[0] = "+ str(op) +";\n")            # Opcode value
    if (op > opcode.HAVE_ARGUMENT):
      file.write("  temp[1] = "+ str(argument) +";\n")  # Argument
      file.write("  temp[2] = \""+ str(argtype) +"\";\n")   # Argument Type
      if type(argvalue) == type("v8 sucks!"):
        argvalue = argvalue.replace("\"","\\\"")
      file.write("  temp[3] = \""+ str(argvalue) +"\";\n")  # Argument Value
    file.write("  temp[4] = \""+ str(name) +"\";\n")      # Name
    file.write("  temp[5] = \""+ str(offset) +"\";\n")    # Offset
    file.write("  "+ filename +"["+ str(i) +"] = temp;\n")
    i = i + 1
  file.close()
  print "%s.js created" % (filename)  

def file_exists(filename):
  try:
    file = open(filename)
  except IOError:
    exists = 0
  else:
    exists = 1
  return exists

main()