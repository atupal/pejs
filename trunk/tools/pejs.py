#!/usr/bin/python
# Input a .py or .pyc file, and a js file with an array
# containing the instructions will be created.
# Each index in the array will correspond to a singe
# instruction, the array is named the same as the python
# file.
# An instruction consists of an array with the following:
# [0] Opcode
# [1] Argument
# [2] Argument Type
# [3] Argument Value
# [4] Opcode name
# [5] Offset

import sys, py_compile, marshal, opcode, os

co_const = []
co_names = []
code_object = None

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
      global code_object
      code_object = get_code_object(filename)
      inst = decompile(code_object)
      js_file_print_trimmed(inst, filename[:len(filename) - 4])
    else:
      print "File \"%s\" doesnt exist" % (filename)

# Create a python array from .pyc file
def get_code_object(filename):
  f = open(filename, "rb")
  magic = f.read(4) #Read magic number
  moddate = f.read(4) #Read modification date
  return marshal.load(f) #Read the code

def decompile(code_object):
  code = code_object.co_code
  global co_names
  co_names = code_object.co_names
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
  global co_const                        
  co_const = code_object.co_consts
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
  global co_const
  global co_names
  global code_object
  
  file = open(filename + ".js", 'w')
  
  file.write("/*\n[0] Opcode\n"+ 
                "[1] Argument   (optional)\n"+
                "[2] Arg Type   (optional)\n"+
                "[3] Arg Value  (optional)\n"+
                "[4] Opcode name\n"+
                "[5] Offset\n */\n")
  file.write("var "+ filename +"Names = new Array();\n")
  for i in range(0, len(co_names)):
    file.write("  "+ filename +"Names["+str(i)+"] = \""+ co_names[i] +"\";\n")

  file.write("\nvar "+ filename +"Const = new Array();\n")
  for i in range(0, len(co_const)):
    if type(co_const[i]) == type(""):
      file.write("  "+filename +"Const["+str(i)+"] = \""+co_const[i].replace("\"","\\\"")+"\"\n")
    elif type(co_const[i]) == type(42):
      file.write("  "+filename +"Const["+str(i)+"] = "+str(co_const[i])+"\n")
    elif type(co_const[i]) == type(None):
      file.write("  "+filename +"Const["+str(i)+"] = \""+str(co_const[i])+"\"\n")
    elif type(co_const[i]) == type(code_object):
      file.write("  "+filename +"Const["+str(i)+"] = "+print_nice(decompile(co_const[i]))+"\n")
    else:
      file.write("  "+filename +"Const["+str(i)+"] = \"undefined\" //"+str(co_const[i])+"\n")
  file.write("\nvar "+ filename +" = ")
  file.write(print_nice(instructions))
  file.close()
  print "%s.js created" % (filename)  

def print_nice(instructions):
  result = "[\n"
  i = 0
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    result = result +"   ["+ str(op)            # Opcode value
    if (op >= opcode.HAVE_ARGUMENT):
      result = result +","+ str(argument)  # Argument
      result = result +",\""+ str(argtype) +"\""   # Argument Type
      if type(argvalue) == type("v8 sucks!"):
        argvalue = argvalue.replace("\"","\\\"")
      result = result +",\""+ str(argvalue) +"\""  # Argument Value
    result = result +",\""+ str(name) +"\""      # Name
    result = result +",\""+ str(offset) +"\"],\n"    # Offset
    i = i + 1
  result = result[:len(result)-2] + "];"
  return result



def file_exists(filename):
  try:
    file = open(filename)
  except IOError:
    exists = 0
  else:
    exists = 1
  return exists

main()