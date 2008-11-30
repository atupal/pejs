dict = {1:2,3:4,5:6,7:8,9:10,11:12}

result = 0
if dict.has_key(2):
  result = result + 123
if dict.has_key(9):
  result = result + dict[1]

copy1 = dict.copy()
if copy1.has_key(5):
  result = result + copy1[3]

copy1.clear()
if copy1.has_key(5):
  result = result + 123

if len(dict.items()) == 6:
  result = result + dict[5]

if len(dict.keys()) == 6:
  result = result + dict[7]

if len(dict.values()) == 6:
  result = result + dict[9]

dict.update({3:1,5:2,7:3,8:4,11:5})
result = result + dict.get(1,123)
result = result + dict.get(123,1)
result = result + dict.setdefault(5)
result = result + dict.pop(7)
result = result + dict.pop(8)

print result
