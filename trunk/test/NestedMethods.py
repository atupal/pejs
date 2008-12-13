class Test:
  def a(self):
    i = 11
    def b():         
      def c():
        return 23
      return 8 + c()
    return b() + i
  
print Test().a()