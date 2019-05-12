from compose.cli.main import main
import sys
import os
import io

def sysExitFake(dumbCode=0):
    return None

def runComposeCli(args, path='.', logger=None, collectOutput=False):
    cwd = os.getcwd()
    os.chdir(path)
    sys.argv = ['docker-compose'] + args
    if logger:
        logger.info('Running docker-compose command: {}'.format(' '.join(sys.argv)))

    stdout = sys.stdout
    stdoutFake = None
    sysexit = sys.exit

    if collectOutput:
        stdoutFake = io.StringIO("")
        sys.stdout = stdoutFake

    sys.exit = sysExitFake

    res = main()

    sys.stdout = stdout
    sys.exit = sysexit
    os.chdir(cwd)

    if collectOutput:
        res = stdoutFake.getvalue()

    return res
