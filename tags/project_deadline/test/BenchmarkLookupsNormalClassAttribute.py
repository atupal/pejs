class NormalClassAttribute:
    version = 2.0
    operations = 5*(12 + 12)
    rounds = 1000#00

    def test(self):
        class c:
            pass

        for i in xrange(self.rounds):
            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4


            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4


            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4


            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4


            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4

            c.a = 2
            c.b = 3
            c.c = 4


            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

            x = c.a
            x = c.b
            x = c.c

NormalClassAttribute().test()

print 42