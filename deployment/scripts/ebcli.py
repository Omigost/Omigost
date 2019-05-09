from ebcli.core.ebcore import main
import sys
import os
import io

def sysExitFake(dumbCode):
    return None

def runEBCli(args, path='.', logger=None, collectOutput=False):
    cwd = os.getcwd()
    os.chdir(path)
    sys.argv = ['eb'] + args
    if logger:
        logger.info('Running AWS Beanstalk command: {}'.format(' '.join(sys.argv)))

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
