True = 1
False = 0

class object:
  pass

def intern(str):
  return str

def str(value):
  return value + ""

def range(start, stop=-1):
  if stop == -1:
    stop = start
    start = 0
  list = []
  for i in xrange(start,stop):
    list.append(i)
  return list

def xrange(start, stop=-1, step=1):
  class XRange:
    def __init__(self,start,stop,step):
      self.fstart = start
      self.fstop = stop
      self.fstep = step
    def next(self):
      if self.fstart < self.fstop:
	self.fstart = self.fstart + self.fstep
	return self.fstart - self.fstep
      raise StopIteration()
    def __getitem__(self,item):
      return self.item
    def __iter__(self):
      return self
  if stop == -1:
    return XRange(0,start,step)
  else:
    return XRange(start,stop,step)

def iter(iterable):
  return iterable.__iter__()

def dict(**dict):
  return dict

def list(tuple):
  list = []
  for i in tuple:
    list.append(i)
  return list

def tuple(list):
  result = ()
  exec "new PEJS.prototype.types.PyTuple("+list+");" in "JavaScript", "result"
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

class Exception:
  message = "42"

class StopIteration(Exception):
  pass