class Super0:
  def super1(self):
    return 10
  def super2(self):
    return 500

class Super1(Super0):
  def super2(self):
    return 12
  
class Super2:
  def super1(self):
    return 800
  def super2(self):
    return 1200
  def super3(self):
    return 20
  
class Sub(Super1, Super2):
  pass
  
print Sub().super1() + Sub().super2() + Sub().super3()