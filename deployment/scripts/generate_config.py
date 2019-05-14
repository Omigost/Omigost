import json
import yaml
import os
from container_transform.compose import ComposeTransformer
from container_transform.ecs import ECSTransformer

def generateConfig(envName='dev', path='.', logger=None, secretEnv=None, keyEnv=None, mode='aws'):
    if mode == 'aws':
        return generateConfigAWS(
            envName=envName,
            path=path,
            logger=logger,
            secretEnv=secretEnv,
            keyEnv=keyEnv
        )
    elif mode == 'compose-dev':
        return generateConfigComposeDev(
            envName=envName,
            path=path,
            logger=logger,
            secretEnv=secretEnv,
            keyEnv=keyEnv
        )
    else:
        raise Exception('Invalid mdoe was specified for generateConfig. Got {}, expected: aws or compose-dev'.format(mode))

def loadSecrets(secretEnv, keyEnv):
    awsKey = None
    awsSecret = None

    if keyEnv in os.environ:
        awsKey = os.environ[keyEnv]
    elif keyEnv != 'AWS_KEY':
        awsKey = keyEnv

    if secretEnv in os.environ:
        awsSecret = os.environ[secretEnv]
    elif secretEnv != "AWS_SECRET":
        awsSecret = secretEnv

    if (awsKey is None) or (awsSecret is None):
        raise Exception('Could not find AWS key/secret in environment variables nor in CLI argument')

    return {
        "awsKey": awsKey,
        "awsSecret": awsSecret
    }


def generateConfigComposeDev(envName='dev', path='.', logger=None, secretEnv=None, keyEnv=None):
    configInputPath = '{}/{}/docker-compose.yml'.format(path, envName)
    if logger:
        logger.info('Reading configuration from {} file'.format(configInputPath))

    transformer = ComposeTransformer(configInputPath)
    normalized_keys = transformer.ingest_containers()

    secrets = loadSecrets(secretEnv, keyEnv)
    awsKey = secrets["awsKey"]
    awsSecret = secrets["awsSecret"]

    services = {}
    for service in normalized_keys:
        services[service["name"]] = service
        service.pop("name", None)
    normalized_keys = services

    omigostService = normalized_keys["omigost"]
    omigostService["volumes"] = [ "..:/opt/app/omigost", "~/.gradle:/root/.gradle" ]
    omigostService["image"] = "openjdk:11"
    springArgs=" ".join([
        "--spring.datasource.url=jdbc:postgresql://postgres:5432/docker_dev",
        "--spring.datasource.username=admin",
        "--spring.datasource.password=admin1",
        "--localstack.postgres.useExternal=true",
        "--localstack.services.useExternal=true",
        "--localstack.services.ip=localstack",
        "--localstack.services.sns.port=4575",
        "--localstack.services.dumb.port=4567",
        "--localstack.localAWSBudgets.useExternal=true",
        "--localstack.localAWSBudgets.ip=budgets",
        "--localstack.localAWSBudgets.port=5000",
        "--localstack.motocker.iam.useExternal=true",
        "--localstack.motocker.iam.ip=iam",
        "--localstack.motocker.iam.port=5000",
        "--localstack.motocker.ec2.useExternal=true",
        "--localstack.motocker.ec2.ip=ec2",
        "--localstack.motocker.ec2.port=5000",
        "--localstack.motocker.organizations.useExternal=true",
        "--localstack.motocker.organizations.ip=organizations",
        "--localstack.motocker.organizations.port=5000"
    ])

    commandStr = ("./gradlew bootRun -PspringArgs='{}' && ".format(springArgs) * 1) + "echo FINISHED"
    omigostService["command"] = "sh -c \"cd /opt/app/omigost && {}\"".format(commandStr)
    omigostService["ports"].append("8100:8100")

    compose_config = {
        "version": "3",
        "services": normalized_keys
    }

    for serviceName, service in normalized_keys.items():
        if serviceName != "postgres":

            new_keys = {
               "AWS_ACCESS_KEY": awsKey,
               "AWS_SECRET_KEY": awsSecret
            }
            if not "environment" in service:
                service["environment"] = []
            if isinstance(service["environment"], dict):
                service["environment"] = {**service["environment"], **new_keys}
            else:
                service["environment"] = service["environment"] + [ "{}={}".format(key, value) for key, value in new_keys.items() ]

    if logger:
        logger.info('Generated configuration from {} file'.format(configInputPath))
    return yaml.dump(compose_config, default_flow_style=False)

def generateConfigAWS(envName='dev', path='.', logger=None, secretEnv=None, keyEnv=None):
    configInputPath = '{}/{}/docker-compose.yml'.format(path, envName)
    if logger:
        logger.info('Reading configuration from {} file'.format(configInputPath))

    transformer = ComposeTransformer(configInputPath)
    normalized_keys = transformer.ingest_containers()

    secrets = loadSecrets(secretEnv, keyEnv)
    awsKey = secrets["awsKey"]
    awsSecret = secrets["awsSecret"]

    global_envs = [{
        'name': 'AWS_ACCESS_KEY',
        'value': awsKey
    }, {
        'name': 'AWS_SECRET_KEY',
        'value': awsSecret
    }]

    ecs_config = json.loads(ECSTransformer().emit_containers(normalized_keys))
    ecs_config['AWSEBDockerrunVersion'] = 2
    for container in ecs_config['containerDefinitions']:
        container['cpu'] = 1
        container['essential'] = True
        container['memory'] = 525
        container['name'] = container['hostname'] = container['container_name']
        if 'links' in container:
            newLinks = []
            for linkSpec in container['links']:
                newLinks.append("{}:{}".format(linkSpec, linkSpec))
            container['links'] = newLinks
        if 'ports' in container:
            newPorts = []
            for portSpec in container['ports']:
                portTokens = portSpec.split(':')
                newPorts.append({
                    "hostPort": portTokens[0],
                    "containerPort": portTokens[1]
                })
            container['portMappings'] = newPorts
            container.pop('ports')
        newEnv = global_envs + [{
            'name': 'HOSTNAME',
            'value': container['container_name']
        }]
        if 'environment' in container:
            if type(container['environment']) is list:
                for var in container['environment']:
                    varTokens = var.split('=')
                    newEnv.append({
                        'name': varTokens[0],
                        'value': varTokens[1]
                    })
            else:
                for k, v in container['environment'].items():
                    newEnv.append({
                        'name': k,
                        'value': v
                    })
        container['environment'] = newEnv

    if logger:
        logger.info('Generated configuration from {} file'.format(configInputPath))
    return json.dumps(ecs_config, indent=4, sort_keys=True)