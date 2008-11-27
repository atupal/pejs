from string import join

class UnicodeMappings:

    version = 2.0
    operations = 3 * (5 + 4 + 2 + 1)
    rounds = 1#0000

    def test(self):

        s = join(map(unichr,range(20)),'')
        t = join(map(unichr,range(100)),'')
        u = join(map(unichr,range(500)),'')
        v = join(map(unichr,range(1000)),'')

        for i in xrange(self.rounds):

            s.lower()
            s.lower()
            s.lower()
            s.lower()
            s.lower()

            s.upper()
            s.upper()
            s.upper()
            s.upper()
            s.upper()

            s.title()
            s.title()
            s.title()
            s.title()
            s.title()

            t.lower()
            t.lower()
            t.lower()
            t.lower()

            t.upper()
            t.upper()
            t.upper()
            t.upper()

            t.title()
            t.title()
            t.title()
            t.title()

            u.lower()
            u.lower()

            u.upper()
            u.upper()

            u.title()
            u.title()

            v.lower()

            v.upper()

            v.title()

UnicodeMappings().test()

print 42