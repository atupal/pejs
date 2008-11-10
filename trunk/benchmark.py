#!/usr/bin/python

#t1 = time.time()
class Point:
  x = 2
  def getExtra(self, tal1):
    w = 6
    return w + self.x

myPoint = Point()
print myPoint.getExtra(5)

#t2 = time.time()
#print "Printing 'hello world!' took %d seconds" % (t2-t1)
