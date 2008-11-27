class ListSlicing:

    version = 2.0
    operations = 25*(3+1+2+1)
    rounds = 8#00

    def test(self):

        n = range(100)
        r = range(25)

        for i in xrange(self.rounds):

            l = n[:]

            for j in r:

                m = l[50:]
                m = l[:25]
                m = l[50:55]
                l[:3] = n
                m = l[:-1]
                m = l[1:]
                l[-1:] = n

ListSlicing().test()

print 42