class TryRaiseExcept:

    version = 2.0
    operations = 2 + 3 + 3
    rounds = 8#0000

    def test(self):

        error = ValueError

        for i in xrange(self.rounds):
            try:
                raise error
            except:
                pass
            try:
                raise error
            except:
                pass
            try:
                raise error,"something"
            except:
                pass
            try:
                raise error,"something"
            except:
                pass
            try:
                raise error,"something"
            except:
                pass
            try:
                raise error("something")
            except:
                pass
            try:
                raise error("something")
            except:
                pass
            try:
                raise error("something")
            except:
                pass

TryRaiseExcept().test()

print 42