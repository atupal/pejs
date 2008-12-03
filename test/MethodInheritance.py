class Super:
  def super1(self):
    return 5
  def super2(self):
    return 10
  
class Sub(Super):
  def super2(self):
    return 37
  
print Sub().super1() + Sub().super2()