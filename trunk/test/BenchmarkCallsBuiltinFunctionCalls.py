class BuiltinFunctionCalls:

    version = 2.0
    operations = 5*(2+5+5+5)
    rounds = 60#000

    def test(self):

        # localize functions
        f0 = globals
        f1 = hash
        f2 = cmp
        f3 = range

        # do calls
        for i in xrange(self.rounds):

            f0()
            f0()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)

            f0()
            f0()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)

            f0()
            f0()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)

            f0()
            f0()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)

            f0()
            f0()
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f1(i)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f2(1,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)
            f3(1,3,2)

BuiltinFunctionCalls().test()

print 42