
class c:
  x = 2
  s = 'string'

  def f(self):
    return self.x

  def j(self,a,b):
    self.y = a
    self.t = b
    return self.y

  def k(self,a,b,c=3):
    self.y = a
    self.s = b
    self.t = c

o = c()

i = 3

o.f()
o.j(i,i)
o.j(i,2)
o.j(2,2)
o.k(i,i)
o.k(i,2)
o.k(i,2,3)
o.k(i,i,c=4)

print 42