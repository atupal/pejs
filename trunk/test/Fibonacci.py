def fib(n):
  if n == 0:
    return 0
  elif n == 1:
    return 1
  else:
    return fib(n-1) + fib(n-2)
  
#print fib(20) - fib(19) - fib (17) - fib(15) - fib(13) - fib(11) - fib(8) - fib(5) - fib(4)
print fib(4)