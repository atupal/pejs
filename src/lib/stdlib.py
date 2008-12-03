True = 1
False = 0

class object:
  pass

def intern(str):
  return str

def str(value):
  return value + ""

def range(start, end=-1):
  if end == -1:
    end = start
    start = 0
  list = []
  for i in xrange(start,end):
    list.append(i)
  return list

def xrange(start, stop=-1, step=1):
  result = []
  if stop == -1:
    exec "new PyXRange(0,"+start+","+step+");" in "JavaScript", "result"
  else:
    exec "new PyXRange("+start+","+stop+","+step+");" in "JavaScript", "result"
  return result

def iter(iterable):
  return iterable.__iter__()

def list(tuple):
  list = []
  for i in tuple:
    list.append(i)
  return list

def tuple(list):
  result = ()
  exec "new PyTuple("+list+");" in "JavaScript", "result"
  return result

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
  return list.__len__()

#class Exception:
#  message = "42"
