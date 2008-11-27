class CompareInternedStrings:

    version = 2.0
    operations = 10 * 5
    rounds = 30#0000

    def test(self):

        # Make sure the strings *are* interned
        s = intern(join(map(str,range(10))))
        t = s

        for i in xrange(self.rounds):
            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

            t == s
            t == s
            t >= s
            t > s
            t < s

CompareInternedStrings().test()

print 42