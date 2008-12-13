class MyObject:  
  def a(self):
    return 100
      
      
def a2(self):
  return 20
 
def b2(self):
  return 22 

MyObject.a = a2
MyObject.b = b2

obj = MyObject()

print obj.a() + obj.b()
