from string import join

class CompareUnicode:

    version = 2.0
    operations = 10 * 5
    rounds = 15#0000

    def test(self):

        # Make sure the strings are *not* interned
        s = unicode(join(map(str,range(10))))
        t = unicode(join(map(str,range(10))) + "abc")

        for i in xrange(self.rounds):
            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

            t < s
            t > s
            t == s
            t > s
            t < s

CompareUnicode().test()

print 42