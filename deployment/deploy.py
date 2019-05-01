import json
from container_transform.compose import ComposeTransformer
from container_transform.ecs import ECSTransformer

transformer = ComposeTransformer('./dev/docker-compose.yml')
normalized_keys = transformer.ingest_containers()

ecs_config = json.loads(ECSTransformer().emit_containers(normalized_keys))
ecs_config['AWSEBDockerrunVersion'] = '2';

with open('Dockerrun.aws.json', 'w') as the_file:
    the_file.write(json.dumps(ecs_config))