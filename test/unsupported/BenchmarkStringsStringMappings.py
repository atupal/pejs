from string import join

class StringMappings:

    version = 2.0
    operations = 3 * (5 + 4 + 2 + 1)
    rounds = 7#0000

    def test(self):

	s = join(map(chr,range(20)),'')
	t = join(map(chr,range(50)),'')
	u = join(map(chr,range(100)),'')
	v = join(map(chr,range(256)),'')

	for i in xrange(self.rounds):

	    s.lower()
	    s.lower()
	    s.lower()
	    s.lower()
	    s.lower()

	    s.upper()
	    s.upper()
	    s.upper()
	    s.upper()
	    s.upper()

	    s.title()
	    s.title()
	    s.title()
	    s.title()
	    s.title()

	    t.lower()
	    t.lower()
	    t.lower()
	    t.lower()

	    t.upper()
	    t.upper()
	    t.upper()
	    t.upper()

	    t.title()
	    t.title()
	    t.title()
	    t.title()

	    u.lower()
	    u.lower()

	    u.upper()
	    u.upper()

	    u.title()
	    u.title()

	    v.lower()

	    v.upper()

	    v.title()

StringMappings().test()

print 42