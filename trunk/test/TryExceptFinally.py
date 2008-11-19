i = 0


try:
  try:
    i = i + 10
    raise
    i = i + 100
  except:
    i = i + 10
finally:
  i = i + 10


try:
  try:
    i = i + 10
  except:
    i = i + 100
finally:
  i = i + 2
print i

