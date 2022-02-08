# How you can run your first Argo Workflow on K3s ?

## Welcome!

Argo Workflows is an open source container-native workflow engine for orchestrating parallel jobs on Kubernetes. Argo Workflows is implemented as a Kubernetes CRD (Custom Resource Definition). In simple words, Argo is a workflow scheduler where you can run your workflows onto a Kubernetes Cluster, you can containerize different steps within your workflow and then all those steps could be executed as a part of your workflow onto a Kubernets cluster using Argo workflows. [Read more](https://argoproj.github.io/argo-workflows/)

Here we gonna create a simple Argo workflow template that will echo "hello world" using the docker/whalesay container image and this container will be running on our K3s cluster using Argo Workflow template.

Let's get started!! :rocket:

---

## Before starting 

Before proceeding further with the hands-on we need to have some tools and CLI installed locally:

1) **Docker:** A containerization tool that we will be using for running K3s cluster on container. Download it from [here](https://www.docker.com/products/docker-desktop). To check your installation run command `docker --version`. 
   
   Output:
   ```sh
   Docker version 20.10.11, build dea9396
   ```
   
2) **kubectl:** Kubernetes command-line tool that allows you to run commands against Kubernetes clusters. Download it from [here](https://kubernetes.io/docs/tasks/tools/). To check your installation run command `kubectl version --client`.
   
   Output:
   ```sh
   Client Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.0", GitCommit:"c2b5237ccd9c0f1d600d3072634ca66cefdf272f", GitTreeState:"clean", BuildDate:"2021-08-04T18:03:20Z", GoVersion:"go1.16.6", Compiler:"gc", Platform:"windows/amd64"}
   ```
   
3) **argo:** Argo CLI allows to (amongst other things) submit, watch, and list workflows. Download it from [here]( https://github.com/argoproj/argo-workflows/releases). To check your installation run command `argo version`.

   Output:
   ```sh
   argo: v3.2.4
    BuildDate: 2021-11-18T00:28:05Z
    GitCommit: 8771ca279c329753e420dbdd986a9c914876b151
    GitTreeState: clean
    GitTag: v3.2.4
    GoVersion: go1.16.10
    Compiler: gc
    Platform: windows/amd64
   ```
   
---

## Setting up K3s cluster locally(on Docker)

K3s is a fully conformant lightweight production-ready Kubernetes distribution. As compared to K8s, its easy to install, packaged as a single binary, requires less resources which means it's possible to run a kubernets cluster on anything from 512MB of RAM machines upwards, and we can install it in a fraction of the time, unlike regular K8s.

We are going to use K3d, which is a utility designed to easily run k3s in Docker.K3d makes it very easy to create single and multi-node k3s clusters in docker for local development on Kubernetes.

**:white_check_mark: Step 1: Install scripts of curent latest release** 

   ```sh
   curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
   ```

   If this command dosen't works, you can grab a release binary from the [Github release tab](https://github.com/rancher/k3d/releases) and install it yourself.
    
**:white_check_mark: Step 2: Create a cluster named `myK3sCluster` with just a single server node**
 
   ```sh
   k3d cluster create myK3sCluster
   ```
    
   This command will download the docker image of K3s and setup our cluster on container.
    
**:white_check_mark: Step 3: To check if `myK3sCluster` is successfully running on docker**
 
   ```sh
   kubectl get nodes
   ```
    
   Output:
   ```sh
   NAME                        STATUS   ROLES                  AGE     VERSION
   k3d-myk3scluster-server-0   Ready    control-plane,master   7h57m   v1.21.7+k3s1
   ```
    
---    
    
## Installing Argo Workflows in our K3s cluster 

**:white_check_mark: Step 1: Creating a seperate `namespace` for argo inside our cluster**

   ```sh
   kubectl create ns argo
   kubectl get ns
   ```
   
   Output:
   ```sh
   NAME              STATUS   AGE
   default           Active   8h
   kube-system       Active   8h
   kube-public       Active   8h
   kube-node-lease   Active   8h
   argo              Active   8h
   ```
   
**:white_check_mark: Step 2: Install Argo Workflows**

   To get started quickly, we can use the quick start manifest which will install Argo Workflow as well as some commonly used components
   
   ```sh
   kubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/quick-start-postgres.yaml
   ```
   
**:white_check_mark: Step 3: Check installation** 
   
   Verify everything is up running. We need to wait till each pod has running or completed status before moving on.
   
   ```sh
   kubectl get pods -n argo
   ```
   
   Output:
   ```sh
   NAME                                  READY   STATUS      RESTARTS   AGE
   minio-79566d86cb-82c4j                1/1     Running     1          8h
   postgres-546d9d68b-8dfqp              1/1     Running     1          8h
   workflow-controller-558db44f7-wglh5   1/1     Running     5          8h
   argo-server-5d58f6585d-7jx2p          1/1     Running     4          8h
   ```
   
**:white_check_mark: Step 4: Accessing Argo Workflows dashboard**

   As we are running Argo Workflows locally, we can open a port-forward so you can access the namespace/dashboard.

   ```sh
   kubectl -n argo port-forward deployment/argo-server 2746:2746
   ```

   Open the Argo dashboard using URL `https://localhost:2746`. Here you can see all your workflows, create them and manage them.
   
---   
   
## Creating our first Argo Workflow template

I have created a very simple workflow template to echo "hello world" using the docker/whalesay container image from DockerHub. Create a file named `hello-world.yaml`, and copy paste the following code.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow                   # new type of k8s spec used to create argo workflows
metadata:
  generateName: hello-world-     # name of the workflow spec
spec:
  entrypoint: whalesay           # specifies the initial template that should be invoked i.e whalesay
  templates:
  - name: whalesay               # name of the template
    container:                   # container that will run when this template in invoked 
      image: docker/whalesay     # image that will run inside the cluster
      command: [cowsay]
      args: ["hello world"]
      resources:                 # limit the resources
        limits:
          memory: 32Mi
          cpu: 100m
  ```
  
**:white_check_mark: Step 1: Submitting our workflow**

   Make sure before running the following codes you should be the folder where you created your `hello-world.yaml` file.
   
   ```sh
   argo submit -n argo --watch hello-world.yaml
   ```
   
   Output:
   ```sh
   Name:                hello-world-xpc6d
   Namespace:           argo
   ServiceAccount:      default
   Status:              Running
   reated:              Tue Jan 18 22:32:07 +0530 (6 seconds ago)
   Started:             Tue Jan 18 22:32:07 +0530 (6 seconds ago)
   Duration:            6 seconds
   Progress:            0/0

   STEP                  TEMPLATE  PODNAME            DURATION  MESSAGE
    ◷ hello-world-xpc6d  whalesay  hello-world-xpc6d  6s
   ```
    
   You can see your workflow named `hello-world-xpc6d` has started running. Wait till it has finished executing. You can also see your workflow on the dashboard
    
**:white_check_mark: Step 2: Getting logs of our workflow**

   Here, `@latest` tag refers to the recent or the last submitted workflow. You can also replace `@latest` with the name of your workflow. For eg. in my case the workflow name would be `hello-world-xpc6d`.

   ```sh
   argo list -n argo
   argo get -n argo @latest
   argo logs -n argo @latest
   ```
   
   Output:
   ```sh
   hello-world-xpc6d: time="2022-01-18T17:02:54.072Z" level=info msg="capturing logs" argo=true
   hello-world-xpc6d:  _____________ 
   hello-world-xpc6d: < hello world >
   hello-world-xpc6d:  ------------- 
   hello-world-xpc6d:     \
   hello-world-xpc6d:      \
   hello-world-xpc6d:       \
   hello-world-xpc6d:                     ##        .
   hello-world-xpc6d:               ## ## ##       ==
   hello-world-xpc6d:            ## ## ## ##      ===
   hello-world-xpc6d:        /""""""""""""""""___/ ===
   hello-world-xpc6d:   ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~
   hello-world-xpc6d:        \______ o          __/
   hello-world-xpc6d:         \    \        __/
   hello-world-xpc6d:           \____\______/
   ```
   
   ---
   
   Congratulations!! :rocket: You successfully ran your first ever simple argo workflow on K3s cluster. I hope this made you curious to explore Argo workflows more deeply. 
   [Checkout this](https://github.com/argoproj/argo-workflows/edit/master/examples/README.md), here you can find different types to workflows and templates that you can try  running locally.  
