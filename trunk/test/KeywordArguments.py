def f(a,b,c,d=1,e=2,f=3):
  return a-b+c-d+e-f

args = 1,2
def fun(a,b,*tuple,**dict):
  return a+b+tuple[0]+dict["m"]

kwargs = dict(c=3,d=4,e=5)

result = f(a=3,b=1,c=9)
result = result + f(f=3,e=9,d=2,c=8,b=0,a=6)
result = result + f(6,b=3,**kwargs)
result = result + f(*args,**kwargs)
result = result + f(2,*(3,4))

print result + fun(1,2,4,6,m=3,f=2,g=5)
