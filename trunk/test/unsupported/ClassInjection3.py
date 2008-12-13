class MyClass:
  x = 30

obj = MyClass()

MyClass.x = 10 #Update should be pushed to all instances
MyClass.y = 20

def a(self):
  return 12

MyClass.fun = a

print obj.x + obj.y + obj.fun() 
