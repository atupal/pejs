class c:
  def f(self,a,b,c=3,d=4,*tuple,**dict):
    l = a+b+c+d
    return l

print c().f(1,*[2,9],**{"d":6}) + 24 #1+2+9+6=18
