# Jenkins-CI-CD

- Installing Jenkins in Docker

1. If Docker not installed then install it.

For Ubuntu:

[Install Docker](https://docs.docker.com/engine/install/ubuntu/)

2. Create a bridge network in Docker using the following docker network create command:

```bash
docker network create jenkins
```

3. In order to execute Docker commands inside Jenkins nodes, download and run the docker:dind Docker image using the following docker run command:

```bash
docker run \
  --name jenkins-docker \
  --rm \
  --detach \
  --privileged \
  --network jenkins \
  --network-alias docker \
  --env DOCKER_TLS_CERTDIR=/certs \
  --volume jenkins-docker-certs:/certs/client \
  --volume jenkins-data:/var/jenkins_home \
  --publish 2376:2376 \
  docker:dind \
  --storage-driver overlay2
```

4. Customize the official Jenkins Docker image, by executing the following two steps:

Build the Jenkins BlueOcean Docker Image

[Dockerfile](Dockerfile)

```bash
docker build -t myjenkins-blueocean:2.516.2-1 .
```

5. Run your own myjenkins-blueocean:2.516.2-1 image as a container in Docker using the following docker run command:

```bash
docker run \
  --name jenkins-blueocean \
  --restart=on-failure \
  --detach \
  --network jenkins \
  --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  myjenkins-blueocean:2.516.2-1
```

6. Get the Password

```bash
docker exec jenkins-blueocean cat /var/jenkins_home/secrets/initialAdminPassword
```

7. Connect to Jenkins

```bash
http://localhost:8080
```

