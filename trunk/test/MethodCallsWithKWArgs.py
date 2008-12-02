class c:
  def m(self,a,b,c=3):
    return a+b-c;

result = c().m(4,9)
result = result + c().m(1,17,8)
result = result + c().m(2,14,c=6)
result = result + c().m(b=18,c=8,a=2)

print result
