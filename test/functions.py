def one():
  return 1
  
def two():
  return 2

def add(left, right):
  return left + right

three = add(one(), two())

def inc(value):
  return value + one()

def four():
  return inc(three)

print str(four()) + str(two())
