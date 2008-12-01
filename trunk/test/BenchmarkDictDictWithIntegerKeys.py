class DictWithIntegerKeys:

    version = 2.0
    operations = 5*(6 + 6)
    rounds = 200#000

    def test(self):

        d = {}

        for i in xrange(self.rounds):

            d[1] = 1
            d[2] = 2
            d[3] = 3
            d[4] = 4
            d[5] = 5
            d[6] = 6

            d[1]
            d[2]
            d[3]
            d[4]
            d[5]
            d[6]

            d[1] = 1
            d[2] = 2
            d[3] = 3
            d[4] = 4
            d[5] = 5
            d[6] = 6

            d[1]
            d[2]
            d[3]
            d[4]
            d[5]
            d[6]

            d[1] = 1
            d[2] = 2
            d[3] = 3
            d[4] = 4
            d[5] = 5
            d[6] = 6

            d[1]
            d[2]
            d[3]
            d[4]
            d[5]
            d[6]

            d[1] = 1
            d[2] = 2
            d[3] = 3
            d[4] = 4
            d[5] = 5
            d[6] = 6

            d[1]
            d[2]
            d[3]
            d[4]
            d[5]
            d[6]

            d[1] = 1
            d[2] = 2
            d[3] = 3
            d[4] = 4
            d[5] = 5
            d[6] = 6

            d[1]
            d[2]
            d[3]
            d[4]
            d[5]
            d[6]

DictWithIntegerKeys().test()

print 42