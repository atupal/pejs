class SpecialClassAttribute:

    version = 2.0
    operations = 5*(12 + 12)
    rounds = 1000#00

    def test(self):

        class c:
            pass

        for i in xrange(self.rounds):

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            c.__a = 2
            c.__b = 3
            c.__c = 4

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

            x = c.__a
            x = c.__b
            x = c.__c

SpecialClassAttribute().test()

print 42