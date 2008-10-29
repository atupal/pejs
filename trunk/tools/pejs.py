#!/usr/bin/python
# Input a .py or .pyc file, and a js file with an array
# containing the instructions will be created.
# Each index in the array will correspond to a singe
# instruction, the array is named the same as the python
# file.
# An instruction consists of an array with the following:
# [0] Opcode
# [1] Argument        (Optional)
# [2] Argument Type   (Optional)
# [3] Argument Value  (Optional)
# [4] Opcode name
# [5] Offset
# ----
# codeObject[0] = opcodes
# codeObject[1] = consts
# codeObject[2] = localVars
# codeObject[3] = symTable
#
# [ [ [opcode], [opcode] ] , ["a", "b"] , ["var1", "var2"] , ["var1", "var2"] ]

import sys, py_compile, marshal, opcode, os

# Global variables.
co_const = []
co_names = []
code_object = None

# Handle tedious input details.
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
      #inst = decompile(code_object)
      #js_file_print_trimmed(inst, filename[:len(filename) - 4])
      js_file_print(code_object, filename[:len(filename) - 4])
      print "%s.js created" % (filename[:len(filename) - 4])
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

# Pretty print the instructions.
#def pretty_print(instructions):
#  print '%5s %-20s %3s  %5s  %-20s  %s' % \
#    ('OFFSET', 'INSTRUCTION', 'OPCODE', 'ARG', 'TYPE', 'VALUE')
#  for (offset, op, name, argument, argtype, argvalue) in instructions:
#    print '%5d  %-20s (%3d)  ' % (offset, name, op),
#    if argument != None:
#      print '%5d  %-20s  (%s)' % (argument, argtype, argvalue),
#    print 

# Print js info to stdout from instructions.
#def js_print(instructions, filename):
#  print "var %s = new Array();" % (filename)
#  i = 0
  #for (offset, op, name, argument, argtype, argvalue) in instructions:
    #print "\nvar temp = new Array();"
    #print "  temp[0] = \"%s\";" % (offset)   # Offset
    #print "  temp[1] = \"%s\";" % (op)       # Opcode value
    #print "  temp[2] = \"%s\";" % (name)     # Name
    #print "  temp[3] = \"%s\";" % (argument) # Argument
    #print "  temp[4] = \"%s\";" % (argtype)  # Argument Type
    #if type(argvalue) == type("v8 sucks!"):
      #argvalue = argvalue.replace("\"","\\\"")
    #print "  temp[5] = \"%s\";" % (argvalue) # Argument Value
    #print "  %s[%d] = temp;" % (filename, i)
    #i = i + 1

# Print js info to file from instructions.
#def js_file_print(instructions, filename):
  #file = open(filename + ".js", 'w')
  #file.write("var "+ filename +" = new Array();\n")
  #i = 0
  #for (offset, op, name, argument, argtype, argvalue) in instructions:
    #file.write("\nvar temp = new Array();\n")
    #file.write("  temp[0] = \""+ str(offset) +"\";\n")    # Offset
    #file.write("  temp[1] = \""+ str(op) +"\";\n")        # Opcode value
    #file.write("  temp[2] = \""+ str(name) +"\";\n")      # Name
    #file.write("  temp[3] = \""+ str(argument) +"\";\n")  # Argument
    #file.write("  temp[4] = \""+ str(argtype) +"\";\n")   # Argument Type
    #if type(argvalue) == type("v8 sucks!"):
      #argvalue = argvalue.replace("\"","\\\"")
    #file.write("  temp[5] = \""+ str(argvalue) +"\";\n")  # Argument Value
    #file.write("  "+ filename +"["+ str(i) +"] = temp;\n")
    #i = i + 1
  #file.close()
  #print "%s.js created" % (filename)

def js_file_print(code_object, filename):
  file = open(filename + ".js", 'w')
  file.write("var "+filename+" =\n")
  file.write(print_code(code_object, "")+";")
  file.close()

def print_code(code_object, indent):
  instructions = decompile(code_object)

  # codeObject[0] = opcodes
  # codeObject[1] = consts
  # codeObject[2] = localVars
  # codeObject[3] = symTable
  result = indent+"[ //Code object\n"
  result = result + print_instructions(instructions, indent + "  ")+",\n" #code_object[0] = opcodes
  result = result + print_consts(code_object.co_consts, indent + "  ")+",\n"  #consts
  result = result + indent + "  " + "[], //Local vars\n"  #localVars
  result = result + print_names(code_object.co_names, indent + "  ") #symTable
  result = result + indent + "]"
  return result

def print_names(names, indent):
  result = indent + "[ //Symbol table\n"
  i = 0
  for (name) in names:
    result = result + indent + "  " + "\"" + name +"\",\n"
    i = i + 1
  if i > 0:
    result = result[:len(result)-2]
  return result + "\n" + indent + "]\n"

def print_consts(consts, indent):
  result = indent + "[ //Constants\n"
  i = 0
  for (const) in consts:
    if type(const) == type(""):
      result = result + indent + "  " + "\""+ const.replace("\"","\\\"") + "\",\n"
    elif type(const) == type(42):
      result = result + indent + "  " + str(const) + ",\n"
    elif type(const) == type(None):
      result = result + indent + "  " + "\"" + str(const) + "\"" + ",\n"
    elif type(const) == type(code_object):
      result = result  + print_code(const, indent + "  ") + ",\n"
    else:
      result = result + indent + "  " + str(const) + ",\n"
    i = i + 1
  if i > 0:
    result = result[:len(result) - 2]
  return result + "\n" + indent +"]"

# Helper method to create arraystring from instructions.
def print_instructions(instructions, indent):
  result = indent + "[ //Instructions\n"
  i = 0
  for (offset, op, name, argument, argtype, argvalue) in instructions:
    result = result + indent +"  ["+ str(op)              # Opcode value
    if (op >= opcode.HAVE_ARGUMENT):
      result = result +","+ str(argument)         # Argument
      result = result +",\""+ str(argtype) +"\""  # Argument Type
      if type(argvalue) == type("v8 sucks!"):
        argvalue = argvalue.replace("\"","\\\"")
      result = result +",\""+ str(argvalue) +"\"" # Argument Value
    result = result +",\""+ str(name) +"\""       # Name
    result = result +","+ str(offset) +"],\n" # Offset
    i = i + 1
  return result[:len(result)-2] + "\n" + indent + "]"

# Print js info to file from instructions.
# Output in more efficient format compared to
# js_file_print().
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
  i = 0
  for (name) in co_names:
    file.write("  "+ filename +"Names["+str(i)+"] = \""+ name +"\";\n")
    i = i + 1
  file.write("\nvar "+ filename +"Const = new Array();\n")
  i = 0
  for (const) in co_const:
    if type(const) == type(""):
      file.write("  "+filename +"Const["+str(i)+"] = \""+const.replace("\"","\\\"")+"\";\n")
    elif type(const) == type(42):
      file.write("  "+filename +"Const["+str(i)+"] = "+str(const)+";\n")
    elif type(const) == type(None):
      file.write("  "+filename +"Const["+str(i)+"] = \""+str(const)+"\";\n")
    elif type(const) == type(code_object):
      file.write("  "+filename +"Const["+str(i)+"] = ["+print_code_object(decompile(const))+";\n")
    else:
      file.write("  "+filename +"Const["+str(i)+"] = \"undefined\" //"+str(const)+";\n")
    i = i + 1
  file.write("\nvar "+ filename +" = ")
  file.write(print_nice(instructions) + ";")
  file.close()
  print "%s.js created" % (filename)



def print_code_object(code_object):
  global co_const
  global co_names
  result = print_instructions(code_object)+", ["
  
  i = 0
  for (name) in co_names:
    result = result + "\""+name + "\", "
    i = i + 1
  if i > 0:
    result = result[:len(result) - 2]
  result = result + "], ["
  i = 0
  for (const) in co_const:
    if type(const) == type(""):
      result = result + "\""+ const.replace("\"","\\\"") + "\", "
    elif type(const) == type(42):
      result = result + str(const) + ", "
    elif type(const) == type(None):
      result = result + "\"" + str(const) + "\"" + ", "
    elif type(const) == type(code_object):
      result = result + print_code_object(decompile(const)) + ", "
    else:
      result = result + str(const) + ", "
    i = i + 1
  if i > 0:
    result = result[:len(result) - 2]
  result = result +"]]"
  return result

# Boolean file_exist test.
def file_exists(filename):
  try:
    file = open(filename)
  except IOError:
    exists = 0
  else:
    exists = 1
  return exists

main()