class Super0:
  field0 = 8
  field1 = 4000
  field2 = 109

class Super1(Super0):
  field1 = 18
  
class Super2:
  field0 = 100
  field1 = 300
  field2 = 3000
  field3 = 16
  
class Sub(Super1, Super2):
  pass
  
print Sub().field0 + Sub().field1 + Sub().field3