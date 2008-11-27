class SpecialInstanceAttribute:

    version = 2.0
    operations = 5*(12 + 12)
    rounds = 10#0000

    def test(self):

        class c:
            pass
        o = c()

        for i in xrange(self.rounds):

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4


            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4


            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4


            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4


            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4

            o.__a__ = 2
            o.__b__ = 3
            o.__c__ = 4


            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

            x = o.__a__
            x = o.__b__
            x = o.__c__

SpecialInstanceAttribute().test()

print 42