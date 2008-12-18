tuple = (0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20)
result = 0
result = result + tuple[:][4] #4=4
result = result + tuple[3:][1] #4+4=8
result = result + tuple[0:6][5] #8+5=13
result = result + tuple[:6][4] #13+4=17
result = result + tuple[20:][0] #17+20=37
result = result + tuple[5:6][0] #37+5=42

print result
