![Argo](https://argoproj.github.io/argo-workflows/assets/argo.png)

Argo is a family of Open-Source tools for Kubernetes to run workflows, manage clusters, and do GitOps. Argo was accepted as CNCF incubating Project back in 2020.
Argo consists of four sub-projects, including:

1. <b>[Argo CD –](https://argo-cd.readthedocs.io/en/stable/)</b>
    Support for declarative GitOps-based deployment of any Kubernetes resource, including Argo Events, services, and deployments across multiple k8s clusters.

2.  <b>[Argo Events –](https://argoproj.github.io/argo-events/)</b>
    Events-based dependency manager for Kubernetes.

3.	<b>[Argo Workflows –](https://argoproj.github.io/argo-workflows/)</b>
    Container native workflow engine for Kubernetes supporting both DAG and step-based workflows.

4.	<b>[Argo Rollouts –](https://argoproj.github.io/argo-rollouts/) </b>
    Support for declarative progressive delivery strategies such as canary, blue-green, and more general forms of experimentation.

<br>

The __Workflow__ is the most important resource in Argo and serves two important functions:

        1. It defines the workflow to be executed.
        2. It stores the state of the workflow.

<br>
<br>

# __Argo Workflows__
Argo Workflow is an open-source container-native workflow engine for orchestrating parallel jobs on Kubernetes. Argo Workflows is implemented as a Kubernetes CRD (custom resource definitions). Argo Workflows is part of the Argo Family.

<br>

## _Why Argo Workflow?_

<br>
Argo has a vigorous workflow engine for Kubernetes that enables the implementation of each step in a workflow as a container.
This cloud-native workflow engine can run 10,000s concurrent workflows, each with 1,000s of steps.
Argo Workflows is actively used in Production by well over 100 organizations, including Adobe, Alibaba Cloud, Google, GitHub, IBM, Intuit, NVIDIA, New Relic, and RedHat.
Argo is designed to run on top of k8s. Not a VM, not AWS ECS, not Container Instances on Azure, not Google Cloud Run or App Engine. This means you get all the good of k8s.

<br>

    >	Designed from the ground up for containers without the overhead and limitations of legacy VM and server-based environments.
    >	Cloud agnostic and can run on any Kubernetes cluster.
    >	Easily orchestrate highly parallel jobs on Kubernetes.
    >	Argo Workflows puts a cloud-scale supercomputer at your fingertips!

<br>
<br>


## <b> Uses of Argo Workflows – </b>

<br>

    •	CI/CD
    •	Serverless
    •	Data Science
    •	Batch Processing
    •	Data Processing
    •	Machine Learning
    •	Infrastructure Automation


<br>
<br>


# <b> How does Workflow work on Kubernetes? </b>

Argo is implemented as a Kubernetes CRD (Custom Resource Definition). As a result, Argo workflows can be managed using ``` kubectl ```. 
<br>

A workflow is a series of steps that can run one after another or in parallel. Each step of the Workflow may have its own container. This means you can put anything into a container image and then into an Argo Workflow. Besides this Argo Workflow allows the user to tell the order of steps it provides multi-step workflows as a sequence of tasks or capture the dependencies between tasks using a graph (DAG).

<br>

### <b>Note:</b> 
    Argo events and Argo Workflows for the most part Works simultaneously. Once the event has been registered, it will trigger the action: e.g., Argo Workflow.

<br>

## Few key concepts :
    • Kubernetes API (application programming interface) - The Kubernetes API lets you query and manipulates the state of objects in Kubernetes.

    • Kubernetes CR (Custom Resources) - Custom resources are extensions of the Kubernetes API. A custom resource is an object that extends the Kubernetes API or allows you to introduce your own API into a project or a cluster

    •  Kubernetes CRD (Custom Resources Definition) - A custom resource definition (CRD) file defines custom resources and lets the API server handle the entire process. Custom resources definition (CRD) is a powerful feature that enables users to add their own custom objects to the Kubernetes cluster and use it like any other native Kubernetes object.

    • Namespaces - Namespaces provides a mechanism for isolating groups of resources within a single cluster.

    • Entrypoint - The first step to execute when running a workflow

    • Workflow: A Kubernetes resource defining the execution of one or more template. Workflows are named.

    • Template: A step, steps or DAG.




[Example Workflow Template To echo "Hello World"](https://github.com/argoproj/argo-workflows/blob/master/examples/README.md)
