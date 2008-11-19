class MyObject:
  myField = 0
  def __init__(self, arg1, arg2):
    self.myField = arg1 + arg2

obj = MyObject(40, 1)
obj.newField = 1

print obj.myField + obj.newField
