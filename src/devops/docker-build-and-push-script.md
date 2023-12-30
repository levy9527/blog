---
date: 2023-12-08
tag:
- DevOps
- Linux
---

# Docker 构建镜像、推送、启动实用脚本

support command:
```shell
# only build
./build-image.sh 
# build and push
./build-image.sh -u xxx -p xxx --push
```

build-image.sh (remember to replace `xxx` with true value)：
```shell
#!/bin/sh
# Docker注册表
REGISTRY=xxx
REGISTRY_URL=https://$REGISTRY

# 镜像名称和标签
IMAGE=$REGISTRY/xxx/$(basename "$(pwd)")
IMAGE_TAG=$(cat VERSION)

# Dockerfile文件位置
DOCKERFILE_PATH=./Dockerfile

# Initialize variables for user input
username=""
password=""
push=false

# Process command-line arguments
while [ $# -gt 0 ]; do
  case $1 in
    -u)
      shift
      username=$1
      ;;
    -p)
      shift
      password=$1
      ;;
    --push)
      push=true
      ;;
    *)
      echo "Unknown argument will be ignored: $1"
      ;;
  esac
  shift
done

# Print the parsed values
echo "username: $username"
echo "push: $push"


# 构建镜像
echo "Building image: "${IMAGE}:${IMAGE_TAG}
docker build ${BUILD_CONTEXT} -t ${IMAGE}:${IMAGE_TAG} -f $DOCKERFILE_PATH .
docker tag ${IMAGE}:${IMAGE_TAG} ${IMAGE}:latest

if [ "$push" = true ]; then
  echo "push is true. Performing push operation..."

  # 登录
  echo "Logging into registry..."
  docker login -u $username -p $password $REGISTRY_URL

  # 推送
  echo "Pushing to registry..."
  docker push ${IMAGE}:${IMAGE_TAG} 
  docker push ${IMAGE}:latest

  echo "Build and push complete!"
else
  echo "push is false. Skipping push operation."
  echo "Build complete!"
fi
```

startup.sh
```shell
#!/bin/sh
# 镜像名称和标签
IMAGE=harbor.xxx.com/xxx/xxx-app
IMAGE_TAG=x.x.xxx
NAME=$(basename ${IMAGE})
PORT=8000:8000

# 如果容器正在运行,停止它
if docker ps -a --format="{{.Names}}" | grep -xq $NAME; then
    echo "Stopping old container..."
    docker stop $NAME
    docker rm $NAME
fi

# 获取新的镜像
echo "Pulling new image..."
docker pull $IMAGE:$IMAGE_TAG

docker run -d --name $NAME -p $PORT --restart=always --env ENV_KEY=xxx $IMAGE:$IMAGE_TAG
echo "Container started!"

docker logs -f $NAME
```
