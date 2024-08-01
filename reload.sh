docker-compose -f ./docker-compose.prod.yml down
docker pull docker.judan.dev/wine-backend
docker pull docker.judan.dev/wine-frontend
docker-compose -f ./docker-compose.prod.yml up -d
