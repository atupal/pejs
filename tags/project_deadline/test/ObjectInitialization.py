class MyObject:
  myField = ""
  def __init__(self, arg1, arg2):
    self.myField = arg1 + arg2

print MyObject("4", "2").myField
