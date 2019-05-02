import json
import os
from container_transform.compose import ComposeTransformer
from container_transform.ecs import ECSTransformer

def generateConfig(envName='dev', logger=None, secretEnv=None, keyEnv=None):
    configInputPath = './{}/docker-compose.yml'.format(envName)
    if logger:
        logger.info('Reading configuration from {} file'.format(configInputPath))

    transformer = ComposeTransformer(configInputPath)
    normalized_keys = transformer.ingest_containers()

    awsKey = None
    awsSecret = None

    if keyEnv in os.environ:
        awsKey = os.environ[keyEnv]
    else:
        awsKey = keyEnv

    if secretEnv in os.environ:
        awsSecret = os.environ[secretEnv]
    else:
        awsSecret = secretEnv

    if (awsKey is None) or (awsSecret is None):
        raise Exception('Could not find AWS key/secret in environment variables nor in CLI argument')

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