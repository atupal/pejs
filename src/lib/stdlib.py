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

#class Exception():
#  message = "42"