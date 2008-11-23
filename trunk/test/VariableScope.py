x = 100
y = 10

def fun1():
  global x
  x = x - 90
  z = 100

def fun2():
  y = 100
  z = 123

fun1()

print x + x + y + y + 2