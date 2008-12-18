class MyObject:  
  def a(self):
    return 100
      
      
def a2():
  return 20
 
def b2():
  return 22 

obj1 = MyObject()
obj2 = MyObject()

obj1.a = a2
obj1.b = b2

if obj2.a() != 100:
  print 123

print obj1.a() + obj1.b()