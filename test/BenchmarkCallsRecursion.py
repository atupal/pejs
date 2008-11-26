class Recursion:

    version = 2.0
    operations = 5
    rounds = 10#0000

    def test(self):

        global f

        def f(x):

            if x > 1:
                return f(x-1)
            return 1

        for i in xrange(self.rounds):
            f(10)
            f(10)
            f(10)
            f(10)
            f(10)

Recursion().test()

print 42