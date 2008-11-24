#!/usr/bin/python
import pejs, os

def main():
  #Generate test code
  os.chdir("test")
  jsstr = "var testArray = ["
  filelist = os.listdir('.')
  for file in filelist:
    if file.endswith(".py"):
      pejs.main(file)
      jsstr = jsstr +"\""+ file[:len(file) - 3]+"\","

  jsstr = jsstr[:len(jsstr)-1] + "];"
  jsfile = open("test.js", "w")
  jsfile.write(jsstr)
  jsfile.close()
  
  #Generate library code
  os.chdir("../src/lib")
  jsstr = "var libArray = ["
  filelist = os.listdir('.')
  for file in filelist:
    if file.endswith(".py"):
      pejs.main(file)
      jsstr = jsstr +"\""+ file[:len(file) - 3]+"\","

  jsstr = jsstr[:len(jsstr)-1] + "];"
  jsfile = open("lib.js", "w")
  jsfile.write(jsstr)
  jsfile.close()

main()