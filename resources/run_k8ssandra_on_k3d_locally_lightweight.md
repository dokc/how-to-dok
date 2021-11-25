# How to run k8ssandra locally using k3d - lightweight

This guide describes how to run k8ssandra locally on k3d.

It is a lightweight, stripped down bare minimum k8ssandra installation intended to walk through the process of usin k3d locally as a development environment and using only single components from the k8ssandra HELM chart.

**Docker is required on your machine and needs to be running for k3d**

What do we need to get this up and running:
* Docker
* HELM
* K3D
* K8ssandra
* kubectl

### kubectl

kubectl is the command line tool to interface and talk to kubernetes clusters. We will need it to check and perform operations on our k3d cluster. Let's install it!
There are many install options listed on the kubernetes [website](https://kubernetes.io/docs/tasks/tools/) but we are focusing here on **linux**.

The below commands download the kubectl binary, enable it to be executed by changing permissions and move the binary to the `.local/bin` folder on your machine from where it is available to your from everywhere on your system (for your user).

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
mv ./kubectl ~/.local/bin/kubectl
```

After this check you can run `kubectl`!

Next up: k3d

### k3d
Let's start by installing k3d.

The below command downloads the k3d install script from the rancher/k3d repository and using the TAG=v4.4.8 installs that version of k3d on our local system.

Make sure to check the install.sh script: *Do not blindly execute downloaded shell scripts.*

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


