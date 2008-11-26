class SimpleLongArithmetic:

    version = 2.0
    operations = 5 * (3 + 5 + 5 + 3 + 3 + 3)
    rounds = 60#000

    def test(self):

        for i in xrange(self.rounds):

            a = 2220001L
            b = 100001L
            c = 30005L

            c = a + b
            c = b + c
            c = c + a
            c = a + b
            c = b + c

            c = c - a
            c = a - b
            c = b - c
            c = c - a
            c = b - c

            c = a / b
            c = b / a
            c = c / b

            c = a * b
            c = b * a
            c = c * b

            c = a / b
            c = b / a
            c = c / b

            a = 2220001L
            b = 100001L
            c = 30005L

            c = a + b
            c = b + c
            c = c + a
            c = a + b
            c = b + c

            c = c - a
            c = a - b
            c = b - c
            c = c - a
            c = b - c

            c = a / b
            c = b / a
            c = c / b

            c = a * b
            c = b * a
            c = c * b

            c = a / b
            c = b / a
            c = c / b

            a = 2220001L
            b = 100001L
            c = 30005L

            c = a + b
            c = b + c
            c = c + a
            c = a + b
            c = b + c

            c = c - a
            c = a - b
            c = b - c
            c = c - a
            c = b - c

            c = a / b
            c = b / a
            c = c / b

            c = a * b
            c = b * a
            c = c * b

            c = a / b
            c = b / a
            c = c / b

            a = 2220001L
            b = 100001L
            c = 30005L

            c = a + b
            c = b + c
            c = c + a
            c = a + b
            c = b + c

            c = c - a
            c = a - b
            c = b - c
            c = c - a
            c = b - c

            c = a / b
            c = b / a
            c = c / b

            c = a * b
            c = b * a
            c = c * b

            c = a / b
            c = b / a
            c = c / b

            a = 2220001L
            b = 100001L
            c = 30005L

            c = a + b
            c = b + c
            c = c + a
            c = a + b
            c = b + c

            c = c - a
            c = a - b
            c = b - c
            c = c - a
            c = b - c

            c = a / b
            c = b / a
            c = c / b

            c = a * b
            c = b * a
            c = c * b

            c = a / b
            c = b / a
            c = c / b

SimpleLongArithmetic().test()

print 42