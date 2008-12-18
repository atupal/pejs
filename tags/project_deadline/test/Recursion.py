def rec(n):
  if n == 0:
    return 42
  return rec(n-1)
print rec(5)