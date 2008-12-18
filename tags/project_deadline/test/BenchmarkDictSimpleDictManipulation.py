class SimpleDictManipulation:

    version = 2.0
    operations = 5*(6 + 6 + 6 + 6)
    rounds = 1000#00

    def test(self):

        d = {}
        has_key = d.has_key

        for i in xrange(self.rounds):

            d[0] = 3
            d[1] = 4
            d[2] = 5
            d[3] = 3
            d[4] = 4
            d[5] = 5

            x = d[0]
            x = d[1]
            x = d[2]
            x = d[3]
            x = d[4]
            x = d[5]

            has_key(0)
            has_key(2)
            has_key(4)
            has_key(6)
            has_key(8)
            has_key(10)

            del d[0]
            del d[1]
            del d[2]
            del d[3]
            del d[4]
            del d[5]

            d[0] = 3
            d[1] = 4
            d[2] = 5
            d[3] = 3
            d[4] = 4
            d[5] = 5

            x = d[0]
            x = d[1]
            x = d[2]
            x = d[3]
            x = d[4]
            x = d[5]

            has_key(0)
            has_key(2)
            has_key(4)
            has_key(6)
            has_key(8)
            has_key(10)

            del d[0]
            del d[1]
            del d[2]
            del d[3]
            del d[4]
            del d[5]

            d[0] = 3
            d[1] = 4
            d[2] = 5
            d[3] = 3
            d[4] = 4
            d[5] = 5

            x = d[0]
            x = d[1]
            x = d[2]
            x = d[3]
            x = d[4]
            x = d[5]

            has_key(0)
            has_key(2)
            has_key(4)
            has_key(6)
            has_key(8)
            has_key(10)

            del d[0]
            del d[1]
            del d[2]
            del d[3]
            del d[4]
            del d[5]

            d[0] = 3
            d[1] = 4
            d[2] = 5
            d[3] = 3
            d[4] = 4
            d[5] = 5

            x = d[0]
            x = d[1]
            x = d[2]
            x = d[3]
            x = d[4]
            x = d[5]

            has_key(0)
            has_key(2)
            has_key(4)
            has_key(6)
            has_key(8)
            has_key(10)

            del d[0]
            del d[1]
            del d[2]
            del d[3]
            del d[4]
            del d[5]

            d[0] = 3
            d[1] = 4
            d[2] = 5
            d[3] = 3
            d[4] = 4
            d[5] = 5

            x = d[0]
            x = d[1]
            x = d[2]
            x = d[3]
            x = d[4]
            x = d[5]

            has_key(0)
            has_key(2)
            has_key(4)
            has_key(6)
            has_key(8)
            has_key(10)

            del d[0]
            del d[1]
            del d[2]
            del d[3]
            del d[4]
            del d[5]

SimpleDictManipulation().test()

print 42