class SmallTuples:

    version = 2.0
    operations = 5*(1 + 3 + 6 + 2)
    rounds = 9#0000

    def test(self):

        for i in xrange(self.rounds):

            t = (1,2,3,4,5,6)

            a,b,c,d,e,f = t
            a,b,c,d,e,f = t
            a,b,c,d,e,f = t

            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]

            l = list(t)
            t = tuple(l)

            t = (1,2,3,4,5,6)

            a,b,c,d,e,f = t
            a,b,c,d,e,f = t
            a,b,c,d,e,f = t

            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]

            l = list(t)
            t = tuple(l)

            t = (1,2,3,4,5,6)

            a,b,c,d,e,f = t
            a,b,c,d,e,f = t
            a,b,c,d,e,f = t

            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]

            l = list(t)
            t = tuple(l)

            t = (1,2,3,4,5,6)

            a,b,c,d,e,f = t
            a,b,c,d,e,f = t
            a,b,c,d,e,f = t

            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]

            l = list(t)
            t = tuple(l)

            t = (1,2,3,4,5,6)

            a,b,c,d,e,f = t
            a,b,c,d,e,f = t
            a,b,c,d,e,f = t

            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]
            a,b,c = t[:3]

            l = list(t)
            t = tuple(l)

SmallTuples().test()

print 42