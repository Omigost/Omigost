import click
import json
import os.path
from scripts.logger import createLogger, setLoggerLevel
from scripts.generate_config import generateConfig
from scripts.ebcli import runEBCli

@click.command()
@click.argument('profile')
@click.option('--keyEnv', '-k', default='AWS_KEY', help='Environment variable that stores AWS key')
@click.option('--secretEnv', '-s', default='AWS_SECRET', help='Environment variable that stores AWS key')
@click.option('--path', '-p', default='.', help='Path to deployment profiles directory')
@click.option('--loggingLevel', '-l', default='INFO', type=click.Choice(['INFO', 'DEBUG']), help='Set logging level')
@click.option('--outputJSON', '-o', default='Dockerrun.aws.json', help='File to store Dockerrun.aws.json config')
@click.option('--dry', '-d', type=bool, default=False, help="Perform only configuration generation, save it and do not deploy anything")
@click.option('--newEnvName', '-env', default='omigost', help="Set the name of new EB environment")
@click.option('--createNewEnv', '-e', default=True, help="Create new EB environment")
@click.option('--newEnvInstance', '-i', default='t3.medium', help="Instance type for which new environment is created")
@click.option('--newEnvOptions', '-envopt', default='[]', help="Additional options passed to EB Cli when creating new environment")
@click.option('--cli', '-c', default=False, help='Enable non-interactive CLI mode')
def runCli(
        profile, keyenv, secretenv, path, logginglevel, outputjson, dry,
        newenvname, createnewenv, newenvinstance, newenvoptions, cli
    ):
    logger = createLogger('deploy.py')
    logger = setLoggerLevel(logger, logginglevel)
    with open('{}/{}'.format(path, outputjson), 'w') as the_file:
        the_file.write(generateConfig(profile, path=path, logger=logger, secretEnv=secretenv, keyEnv=keyenv))
    if dry:
        logger.info('Dry mode is active. Nothing to do.')
        return

    if createnewenv:

        hasEBDirectory = os.path.exists('{}/.elasticbeanstalk'.format(path))
        if not hasEBDirectory:
            logger.log('EB configuration was not detected. EB will be initialized.')
            runEBCli(['init', 'Omigost', '-p', '"Multi-container Docker"'], path=path, logger=logger)

        createEnvCommand = ['create', newenvname]
        if newenvinstance:
            createEnvCommand = createEnvCommand + ['-i', newenvinstance]
        if newenvoptions:
            try:
                opts = json.loads(newenvoptions)
                createEnvCommand = createEnvCommand + opts
            except:
                raise Exception('Invalid --newEnvOptions parameter. It should be JSON array containing Cli options')

        listOutput = runEBCli(['list'], path=path, logger=logger, collectOutput=True)
        envAlreadyExists = False
        ebEnvs = listOutput.splitlines()
        for env in ebEnvs:
            normalizedName = env.replace('* ', '').replace(' ', '')
            if normalizedName == newenvname:
                envAlreadyExists = True

        if envAlreadyExists:
            logger.info('Environment {} already exists so --createNewEnv flags has no effect.'.format(newenvname))
            runEBCli(['use', newenvname], path=path, logger=logger)
        else:
            runEBCli(createEnvCommand, path=path, logger=logger)

    runEBCli(['deploy'], path=path, logger=logger)

    # eb open fails :(
    #if not cli:
    #    runEBCli(['open'], path=path, logger=logger)
runCli()
