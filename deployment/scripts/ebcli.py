from ebcli.core.ebcore import main
import sys

def runEBCli(args, logger=None):
    sys.argv = ['eb'] + args
    if logger:
        logger.info('Running AWS Beanstalk command: {}'.format(sys.argv))
    return main()
