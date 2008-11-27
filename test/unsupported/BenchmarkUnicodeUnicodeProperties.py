import unicodedata
 
class UnicodeProperties:

    version = 2.0
    operations = 5 * 8
    rounds = 10#0000

    def test(self):

	data = (u'a', u'1', u' ', u'\u1234', u'\uFFFF')
	len_data = len(data)
	digit = unicodedata.digit
	numeric = unicodedata.numeric
	decimal = unicodedata.decimal
	category = unicodedata.category
	bidirectional = unicodedata.bidirectional
	decomposition = unicodedata.decomposition
	mirrored = unicodedata.mirrored
	combining = unicodedata.combining

	for i in xrange(self.rounds):

	    c = data[i % len_data]

	    digit(c, None)
	    numeric(c, None)
	    decimal(c, None)
	    category(c)
	    bidirectional(c)
	    decomposition(c)
	    mirrored(c)
	    combining(c)

	    digit(c, None)
	    numeric(c, None)
	    decimal(c, None)
	    category(c)
	    bidirectional(c)
	    decomposition(c)
	    mirrored(c)
	    combining(c)

	    digit(c, None)
	    numeric(c, None)
	    decimal(c, None)
	    category(c)
	    bidirectional(c)
	    decomposition(c)
	    mirrored(c)
	    combining(c)

	    digit(c, None)
	    numeric(c, None)
	    decimal(c, None)
	    category(c)
	    bidirectional(c)
	    decomposition(c)
	    mirrored(c)
	    combining(c)

	    digit(c, None)
	    numeric(c, None)
	    decimal(c, None)
	    category(c)
	    bidirectional(c)
	    decomposition(c)
	    mirrored(c)
	    combining(c)

UnicodeProperties().test()

print 42