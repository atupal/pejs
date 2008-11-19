def rec(n):
  if n == 0:
    return 1
  else:
    return rec(n-1) + rec(n-1)
  
print rec(5) + 10
  
