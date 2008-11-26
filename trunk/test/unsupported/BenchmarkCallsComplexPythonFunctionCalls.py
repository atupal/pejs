class ComplexPythonFunctionCalls:

    version = 2.0
    operations = 4*5
    rounds = 10#0000

    def test(self):

        # define functions
        def f(a,b,c,d=1,e=2,f=3):
            return f

        args = 1,2
        kwargs = dict(c=3,d=4,e=5)

        # do calls
        for i in xrange(self.rounds):
            f(a=i,b=i,c=i)
            f(f=i,e=i,d=i,c=2,b=i,a=3)
            f(1,b=i,**kwargs)
            f(*args,**kwargs)

            f(a=i,b=i,c=i)
            f(f=i,e=i,d=i,c=2,b=i,a=3)
            f(1,b=i,**kwargs)
            f(*args,**kwargs)

            f(a=i,b=i,c=i)
            f(f=i,e=i,d=i,c=2,b=i,a=3)
            f(1,b=i,**kwargs)
            f(*args,**kwargs)

            f(a=i,b=i,c=i)
            f(f=i,e=i,d=i,c=2,b=i,a=3)
            f(1,b=i,**kwargs)
            f(*args,**kwargs)

            f(a=i,b=i,c=i)
            f(f=i,e=i,d=i,c=2,b=i,a=3)
            f(1,b=i,**kwargs)
            f(*args,**kwargs)

ComplexPythonFunctionCalls

print 42