class WithRaiseExcept:

    version = 2.0
    operations = 2 + 3 + 3
    rounds = 10#0000

    class BlockExceptions(object):
        def __enter__(self):
            pass
        def __exit__(self, exc, val, tb):
            return True

    def test(self):

        error = ValueError
        be = self.BlockExceptions()

        for i in xrange(self.rounds):
            with be: raise error
            with be: raise error
            with be: raise error,"something"
            with be: raise error,"something"
            with be: raise error,"something"
            with be: raise error("something")
            with be: raise error("something")
            with be: raise error("something")

WithRaiseExcept().test()

print 42