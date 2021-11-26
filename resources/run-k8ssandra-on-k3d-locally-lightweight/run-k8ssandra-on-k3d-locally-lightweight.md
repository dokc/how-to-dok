# How to run k8ssandra locally using k3d - lightweight

This guide describes how to run k8ssandra locally on k3d.

It is a lightweight, stripped down bare minimum k8ssandra installation intended to walk through the process of using k3d locally as a development environment and using only single components from the k8ssandra HELM chart.

**Docker is required on your machine and needs to be running for k3d**

What do we need to get this up and running:
* Docker
* HELM
* K3D
* K8ssandra
* kubectl

Let's get cooking! 🥣

### kubectl

First of; kubectl is the command line tool to interface and talk to kubernetes clusters. We will need it to check and perform operations on our k3d cluster. Let's install it!
There are many install options listed on the kubernetes [website](https://kubernetes.io/docs/tasks/tools/) but we are focusing here on **linux**.

The below commands download the kubectl binary, enable it to be executed by changing permissions and move the binary to the `.local/bin` folder on your machine from where it is available to your from everywhere on your system (for your user).

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
mv ./kubectl ~/.local/bin/kubectl
```

After this check you can run the `kubectl` command!

Next up, k3d.

### k3d

To simulate multiple kubernetes nodes locally we use k3d which is a wrapper around k3s to enable it to run in Docker. This way we can simulate a multi nodes cluster locally. k3s is an extremely lightweight and portable kubernetes version developed by Rancher.

Let's start by installing k3d.


The below command downloads the k3d install script from the rancher/k3d repository and using the TAG=v4.4.8 installs that version of k3d on our local system.

Make sure to check the install.sh script: **Do not blindly execute downloaded shell scripts.**

```
curl -s -O https://raw.githubusercontent.com/rancher/k3d/main/install.sh
TAG=v4.4.8 bash install.sh
```

Your output should look like this:
```
Preparing to install k3d into /usr/local/bin
k3d installed into /usr/local/bin/k3d
Run 'k3d --help' to see what you can do with it.
```

Next up we can create our k3d cluster!
Notice the `--server 3` parameter. This ensures we have a 3 node cluster. This is important for getting a usefull k8ssandra cluster running.
```
k3d cluster create my-awesome-cluster --servers 3
```

k3d automatically configures our kubectl for our cluster. You might have to switch configuration context. You can do this by running.
```
kubectl config use-context k3d-my-awesome-cluster
```

Then check if you can access the cluster:
```
kubectl cluster-info
kubectl get nodes
```

You output should look like this:
```
tim@calculator:~/code/patchandpray/how-to-dok$ k cluster-info 
Kubernetes control plane is running at https://0.0.0.0:37003
CoreDNS is running at https://0.0.0.0:37003/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
Metrics-server is running at https://0.0.0.0:37003/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
...
NAME                              STATUS   ROLES                       AGE   VERSION
k3d-my-awesome-cluster-server-0   Ready    control-plane,etcd,master   13m   v1.21.3+k3s1
k3d-my-awesome-cluster-server-1   Ready    control-plane,etcd,master   13m   v1.21.3+k3s1
k3d-my-awesome-cluster-server-2   Ready    control-plane,etcd,master   13m   v1.21.3+k3s1
```

## K8ssandra - lightweight

When following the boilerplate k8ssandra.io installation guide we get a full blown cluster with monitoring and all the bangs and whistles with minimum effort. But this adds on a lot of additional features and complexity that for a simple use case we do not need. To get aquainted with k8ssandra and to have a lightweight develoment installation. The following steps are sufficient.

### Install HELM

We need to pick one component from the k8ssandra HELM chart, namely the k8ssandra operator. For this we need HELM.

Get the HELM archive from the helm website.
```
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

You output should be similar to:
```
Downloading https://get.helm.sh/helm-v3.7.1-linux-amd64.tar.gz
Verifying checksum... Done.
Preparing to install helm into /usr/local/bin
helm installed into /usr/local/bin/helm
```

Verify your helm by running....`helm`!

Awesome. Time for k8ssandra 💪

### k8ssandra

First up, we need the helm k8ssandra repository since we need a component that we will install using helm.
```
helm repo add k8ssandra https://helm.k8ssandra.io/stable
helm repo update
```

☝️ `helm repo update` ensures we have the latest information from the k8ssandra repository.

Next up we install only the cass-operator and we install it in the cass-operator namespace.
The cass-operator enables us to spin up cassandra datacenters and manage them.
```
helm install cass-operator k8ssandra/cass-operator -n cass-operator --create-namespace
```

Our output should looke like this:
```
NAME: cass-operator
LAST DEPLOYED: Thu Nov 25 21:28:07 2021
NAMESPACE: cass-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

And we should not have a cassandradatacenters kubernetes object!
```
kubectl get cassandradatacenters.cassandra.datastax.com -n cass-operator
```

Next up it is time to create a minimal example of a cassandra datacenter. For this we take the example-cassdc-minimal.yaml from https://raw.githubusercontent.com/k8ssandra/cass-operator/master/operator/example-cassdc-yaml/cassandra-3.11.x/example-cassdc-minimal.yaml, but we update it with a custom local-path storage class so we can run on k3d using local storage as a storage backend.

See: [example-cassdc-minimal-local-path-storage.yaml](example-cassdc-minimal-local-path-storage.yaml#L15-L21)

Apply it!
```
kubectl -n cass-operator apply -f example-cassdc-minimal-local-path-storage.yaml
```

Your output should look like this:
```
cassandradatacenter.cassandra.datastax.com/dc1 created
```

And after a little while our cassandra datacenter should come up...
```
kubectl get pods -n cass-operator 
...
NAME                            READY   STATUS    RESTARTS   AGE
cass-operator-99b74bdd7-q89zb   1/1     Running   0          20m
cluster1-dc1-default-sts-0      1/2     Running   0          4m6s
cluster1-dc1-default-sts-1      1/2     Running   0          4m6s
cluster1-dc1-default-sts-2      1/2     Running   0          2m56s
```

But we only get one container running per pod!! That is not good, let's check out what is going on!

Let's check the container logs for our pods:
```
kubectl logs -n cass-operator cluster1-dc1-default-sts-0 --container cassandra
...
WARN  [epollEventLoopGroup-98-2] 2021-11-26 14:52:12,295 Loggers.java:39 - [s93] Error connecting to Node(endPoint=/tmp/cassandra.sock, hostId=null, hashCode=788c5c18), trying next node (FileNotFoundException: null)
INFO  [nioEventLoopGroup-2-2] 2021-11-26 14:52:12,296 Cli.java:617 - address=/10.42.2.7:54346 url=/api/v0/metadata/endpoints status=500 Internal Server Error

kubectl logs -n cass-operator cluster1-dc1-default-sts-0 --container server-system-logger
...
ERROR [main] 2021-11-26 10:40:42,493 CassandraDaemon.java:803 - Exception encountered during startup
org.apache.cassandra.exceptions.ConfigurationException: Unable to check disk space available to /opt/cassandra/data/commitlog. Perhaps the Cassandra user does not have the necessary permissions
        at org.apache.cassandra.config.DatabaseDescriptor.applySimpleConfig(DatabaseDescriptor.java:498) ~[apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.config.DatabaseDescriptor.applyAll(DatabaseDescriptor.java:324) ~[apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.config.DatabaseDescriptor.daemonInitialization(DatabaseDescriptor.java:153) ~[apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.config.DatabaseDescriptor.daemonInitialization(DatabaseDescriptor.java:137) ~[apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.service.CassandraDaemon.applyConfig(CassandraDaemon.java:680) [apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.service.CassandraDaemon.activate(CassandraDaemon.java:622) [apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.service.CassandraDaemon.main(CassandraDaemon.java:786) [apache-cassandra-3.11.11.jar:3.11.11]
Caused by: java.nio.file.AccessDeniedException: /opt/cassandra/data/commitlog
        at sun.nio.fs.UnixException.translateToIOException(UnixException.java:84) ~[na:1.8.0_312]
        at sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:102) ~[na:1.8.0_312]
        at sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:107) ~[na:1.8.0_312]
        at sun.nio.fs.UnixFileStore.devFor(UnixFileStore.java:57) ~[na:1.8.0_312]
        at sun.nio.fs.UnixFileStore.<init>(UnixFileStore.java:64) ~[na:1.8.0_312]
        at sun.nio.fs.LinuxFileStore.<init>(LinuxFileStore.java:44) ~[na:1.8.0_312]
        at sun.nio.fs.LinuxFileSystemProvider.getFileStore(LinuxFileSystemProvider.java:51) ~[na:1.8.0_312]
        at sun.nio.fs.LinuxFileSystemProvider.getFileStore(LinuxFileSystemProvider.java:39) ~[na:1.8.0_312]
        at sun.nio.fs.UnixFileSystemProvider.getFileStore(UnixFileSystemProvider.java:368) ~[na:1.8.0_312]
        at java.nio.file.Files.getFileStore(Files.java:1461) ~[na:1.8.0_312]
        at org.apache.cassandra.io.util.FileUtils.getFileStore(FileUtils.java:682) ~[apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.config.DatabaseDescriptor.guessFileStore(DatabaseDescriptor.java:1087) ~[apache-cassandra-3.11.11.jar:3.11.11]
        at org.apache.cassandra.config.DatabaseDescriptor.applySimpleConfig(DatabaseDescriptor.java:493) ~[apache-cassandra-3.11.11.jar:3.11.11]
        ... 6 common frames omitted
```

Uh oh, looks like some filesystem permission errors. Remember we are using local-path storage backend so maybe our storage backend is not giving the correct permissions to our cassandra user.

The local-path storage backend uses a simple configuration file that contains a setup and teardown part. These parts determine how new volume's are created, and with which permissions! https://github.com/rancher/local-path-provisioner#customize-the-configmap

Let's check the current `setup` and `teardown` bits of the default local-path configuration:
```
kubectl get configmaps -n kube-system local-path-config -o yaml 
...
  setup: |-
    #!/bin/sh
    while getopts "m:s:p:" opt
    do
        case $opt in
            p)
            absolutePath=$OPTARG
            ;;
            s)
            sizeInBytes=$OPTARG
            ;;
            m)
            volMode=$OPTARG
            ;;
        esac
    done
    mkdir -m 0700 -p ${absolutePath}
  teardown: |-
    #!/bin/sh
    while getopts "m:s:p:" opt
    do
        case $opt in
            p)
            absolutePath=$OPTARG
            ;;
            s)
            sizeInBytes=$OPTARG
            ;;
            m)
            volMode=$OPTARG
            ;;
        esac
    done
    rm -rf ${absolutePath}
```

Looks like we have our culprit:
```
    mkdir -m 0700 -p ${absolutePath}
```

This is creating new volume's with limited access permissions, we need to relax these so that our cassandra user in our cassandra pods can write and read from our local-path storage volume's.

Included here is a an altered version of the local-path configmap with relaxed permissions: [local-path-config-relaxed-permissions.yaml](local-path-config-relaxed-permissions.yaml)

**Remember that this is for development purposes, do not use these permissions in live systems**

Let's apply our updated config:
```
kubectl apply -f local-path-config-relaxed-permissions.yaml
```

And redeploy our cassandra datacenter:
```
kubectl delete cassandradatacenters.cassandra.datastax.com dc1 -n cass-operator
kubectl -n cass-operator apply -f example-cassdc-minimal-local-path-storage.yaml
```

After some time our cassandra datacenter pods should come up, working, with permission to write to local-path storage! 🚀
```
kubectl get pods -n cass-operator
NAME                            READY   STATUS    RESTARTS   AGE
cass-operator-99b74bdd7-q89zb   1/1     Running   1          18h
cluster1-dc1-default-sts-0      2/2     Running   0          3m4s
cluster1-dc1-default-sts-1      2/2     Running   0          3m4s
cluster1-dc1-default-sts-2      2/2     Running   0          3m4s
```

This concludes setting up a lightweight 3 node cassandra datacenter cluster user only the k8ssandra operator on k3d using local-path storage.
