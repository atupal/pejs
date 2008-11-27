class WithFinally:

    version = 2.0
    operations = 20
    rounds = 8#0000

    class ContextManager(object):
        def __enter__(self):
            pass
        def __exit__(self, exc, val, tb):
            pass

    def test(self):

        cm = self.ContextManager()

        for i in xrange(self.rounds):
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass
            with cm: pass

WithFinally().test()

print 42