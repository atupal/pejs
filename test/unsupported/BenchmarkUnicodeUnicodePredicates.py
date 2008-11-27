from string import join

class UnicodePredicates:

    version = 2.0
    operations = 5 * 9
    rounds = 12#0000

    def test(self):

        data = (u'abc', u'123', u'   ', u'\u1234\u2345\u3456', u'\uFFFF'*10)
        len_data = len(data)

        for i in xrange(self.rounds):
            s = data[i % len_data]

            s.isalnum()
            s.isalpha()
            s.isdecimal()
            s.isdigit()
            s.islower()
            s.isnumeric()
            s.isspace()
            s.istitle()
            s.isupper()

            s.isalnum()
            s.isalpha()
            s.isdecimal()
            s.isdigit()
            s.islower()
            s.isnumeric()
            s.isspace()
            s.istitle()
            s.isupper()

            s.isalnum()
            s.isalpha()
            s.isdecimal()
            s.isdigit()
            s.islower()
            s.isnumeric()
            s.isspace()
            s.istitle()
            s.isupper()

            s.isalnum()
            s.isalpha()
            s.isdecimal()
            s.isdigit()
            s.islower()
            s.isnumeric()
            s.isspace()
            s.istitle()
            s.isupper()

            s.isalnum()
            s.isalpha()
            s.isdecimal()
            s.isdigit()
            s.islower()
            s.isnumeric()
            s.isspace()
            s.istitle()
            s.isupper()

UnicodePredicates().test()

print 42