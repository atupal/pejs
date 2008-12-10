dict = {"a":1,"b":2,"c":3,"d":4,"e":5}

def incDict(**args):
  args["e"] = args["d"]
  args["d"] = args["c"]
  args["c"] = args["b"]
  args["b"] = args["a"]
  args["a"] = args["a"] - 1

incDict(**dict) #No change to dict
print dict["a"] + dict["b"] + dict["c"] + dict["d"] + dict["e"] + 27