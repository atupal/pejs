class StringPredicates(Test):

    version = 2.0
    operations = 10 * 7
    rounds = 100000

    def test(self):

	data = ('abc', '123', '   ', '\xe4\xf6\xfc', '\xdf'*10)
	len_data = len(data)

	for i in xrange(self.rounds):
	    s = data[i % len_data]

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

	    s.isalnum()
	    s.isalpha()
	    s.isdigit()
	    s.islower()
	    s.isspace()
	    s.istitle()
	    s.isupper()

StringPredicates().test()

print 42