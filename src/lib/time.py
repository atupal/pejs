def time(self):
  timeStamp = 0
  exec "(new Date()).getTime()" in "JavaScript", "timeStamp"
  return timeStamp