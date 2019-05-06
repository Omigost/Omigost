import click
import json
import webbrowser
import os.path
from scripts.logger import createLogger, setLoggerLevel
from scripts.generate_config import generateConfig
from scripts.ebcli import runEBCli
from scripts.composecli import runComposeCli

@click.command()
@click.argument('profile')
@click.option('--keyEnv', '-k', default='AWS_KEY', help='Environment variable that stores AWS key (default: AWS_KEY)')
@click.option('--secretEnv', '-s', default='AWS_SECRET', help='Environment variable that stores AWS key (default: AWS_SECRET)')
@click.option('--path', '-p', default='.', help='Path to deployment profiles directory')
@click.option('--loggingLevel', '-l', default='INFO', type=click.Choice(['INFO', 'DEBUG']), help='Set logging level')
@click.option('--outputJSON', '-o', default='Dockerrun.aws.json', help='File to store Dockerrun.aws.json config')
@click.option('--dry', '-d', type=bool, default=False, help="Perform only configuration generation, save it and do not deploy anything")
@click.option('--newEnvName', '-env', default='omigost', help="Set the name of new EB environment")
@click.option('--createNewEnv', '-e', default=True, help="Create new EB environment")
@click.option('--newEnvInstance', '-i', default='t3.medium', help="Instance type for which new environment is created")
@click.option('--newEnvOptions', '-envopt', default='[]', help="Additional options passed to EB Cli when creating new environment")
@click.option('--cli', '-c', default=False, help='Enable non-interactive CLI mode')
@click.option('--devCompose', '-d', default=False, help='Runs Omigost locally using pure local sources and Docker composer (disables all deployment features)')
def runCli(
        profile, keyenv, secretenv, path, logginglevel, outputjson, dry,
        newenvname, createnewenv, newenvinstance, newenvoptions, cli,
        devcompose
    ):
    configMode = 'aws'
    logger = createLogger('deploy.py')
    logger = setLoggerLevel(logger, logginglevel)

    if devcompose:
        logger.info('Development docker-compose mode is on. Deployment will not take place. Instead of that compose will be launched with Omigost based on local sources.')
        logger.info('--devCompose was specified: Using --outputJSON docker-compose.dev.yml override.')
        outputjson = "docker-compose.dev.yml"
        configMode = 'compose-dev'

    with open('{}/{}'.format(path, outputjson), 'w') as the_file:
        the_file.write(generateConfig(profile, path=path, logger=logger, secretEnv=secretenv, keyEnv=keyenv, mode=configMode))
    if dry:
        logger.info('Dry mode is active. Nothing to do.')
        return

    if devcompose:
        logger.info('Development docker-compose mode is on. Deployment will not take place. Instead of that compose will be launched with Omigost based on local sources.')
        #runComposeCli(['-f', outputjson, 'rm', '--force'], path=path, logger=logger)
        runComposeCli(['-f', outputjson, 'up', '--force-recreate', '--build'], path=path, logger=logger)
        return

    if (not devcompose) and createnewenv:
        hasEBDirectory = os.path.exists('{}/.elasticbeanstalk'.format(path))
        if not hasEBDirectory:
            logger.info('EB configuration was not detected. EB will be initialized.')
            runEBCli(['init', 'Omigost', '-p', 'Multi-container Docker'], path=path, logger=logger)

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
            runEBCli(['deploy'], path=path, logger=logger)
        else:
            runEBCli(createEnvCommand, path=path, logger=logger)
            runEBCli(['use', newenvname], path=path, logger=logger)

    if (not devcompose):
        statusOutput = runEBCli(['status'], path=path, logger=logger, collectOutput=True).splitlines()
        cnameUrl = None
        for line in statusOutput:
            lineTokens = line.split(':')
            if len(lineTokens) == 2:
                varName = lineTokens[0].replace(' ', '')
                varValue = lineTokens[1].replace(' ', '')
                if varName == 'CNAME':
                    cnameUrl = varValue

        if not (cnameUrl is None):
            logger.info('\n   ---> Deployed application to http://{}/\n'.format(cnameUrl))
            if not cli:
                try:
                    webbrowser.open_new_tab('http://{}/'.format(cnameUrl))
                except:
                    doNothing = True

runCli()
