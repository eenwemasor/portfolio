<article id="post-26" class="section-box post-26 post type-post status-publish format-standard has-post-thumbnail hentry category-kubernetes category-laravel category-software-engineering category-uncategorized tag-kubernetes tag-mysql">

    <header class="entry-header" id="primary">
    	<h1 class="entry-title">Harnessing Kubernetes for Hosting MySQL and Laravel Applications</h1>		    </header>

    <img fetchpriority="high" width="1400" height="1400" src="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/kubernetes.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Harnessing Kubernetes for Hosting MySQL and Laravel Applications" decoding="async" srcset="https://enwemasorbarnabas.com/wp-content/uploads/2024/06/kubernetes.png 1400w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/kubernetes-300x300.png 300w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/kubernetes-1024x1024.png 1024w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/kubernetes-150x150.png 150w, https://enwemasorbarnabas.com/wp-content/uploads/2024/06/kubernetes-768x768.png 768w" sizes="(max-width: 1400px) 100vw, 1400px">
    <div class="entry-content">


<p class="wp-block-paragraph">Kubernetes has become the infrastructure for scalability; high performance and high availability, development teams are integrating containerization into their development processes; because it reduces the release cycle time; deployment processes are faster with it and development is easier,</p>

<p class="wp-block-paragraph">In this brief exercise, we’ll deploy a Laravel application and establish connectivity between the Laravel instance and a MySQL database running within a Kubernetes cluster.</p>

<h3 class="wp-block-heading">Prerequisite</h3>

<ul class="wp-block-list">
<li>You must have a Kubernetes cluster running, either locally eg Minikube, or any cloud Kubernetes services e.g GKE(Google Kubernetes Service), Amazon EKS(Elastic Kubernetes Service), AKS(Azure Kubernetes Service)</li>

<li>Configure kubectl command line tool to communicate with your Kubernetes cluster</li>

<li>Good knowledge of the Kubernetes basic concepts and components – this exercise will be utilizing Kubernetes concepts such as <a href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/">Deployments</a>, <a href="https://kubernetes.io/docs/concepts/services-networking/service/">Services</a>, <a href="https://kubernetes.io/docs/concepts/storage/volumes/">Volumes</a>, <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">PersistentVolume</a>, <a href="https://kubernetes.io/docs/concepts/configuration/secret/">Secrets</a>, <a href="https://kubernetes.io/docs/concepts/workloads/pods/">Pods</a>, <a href="https://kubernetes.io/docs/concepts/containers/">Containers</a>, etc. <a href="https://kubernetes.io/docs/concepts/">for more on Kubernetes concepts check out this documentation</a></li>
</ul>

<h3 class="wp-block-heading">Setup a Laravel project by either</h3>

<ul class="wp-block-list">
<li>Cloning a simple Laravel project available on Github in this <a href="https://github.com/eenwemasor/laravel-kubernetes">repo</a></li>

<li><a href="https://laravel.com/docs/11.x#creating-a-laravel-project">Setup new Laravel project from scratch</a></li>
</ul>

<p class="wp-block-paragraph">With the Kubernetes cluster ready and the Laravel project configured, it’s time to configure our Kubernetes resources to host our application.</p>

<h3 class="wp-block-heading">Create Kubernetes Secret</h3>

<p class="wp-block-paragraph">We are going to utilize Kubernetes Secret to store environment variables needed by both Mysql container and Laravel containers; on the root of your Laravel project create a file <code>deployments/envs.yaml</code> and paste<br></p>

<pre class="wp-block-code"><code>apiVersion: v1
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
  DB_HOST: "stickersng-mysql" /**Must matched the MySQL service name**/
  DB_PORT: "3306"
  DB_DATABASE: "stickersng-db"
  DB_USERNAME: "stickersng"
  DB_PASSWORD: "stickersng"
</code></pre>

<p class="wp-block-paragraph">The above yaml file utilizes stringData to create secrets which will be accessed by the MySQL and the Laravel containers as environment variables;</p>

<h3 class="wp-block-heading">Create Mysql Pods and Service</h3>

<p class="wp-block-paragraph">In other to get our MySQL server up and running we need to:</p>

<ul class="wp-block-list">
<li>Create a service resource
<ul class="wp-block-list">
<li>This will be the Laravel application entry point when connecting to the database</li>
</ul>
</li>

<li>PersistentVolumeClaim
<ul class="wp-block-list">
<li>The <code>PersistentVolumeClaim</code> resource will request for a persistent volume which will enable data stored in the Mysql database to live beyond the MySQL pod live cycle</li>
</ul>
</li>
</ul>

<h4 class="wp-block-heading">Deployment</h4>

<p class="wp-block-paragraph">The Deployment will use the <code>mysql:8.0</code> docker image to create a container, mount the persistent volume to the container and specify how the above service can resolve its containers.</p>

<p class="wp-block-paragraph">In root/deployments/ of your Laravel project create a file <code>mysql-deployment.yaml</code> and paste<br></p>

<pre class="wp-block-code"><code>apiVersion: v1
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
</code></pre>

<ul class="wp-block-list">
<li><code>metadata.name</code>: Declares the name of the service</li>

<li><code>spec.ports</code>: Declares TCP port to be 3306; this means that all requests to all containers that match the service selector will be to port <code>3306</code></li>

<li><code>spec.selector</code>: Declares the <code>label/selector</code> identifying attributes; this is how the service matches pod to forward traffic</li>
</ul>

<pre class="wp-block-code"><code>apiVersion: v1
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
</code></pre>

<ul class="wp-block-list">
<li><code>metadata.name</code>: Declares the name of the PersistentVolumeClaim which will be used to create a volume mount on the Mysql pod</li>

<li><code>spec.resources.request.storage</code>: Specifies the persistent volume capacity</li>
</ul>

<pre class="wp-block-code"><code>apiVersion: apps/v1
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
</code></pre>

<ul class="wp-block-list">
<li><code>metadata.name</code>: Declares the name of the deployment</li>

<li><code>spec.selector.matchLabels</code>: Specifies the selector matching labels for the deployment</li>

<li><code>spec.template.spec.containers.image</code>: Declares the image for running the Mysql container</li>

<li><code>spec.template.spec.containers.env</code>: Declares environment variables using values from the Secret we created previously; the values for <code>spec.template.spec.containers.env.valueFrom.key</code> must match a key in the Secret yaml file (if any set key is not resolved correctly the container pods will not be ready)</li>

<li><code>spec.template.spec.volumes.persistentVolumeClaim</code>: Declares which persistent volume to be used</li>

<li><code>spec.template.spec.containers.volumeMounts</code>: Declares the path to mount the volume on the containers.</li>
</ul>

<p class="wp-block-paragraph">Combine the code snippet above with the <code>mysql-deployment.yaml</code> file created earlier.<br>The above yaml file will create 3 resources. A <a href="https://kubernetes.io/docs/concepts/configuration/secret/">Secret</a>, <a href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/">Deployment</a> and a <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">PersistentVolumeCliam</a></p>

<h3 class="wp-block-heading">Package the Laravel project into an image</h3>

<p class="wp-block-paragraph">Kubernetes serves as a container orchestration system, with containers executing images. To utilize Kubernetes for hosting our Laravel application, which currently isn’t in image form, we need to build the project into an image. To accomplish this, create a Dockerfile at the root of your project with the following content.: You will need docker installed and configured with dockerhub<br></p>

<pre class="wp-block-code"><code># Use the official PHP image as the base
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update &amp;&amp; apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    &amp;&amp; docker-php-ext-configure gd --with-freetype --with-jpeg \
    &amp;&amp; docker-php-ext-install gd pdo pdo_mysql zip

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

</code></pre>

<p class="wp-block-paragraph">This Dockerfile will use the official php8.2 image as the base image subsequent lines in the Dockerfile install and copy all necessary files and packages required in other to run the Laravel application in isolation. Run the below command on your terminal at the root of your project to build the image.<br></p>

<pre class="wp-block-code"><code>docker build -t [YOUR_DOCKER_HUB_USER_ID]/[IMAGE_NAME]:[IMAGE_TAG] .
</code></pre>

<p class="wp-block-paragraph">This process is a long one; a new image will be built and available on your host machine; for Kubernetes to utilize the image it needs to be available in a global container registry like Dockerhub or any other container registry provided by cloud providers<br></p>

<pre class="wp-block-code"><code>docker push [YOUR_DOCKER_HUB_USER_ID]/[IMAGE_NAME]:[IMAGE_TAG]
</code></pre>

<h3 class="wp-block-heading">Create the Laravel App Deployment</h3>

<p class="wp-block-paragraph">Now that we have our image ready and available over a container registry, we can create the Kubernetes deployment that will host the application. In root/deployments/ of your Laravel project create a file <code>api-deployment.yaml</code> and paste<br></p>

<pre class="wp-block-code"><code>apiVersion: v1
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
</code></pre>

<ul class="wp-block-list">
<li><code>metadata.name</code>: Declares the name of the service</li>

<li><code>spec.ports</code>: Declares TCP port to be 8000; this means that all requests to all containers that match the service selector will be to port <code>8000</code></li>

<li><code>spec.selector</code>: Declares the <code>label/selector</code> identifying attributes; this is how the service matches pod to forward traffic</li>
</ul>

<pre class="wp-block-code"><code>apiVersion: v1
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
</code></pre>

<ul class="wp-block-list">
<li><code>metadata.name</code>: Declares the name of the PersistentVolumeClaim which will be used to create a volume mount.</li>

<li><code>spec.resources.request.storage</code>: Specifies the persistent volume capacity</li>
</ul>

<pre class="wp-block-code"><code>apiVersion: apps/v1
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
        command: ["sh", "-c", "mkdir -p /var/www/html/storage/framework/views/ &amp;&amp; mkdir -p /var/www/html/storage/framework/cache/ &amp;&amp; mkdir -p /var/www/html/storage/framework/sessions/ &amp;&amp; chown -R www-data:www-data /var/www/html/storage/framework/sessions/"]
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
</code></pre>

<ul class="wp-block-list">
<li><code>metadata.name</code>: Declares the name of the deployment</li>

<li><code>spec.selector.matchLabels</code>: Specifies the selector matching labels for the deployment</li>

<li><code>spec.template.spec.containers.image</code>: Declares the image for running the Laravel application.</li>

<li><code>spec.template.spec.containers.envFrom</code>: Declares environment variables using values from the Secret we created previously;</li>

<li><code>spec.template.spec.volumes.persistentVolumeClaim</code>: Declares which persistent volume to the use</li>

<li><code>spec.template.spec.containers.volumeMounts</code>: Declares the path to mount the volume on the containers.</li>

<li><code>spec.template.spec.initContainers</code>: is a temporary container that runs commands that create files required by Laravel to run on the mounted volumes, before starting the Laravel container.</li>
</ul>

<p class="wp-block-paragraph">Combine the code snippet above with the <code>api-deployment.yaml</code> file created earlier.</p>

<p class="wp-block-paragraph">Now that we have created the yaml files for all the resources we need to host our application, we need a <a href="https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/">Kustomization</a> yaml to group all these resource configuration files. This enables us to initiate all resources with a single command and delete them with a single command as well.</p>

<p class="wp-block-paragraph">In root/deployments/ of your Laravel project create a file <code>kustomization.yaml</code> and paste<br></p>

<pre class="wp-block-code"><code>resources:
- envs.yaml
- mysql-deployment.yaml
- api-deployment.yaml
</code></pre>

<h3 class="wp-block-heading">Start up your Infrastructure</h3>

<p class="wp-block-paragraph">At this point, the deployments folder at the root of your Laravel application should contain the following files:</p>

<ul class="wp-block-list">
<li>envs.yaml</li>

<li>mysql-deployment.yaml</li>

<li>api-deployment.yaml</li>

<li>kustomization.yaml</li>
</ul>

<p class="wp-block-paragraph">On your terminal <code>cd</code> into the deployment folder and run the following command<br></p>

<pre class="wp-block-code"><code>kubectl apply -k ./ 
</code></pre>

<p class="wp-block-paragraph">This command uses the <code>kubectl</code> command line tool to apply the resources specified in the Kustomization yaml file to your Kubernetes cluster;</p>

<p class="wp-block-paragraph">To monitor your resources you can use the commands below to check the resource’s status as they are being created<br></p>

<pre class="wp-block-code"><code>kubectl get services // get the list service
</code></pre>

<pre class="wp-block-code"><code>kubectl get secrets // get the list of secrets
</code></pre>

<pre class="wp-block-code"><code>kubectl get pvc // get the list of persistent volume claims
</code></pre>

<pre class="wp-block-code"><code>kubectl get pods // get the list of pods
</code></pre>

<pre class="wp-block-code"><code>minikube service stickersng-api --url // if you are using minikube for your cluster; this will return your Laravel URL
</code></pre>

<p class="wp-block-paragraph">With your application now running in Kubernetes pods, you will be able to visit the Laravel app service IP and you will see a preview of the application welcome page.</p>

<figure class="wp-block-image"><a href="https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F41hy6g9578vemxwtgycw.png"><img decoding="async" src="https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F41hy6g9578vemxwtgycw.png" alt="Kubernetes offers a robust infrastructure for deploying and managing containerized applications like MySQL and Laravel."></a></figure>

<p class="wp-block-paragraph">To delete the resources created so far, on your terminal <code>cd</code> into the deployment folder and run the following command<br></p>

<pre class="wp-block-code"><code>kubectl delete -k ./ 
</code></pre>

<h3 class="wp-block-heading">Conclusion</h3>

<p class="wp-block-paragraph">In conclusion, Kubernetes offers a robust infrastructure for deploying and managing containerized applications like MySQL and Laravel. By following the steps outlined in this exercise, you’ve learned how to leverage Kubernetes concepts such as deployments, services, volumes, and secrets to set up a scalable and resilient environment for hosting your Laravel application alongside a MySQL database.</p>

<p class="wp-block-paragraph">Through Kubernetes, you can achieve scalability, high performance, and high availability, crucial factors for modern development workflows. By containerizing your applications and utilizing Kubernetes for orchestration, you streamline deployment processes, reduce release cycle times, and make development more manageable.</p>

<p class="wp-block-paragraph">Remember, this exercise is just a starting point. Kubernetes offers a vast array of features and configurations that you can explore to tailor your deployment setup to your specific needs. Keep experimenting, learning, and optimizing your Kubernetes infrastructure to ensure your applications run smoothly and efficiently in any environment.</p>
    </div><!-- .entry-content -->

    <footer class="entry-footer">

        <div class="footer-card">
            <div class="card-icon">
                <span class="mb-icon mb-icon-user" aria-hidden="true"></span>
            </div>
            <div class="card-title">Author</div>
            <div class="card-content">
    			<a href="https://enwemasorbarnabas.com" target="_blank">eenwemasor</a>            </div>
        </div>
        <div class="footer-card">
            <div class="card-icon">
                <span class="mb-icon mb-icon-clock" aria-hidden="true"></span>
            </div>
            <div class="card-title">Modification</div><div class="card-content"><time>25/6/2024</time></div>        </div>

    	<div class="footer-card is-full">  <div class="card-icon"><span class="mb-icon mb-icon-hash" aria-hidden="true"></span></div>  <div class="card-title">Tags</div>  <div class="card-content"><a href="https://enwemasorbarnabas.com/tag/kubernetes/">Kubernetes</a>, <a href="https://enwemasorbarnabas.com/tag/mysql/">Mysql</a></div></div>
    </footer>

</article>
