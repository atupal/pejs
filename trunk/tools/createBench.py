#!/usr/bin/python
import pejs, os

def main():
  os.chdir("pejsbench")
  jsstr = "var delayArray = ["
  filelist = os.listdir('.')
  for file in filelist:
    if file.endswith(".py"):
      pejs.main(file)
      jsstr = jsstr +"\""+ file[:len(file) - 3]+"\","

  jsstr = jsstr[:len(jsstr)-1] + "];"
  jsfile = open("test.js", "w")
  jsfile.write(jsstr)
  jsfile.close()
  os.chdir("package")
  filelist = os.listdir('.')
  for file in filelist:
    if file.endswith(".py"):
      pejs.main(file)

main()