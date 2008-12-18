class CreateUnicodeWithConcat:

    version = 2.0
    operations = 10 * 5
    rounds = 8#0000

    def test(self):

        for i in xrange(self.rounds):
            s = u'om'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

            s = s + u'xax'
            s = s + u'xbx'
            s = s + u'xcx'
            s = s + u'xdx'
            s = s + u'xex'

CreateUnicodeWithConcat().test()

print 42