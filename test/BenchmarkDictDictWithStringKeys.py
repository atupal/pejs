class DictWithStringKeys:

    version = 2.0
    operations = 5*(6 + 6)
    rounds = 20#0000

    def test(self):

        d = {}

        for i in xrange(self.rounds):

            d['abc'] = 1
            d['def'] = 2
            d['ghi'] = 3
            d['jkl'] = 4
            d['mno'] = 5
            d['pqr'] = 6

            d['abc']
            d['def']
            d['ghi']
            d['jkl']
            d['mno']
            d['pqr']

            d['abc'] = 1
            d['def'] = 2
            d['ghi'] = 3
            d['jkl'] = 4
            d['mno'] = 5
            d['pqr'] = 6

            d['abc']
            d['def']
            d['ghi']
            d['jkl']
            d['mno']
            d['pqr']

            d['abc'] = 1
            d['def'] = 2
            d['ghi'] = 3
            d['jkl'] = 4
            d['mno'] = 5
            d['pqr'] = 6

            d['abc']
            d['def']
            d['ghi']
            d['jkl']
            d['mno']
            d['pqr']

            d['abc'] = 1
            d['def'] = 2
            d['ghi'] = 3
            d['jkl'] = 4
            d['mno'] = 5
            d['pqr'] = 6

            d['abc']
            d['def']
            d['ghi']
            d['jkl']
            d['mno']
            d['pqr']

            d['abc'] = 1
            d['def'] = 2
            d['ghi'] = 3
            d['jkl'] = 4
            d['mno'] = 5
            d['pqr'] = 6

            d['abc']
            d['def']
            d['ghi']
            d['jkl']
            d['mno']
            d['pqr']

DictWithStringKeys().test()

print 42
