class MyClass:
  def __init__(self):
    self.a = 2

result = 0
for i in xrange(21):
  result = result + MyClass().a
    
print result