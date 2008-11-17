class MyClass:
  x = "4"

  def myFunct2(self):
    return "2"

  def myFunct(self):
    return self.x + self.myFunct2()

obj = MyClass()
print obj.myFunct()