class Super:
  super1 = 5
  super2 = 10
  
class Sub(Super):
  super2 = 37
  
print Sub().super1 + Sub().super2