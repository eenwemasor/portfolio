---
title: "Harnessing Kubernetes for Hosting MySQL and Laravel Applications"
excerpt: "A hands-on walkthrough of deploying a Laravel application and connecting it to a MySQL database running inside a Kubernetes cluster."
date: "2024-06-25"
dateLabel: "June 25, 2024"
type: post
category: "Kubernetes"
image: ""
imageAlt: "Harnessing Kubernetes for Hosting MySQL and Laravel Applications"
authorName: "Enwemasor Barnabas"
authorUrl: "https://enwemasorbarnabas.com"
tags: ["Kubernetes", "Mysql"]
---

Kubernetes has become the infrastructure for scalability, high performance and high availability. Development teams are integrating containerization into their development processes because it reduces the release cycle time, deployment processes are faster with it, and development is easier.

In this brief exercise, we'll deploy a Laravel application and establish connectivity between the Laravel instance and a MySQL database running within a Kubernetes cluster.

## Prerequisite

- You must have a Kubernetes cluster running, either locally e.g. Minikube, or any cloud Kubernetes services e.g. GKE (Google Kubernetes Service), Amazon EKS (Elastic Kubernetes Service), AKS (Azure Kubernetes Service)
- Configure the `kubectl` command line tool to communicate with your Kubernetes cluster
- Good knowledge of the Kubernetes basic concepts and components — this exercise will be utilizing Kubernetes concepts such as [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [Services](https://kubernetes.io/docs/concepts/services-networking/service/), [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/), [PersistentVolume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/), [Pods](https://kubernetes.io/docs/concepts/workloads/pods/), [Containers](https://kubernetes.io/docs/concepts/containers/), etc. [Check out this documentation for more on Kubernetes concepts](https://kubernetes.io/docs/concepts/)

## Setup a Laravel project by either

- Cloning a simple Laravel project available on GitHub in this [repo](https://github.com/eenwemasor/laravel-kubernetes)
- [Setting up a new Laravel project from scratch](https://laravel.com/docs/11.x#creating-a-laravel-project)

With the Kubernetes cluster ready and the Laravel project configured, it's time to configure our Kubernetes resources to host our application.

## Create Kubernetes Secret

We are going to utilize a Kubernetes Secret to store environment variables needed by both the MySQL container and Laravel containers. At the root of your Laravel project, create a file `deployments/envs.yaml` and paste:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: stng-secrets
stringData:
  APP_NAME: "App Name"
  APP_ENV: "local"
  APP_KEY: "base64:rvpuu7UF/tQqbfDRy6xIPDNwM/I5O00JQ+dohwZi8So="
  APP_DEBUG: "true"
  APP_URL: "http://127.0.0.1:8000"
  DB_CONNECTION: "mysql"
  DB_HOST: "stickersng-mysql" # Must match the MySQL service name
  DB_PORT: "3306"
  DB_DATABASE: "stickersng-db"
  DB_USERNAME: "stickersng"
  DB_PASSWORD: "stickersng"
```

The above YAML file utilizes `stringData` to create secrets which will be accessed by the MySQL and Laravel containers as environment variables.

## Create MySQL Pods and Service

In order to get our MySQL server up and running we need to:

- Create a service resource
  - This will be the Laravel application entry point when connecting to the database
- PersistentVolumeClaim
  - The `PersistentVolumeClaim` resource will request a persistent volume which will enable data stored in the MySQL database to live beyond the MySQL pod lifecycle

### Deployment

The Deployment will use the `mysql:8.0` docker image to create a container, mount the persistent volume to the container, and specify how the above service can resolve its containers.

In `root/deployments/` of your Laravel project create a file `mysql-deployment.yaml` and paste:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: stickersng-mysql
  labels:
    app: stickersng
spec:
  ports:
    - port: 3306
  selector:
    app: stickersng
    tier: mysql
  clusterIP: None
---
```

- `metadata.name`: Declares the name of the service
- `spec.ports`: Declares TCP port to be 3306; this means that all requests to all containers that match the service selector will be to port `3306`
- `spec.selector`: Declares the `label/selector` identifying attributes; this is how the service matches pods to forward traffic

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: stickersng-mysql-pv-claim
  labels:
    app: stickersng
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
```

- `metadata.name`: Declares the name of the PersistentVolumeClaim which will be used to create a volume mount on the MySQL pod
- `spec.resources.request.storage`: Specifies the persistent volume capacity

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: stickersng-mysql
  labels:
    app: stickersng
spec:
  selector:
    matchLabels:
      app: stickersng
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: stickersng
        tier: mysql
    spec:
      containers:
        - image: mysql:8.0
          name: mysql
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: stng-secrets
                  key: DB_PASSWORD
            - name: MYSQL_DATABASE
              valueFrom:
                secretKeyRef:
                  name: stng-secrets
                  key: DB_DATABASE
            - name: MYSQL_USER
              valueFrom:
                secretKeyRef:
                  name: stng-secrets
                  key: DB_USERNAME
            - name: MYSQL_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: stng-secrets
                  key: DB_PASSWORD
          ports:
            - containerPort: 3306
              name: mysql
          volumeMounts:
            - name: mysql-persistent-storage
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-persistent-storage
          persistentVolumeClaim:
            claimName: stickersng-mysql-pv-claim
```

- `metadata.name`: Declares the name of the deployment
- `spec.selector.matchLabels`: Specifies the selector matching labels for the deployment
- `spec.template.spec.containers.image`: Declares the image for running the MySQL container
- `spec.template.spec.containers.env`: Declares environment variables using values from the Secret we created previously; the values for `spec.template.spec.containers.env.valueFrom.key` must match a key in the Secret YAML file (if any set key is not resolved correctly the container pods will not be ready)
- `spec.template.spec.volumes.persistentVolumeClaim`: Declares which persistent volume to use
- `spec.template.spec.containers.volumeMounts`: Declares the path to mount the volume on the containers

Combine the code snippets above into the `mysql-deployment.yaml` file created earlier. The above YAML file will create 3 resources: a [Secret](https://kubernetes.io/docs/concepts/configuration/secret/), [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), and a [PersistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

## Package the Laravel project into an image

Kubernetes serves as a container orchestration system, with containers executing images. To utilize Kubernetes for hosting our Laravel application, which currently isn't in image form, we need to build the project into an image. To accomplish this, create a Dockerfile at the root of your project with the following content. You will need Docker installed and configured with Docker Hub:

```dockerfile
# Use the official PHP image as the base
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer files and install dependencies
COPY composer.json ./
RUN composer install --no-scripts --no-autoloader

# Copy the rest of the application code
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Generate autoload files
RUN composer dump-autoload

# Expose port 9000 and start php-fpm server
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
```

This Dockerfile will use the official PHP 8.2 image as the base image; subsequent lines install and copy all necessary files and packages required to run the Laravel application in isolation. Run the below command in your terminal at the root of your project to build the image:

```bash
docker build -t [YOUR_DOCKER_HUB_USER_ID]/[IMAGE_NAME]:[IMAGE_TAG] .
```

This process takes a while; a new image will be built and available on your host machine. For Kubernetes to utilize the image, it needs to be available in a global container registry like Docker Hub or any other container registry provided by cloud providers:

```bash
docker push [YOUR_DOCKER_HUB_USER_ID]/[IMAGE_NAME]:[IMAGE_TAG]
```

## Create the Laravel App Deployment

Now that we have our image ready and available over a container registry, we can create the Kubernetes deployment that will host the application. In `root/deployments/` of your Laravel project create a file `api-deployment.yaml` and paste:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: stickersng-api
  labels:
    app: stickersng-api
spec:
  ports:
    - port: 8000
  selector:
    app: stickersng-api
    tier: backend-api
  type: LoadBalancer
---
```

- `metadata.name`: Declares the name of the service
- `spec.ports`: Declares TCP port to be 8000; this means that all requests to all containers that match the service selector will be to port `8000`
- `spec.selector`: Declares the `label/selector` identifying attributes; this is how the service matches pods to forward traffic

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wp-pv-claim
  labels:
    app: stickersng-api
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
```

- `metadata.name`: Declares the name of the PersistentVolumeClaim which will be used to create a volume mount
- `spec.resources.request.storage`: Specifies the persistent volume capacity

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: stickersng-api
  labels:
    app: stickersng-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: stickersng-api
      tier: backend-api
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: stickersng-api
        tier: backend-api
    spec:
      initContainers:
        - name: setup-storage
          image: busybox
          command: ["sh", "-c", "mkdir -p /var/www/html/storage/framework/views/ && mkdir -p /var/www/html/storage/framework/cache/ && mkdir -p /var/www/html/storage/framework/sessions/ && chown -R www-data:www-data /var/www/html/storage/framework/sessions/"]
          volumeMounts:
            - name: stickersng-api-persistent-storage
              mountPath: /var/www/html/storage
      containers:
        - image: [YOUR_DOCKER_HUB_USER_ID]/[IMAGE_NAME]:[IMAGE_TAG]
          name: stickersng-api
          envFrom:
            - secretRef:
                name: stng-secrets
          ports:
            - containerPort: 8000
              name: stickersng-api
          volumeMounts:
            - name: stickersng-api-persistent-storage
              mountPath: /var/www/html/storage
      volumes:
        - name: stickersng-api-persistent-storage
          persistentVolumeClaim:
            claimName: wp-pv-claim
```

- `metadata.name`: Declares the name of the deployment
- `spec.selector.matchLabels`: Specifies the selector matching labels for the deployment
- `spec.template.spec.containers.image`: Declares the image for running the Laravel application
- `spec.template.spec.containers.envFrom`: Declares environment variables using values from the Secret we created previously
- `spec.template.spec.volumes.persistentVolumeClaim`: Declares which persistent volume to use
- `spec.template.spec.containers.volumeMounts`: Declares the path to mount the volume on the containers
- `spec.template.spec.initContainers`: A temporary container that runs commands to create files required by Laravel to run on the mounted volumes, before starting the Laravel container

Combine the code snippet above with the `api-deployment.yaml` file created earlier.

Now that we have created the YAML files for all the resources we need to host our application, we need a [Kustomization](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) YAML to group all these resource configuration files. This enables us to initiate all resources with a single command and delete them with a single command as well.

In `root/deployments/` of your Laravel project create a file `kustomization.yaml` and paste:

```yaml
resources:
  - envs.yaml
  - mysql-deployment.yaml
  - api-deployment.yaml
```

## Start up your Infrastructure

At this point, the deployments folder at the root of your Laravel application should contain the following files:

- `envs.yaml`
- `mysql-deployment.yaml`
- `api-deployment.yaml`
- `kustomization.yaml`

In your terminal, `cd` into the deployment folder and run the following command:

```bash
kubectl apply -k ./
```

This command uses the `kubectl` command line tool to apply the resources specified in the Kustomization YAML file to your Kubernetes cluster.

To monitor your resources you can use the commands below to check the resource's status as they are being created:

```bash
kubectl get services   # get the list of services
kubectl get secrets     # get the list of secrets
kubectl get pvc         # get the list of persistent volume claims
kubectl get pods        # get the list of pods
minikube service stickersng-api --url   # if you are using minikube for your cluster; this will return your Laravel URL
```

With your application now running in Kubernetes pods, you will be able to visit the Laravel app service IP and see a preview of the application welcome page.

To delete the resources created so far, in your terminal `cd` into the deployment folder and run the following command:

```bash
kubectl delete -k ./
```

## Conclusion

In conclusion, Kubernetes offers a robust infrastructure for deploying and managing containerized applications like MySQL and Laravel. By following the steps outlined in this exercise, you've learned how to leverage Kubernetes concepts such as deployments, services, volumes, and secrets to set up a scalable and resilient environment for hosting your Laravel application alongside a MySQL database.

Through Kubernetes, you can achieve scalability, high performance, and high availability — crucial factors for modern development workflows. By containerizing your applications and utilizing Kubernetes for orchestration, you streamline deployment processes, reduce release cycle times, and make development more manageable.

Remember, this exercise is just a starting point. Kubernetes offers a vast array of features and configurations that you can explore to tailor your deployment setup to your specific needs. Keep experimenting, learning, and optimizing your Kubernetes infrastructure to ensure your applications run smoothly and efficiently in any environment.
