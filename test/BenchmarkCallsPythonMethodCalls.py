class PythonMethodCalls:

    version = 2.0
    operations = 5*(6 + 5 + 4)
    rounds = 60 #30#000

    def test(self):

        class c:

            x = 2
            s = 'string'

            def f(self):

                return self.x

            def j(self,a,b):

                self.y = a
                self.t = b
                return self.y

            def k(self,a,b,c=3):

                self.y = a
                self.s = b
                self.t = c

        o = c()

        for i in xrange(self.rounds):

            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.j(i,i)
            o.j(i,i)
            o.j(i,2)
            o.j(i,2)
            o.j(2,2)
            o.k(i,i)
            o.k(i,2)
            o.k(i,2,3)
            o.k(i,i,c=4)

            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.j(i,i)
            o.j(i,i)
            o.j(i,2)
            o.j(i,2)
            o.j(2,2)
            o.k(i,i)
            o.k(i,2)
            o.k(i,2,3)
            o.k(i,i,c=4)

            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.j(i,i)
            o.j(i,i)
            o.j(i,2)
            o.j(i,2)
            o.j(2,2)
            o.k(i,i)
            o.k(i,2)
            o.k(i,2,3)
            o.k(i,i,c=4)

            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.j(i,i)
            o.j(i,i)
            o.j(i,2)
            o.j(i,2)
            o.j(2,2)
            o.k(i,i)
            o.k(i,2)
            o.k(i,2,3)
            o.k(i,i,c=4)

            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.f()
            o.j(i,i)
            o.j(i,i)
            o.j(i,2)
            o.j(i,2)
            o.j(2,2)
            o.k(i,i)
            o.k(i,2)
            o.k(i,2,3)
            o.k(i,i,c=4)

PythonMethodCalls().test()

print 42