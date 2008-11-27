class TryFinally:

    version = 2.0
    operations = 20
    rounds = 8#0000

    class ContextManager(object):
        def __enter__(self):
            pass
        def __exit__(self):
            # "Context manager" objects used just for their cleanup
            # actions in finally blocks usually don't have parameters.
            pass

    def test(self):

        cm = self.ContextManager()

        for i in xrange(self.rounds):
            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

            cm.__enter__()
            try: pass
            finally: cm.__exit__()

TryFinally().test()

print 42