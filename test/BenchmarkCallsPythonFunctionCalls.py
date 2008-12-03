class PythonFunctionCalls:

    version = 2.0
    operations = 5*(1+4+4+2)
    rounds = 120 #60#000

    def test(self):

        global f,f1,g,h

        # define functions
        def f():
            pass

        def f1(x):
            pass

        def g(a,b,c):
            return a,b,c

        def h(a,b,c,d=1,e=2,f=3):
            return d,e,f

        # do calls
        for i in xrange(self.rounds):

            f()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            h(i,i,3,i,i)
            h(i,i,i,2,i,3)

            f()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            h(i,i,3,i,i)
            h(i,i,i,2,i,3)

            f()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            h(i,i,3,i,i)
            h(i,i,i,2,i,3)

            f()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            h(i,i,3,i,i)
            h(i,i,i,2,i,3)

            f()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            g(i,i,i)
            h(i,i,3,i,i)
            h(i,i,i,2,i,3)

PythonFunctionCalls().test()

print 42