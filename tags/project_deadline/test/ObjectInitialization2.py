class MyObject:
  myField = ""
  def __init__(self, arg):
    self.myField = arg

obj1 = MyObject("4")
obj2 = MyObject("2")
print obj1.myField + obj2.myField
