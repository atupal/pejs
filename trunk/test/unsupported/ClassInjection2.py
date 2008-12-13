class MyClass:
  pass

obj = MyClass()

MyClass.x = 10
MyClass.y = 1000
MyClass.y = 20

def a(self):
  return 12

MyClass.fun = a

print obj.x + obj.y + obj.fun() 
