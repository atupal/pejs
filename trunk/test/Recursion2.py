def rec1(n):
  if n == 0:
    return 2
  else:
    return rec2(2) + rec1(n-1)
  
def rec2(n):
  if n == 0:
    return 0
  else:
    return one() + rec2(n-1)
  
def one():
  return 1
  
print rec1(20)