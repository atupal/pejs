True = 1
False = 0

def str(value):
  return value + ""

def range(start, end = -1):
  if end == -1:
    return (0, start)
  else:
    return (start, end)

def xrange(start, end = -1):
  return range(start, end)

#works for numbers only...
def hash(arg):
  return arg

#Dummy implementation
def globals():
  return ""

#works for numbers only...
def cmp (x, y):
  return x - y

#class Exception():
#  message = "42"