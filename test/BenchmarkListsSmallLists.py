class SmallLists:

    version = 2.0
    operations = 5*(1+ 6 + 6 + 3 + 1)
    rounds = 80#000

    def test(self):

        for i in xrange(self.rounds):

            l = []

            append = l.append
            append(2)
            append(3)
            append(4)
            append(2)
            append(3)
            append(4)

            l[0] = 3
            l[1] = 4
            l[2] = 5
            l[3] = 3
            l[4] = 4
            l[5] = 5

            l[:3] = [1,2,3]
            m = l[:-1]
            m = l[1:]

            l[-1:] = [4,5,6]

            l = []

            append = l.append
            append(2)
            append(3)
            append(4)
            append(2)
            append(3)
            append(4)

            l[0] = 3
            l[1] = 4
            l[2] = 5
            l[3] = 3
            l[4] = 4
            l[5] = 5

            l[:3] = [1,2,3]
            m = l[:-1]
            m = l[1:]

            l[-1:] = [4,5,6]

            l = []

            append = l.append
            append(2)
            append(3)
            append(4)
            append(2)
            append(3)
            append(4)

            l[0] = 3
            l[1] = 4
            l[2] = 5
            l[3] = 3
            l[4] = 4
            l[5] = 5

            l[:3] = [1,2,3]
            m = l[:-1]
            m = l[1:]

            l[-1:] = [4,5,6]

            l = []

            append = l.append
            append(2)
            append(3)
            append(4)
            append(2)
            append(3)
            append(4)

            l[0] = 3
            l[1] = 4
            l[2] = 5
            l[3] = 3
            l[4] = 4
            l[5] = 5

            l[:3] = [1,2,3]
            m = l[:-1]
            m = l[1:]

            l[-1:] = [4,5,6]

            l = []

            append = l.append
            append(2)
            append(3)
            append(4)
            append(2)
            append(3)
            append(4)

            l[0] = 3
            l[1] = 4
            l[2] = 5
            l[3] = 3
            l[4] = 4
            l[5] = 5

            l[:3] = [1,2,3]
            m = l[:-1]
            m = l[1:]

            l[-1:] = [4,5,6]

SmallLists().test()

print 42