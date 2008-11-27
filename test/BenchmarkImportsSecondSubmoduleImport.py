#First import:
import package.submodule

class SecondSubmoduleImport:

    version = 2.0
    operations = 5 * 5
    rounds = 40000

    def test(self):

        for i in xrange(self.rounds):
            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule

            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule

            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule

            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule

            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule
            import package.submodule

SecondSubmoduleImport().test()

print 42