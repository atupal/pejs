list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
result = 0
result = result + list[:][4] #4=4
result = result + list[3:][1] #4+4=8
result = result + list[0:6][5] #8+5=13
result = result + list[:6][4] #13+4=17
result = result + list[20:][0] #17+20=37
result = result + list[5:6][0] #37+5=42

print result
