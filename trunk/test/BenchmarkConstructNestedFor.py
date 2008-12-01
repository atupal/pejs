class NestedForLoops:

    version = 2.0
    operations = 1000*10*5
    rounds = 3#00

    def test(self):

        l1 = range(1000)
        l2 = range(10)
        l3 = range(5)
        for i in xrange(self.rounds):
            for i in l1:
                for j in l2:
                    for k in l3:
                        pass
                    
                    
NestedForLoops().test()
print 42
        
        