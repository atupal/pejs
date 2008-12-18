result = 0

list = [0,1]
del list[:]
if (len(list) > 0):
  print 123

list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
del list[15:]
del list[:5]
del list[5:7]
print list[1]+list[2]+list[3]+list[4]+list[5]
