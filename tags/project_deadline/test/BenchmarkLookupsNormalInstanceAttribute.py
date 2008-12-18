class NormalInstanceAttribute:

    version = 2.0
    operations = 5*(12 + 12)
    rounds = 1000#00

    def test(self):

        class c:
            pass
        o = c()

        for i in xrange(self.rounds):

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4


            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4


            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4


            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4


            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4

            o.a = 2
            o.b = 3
            o.c = 4


            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

            x = o.a
            x = o.b
            x = o.c

NormalInstanceAttribute().test()

print 42