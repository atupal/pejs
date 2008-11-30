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

#Apply function to every item of iterable and return a list of the results.
#If additional iterable arguments are passed, function must take that many
#arguments and is applied to the items from all iterables in parallel. If
#one iterable is shorter than another it is assumed to be extended with
#None items. If function  is None, the identity function is assumed; if
#there are multiple arguments, map() returns a list consisting of tuples
#containing the corresponding items from all iterables (a kind of transpose
#operation). The iterable arguments may be a sequence or any iterable object;
#the result is always a list.
def map(function, iterable):
  result = []
  for item in iterable:
    result.append(function(item))
  return result

#works for numbers only...
def hash(arg):
  return arg

#Dummy implementation
def globals():
  return ""

#works for numbers only...
def cmp (x, y):
  return x - y

def len (list):
  return list.len()

#class Exception:
#  message = "42"
