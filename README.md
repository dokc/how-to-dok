![](https://dok.community/wp-content/uploads/2021/03/WebKubernetes-estrecho.png "Data on Kubernetes")
# How To (Get) Data on Kubernetes

This repository is intended as a place to develop knowledge, practice, and examples about how to run various data use cases on Kubernetes.

## A Cloud Native Data Workflow on Kubernetes using Argo Workflows and K8ssandra

This project is about:
- Using cloud-native data services on Kubernetes
- Using a cloud-native database on Kubernetes for storing data
- Using a cloud-native workflow engine to determine how to handle and move data
- Showing how a simple app or script can be used on Kubernetes as part of a data pipeline
- Showing how to develop custom code components for use in Kubernetes
- Showing which depending services you might encounter and need when wanting to start running data workloads on Kubernetes

### Proposed Architecture
![proposed architecture](static/how_to_dok_proposed_architecture.png)

### Components
**Rap as configuration (Rap as Code - RaC)**
This concerns the input data for our pipeline. We want to move data around rap lyrics, artist, meetup etc through our data pipeline to destinations.

**Rap datamodel**
What does the data that we are going to be moving around look like, what standard does it adhere, which format is it, how do we describe the fields we have in for our datamodel. The datamodel should be the source of truth regarding what our data object looks like within our system.

**A piece of code / app to write data to a database**
This can be written in any language and should be able to write input data to our destination database.

**A container image containing this code that we can run on kubernetes**
With Argo workflows it is not necessary to build a seperate container for our custom code but it is a good exercise in developing and building components to run your Kubernetes environment.

**A worfklow engine (Argo) to run this container image on a schedule or on an event**
Argo workflows is a cloud-native workflow engine with which we can author workflows. A workflow with Argo is a kubernetes resource object that describes how we go from a startpoint to a desired endpoint. This worfklow will be responsible for orchestrating moving data into our destination and handle the running of the steps required. In it simplest form it can be just one step and may look like this: Start -> (Pick up input data and write to destination) -> Success, a more complex form could be: Start -> (Check if data already in destination) -> (Validate data adheres to schema) -> (Test data for data quality) -> (Calculate additinal metrics and insights on input file) -> (Write to destination) -> (Orchestrate metadata) -> (Report to end users) -> Success

**Blob storage that has the Rap files**
We need to have a way to supply new input data to our pipeline. This data should be made available, a possible option here is blob storage. We should see if we can run blob storage on Kubernetes with for example MinIo

**A super cool k8s DB K8ssandra**
The initial destination for our data. A K8ssandra cluster configuration using the K8ssandra operator. That is ready for accepting our data.

**Build and release pipeline for releasing container image**
How do we ensure we get our container image built and released automatically so that the services in our cluster can use it? Via CI/CD
CI/CD can be an interesting topic in itself per component but lets focus on one use case first.

#### What should the outcome or products of this project be?

Ideally what we are looking for is documentation, best practices, example resources (code, k8s resource definitions), tutorials on how to achieve running a cloud-native data workflow on Kubernetes.
Together this should provide and overview of how to run cloud-native data workflows on Kubernetes.

### Knowledge needed

We can identify some specific knowledge areas
- Node.js and Express.js
- Basic knowledge of Docker and Containerization
- General Kubernetes knowledge
- Developing services for/on Kubernetes
- Argo Workflow
- K8ssandra
- Backend code development (for writing pieces of code that are part of the data pipeline workflow)
- Github workflow
- Local GIT flow
- CI/CD Automation

### Reference articles

This section contains reference articles and material touching on or relating to items, services or knowledge, explicit or implicit which is helpfull in the context of this project.

### Doubts and Uncertainty

Q: Who is going to develop the components?

A:

Q: How do we onboard new members to contribute to this project?

A:

Q: Who is going to maintain the repository?

A:

Q: How do we keep information in this repository up to date?

A:

Q: How do we ensure we are inclusive of all levels of contributors?

A:

Q: How will we setup and handle repository git flow?

A:

### Contributing

This section contains information on how to start contributing to this project

Contributing areas:
- Documentation
- Reference materials
- Tutorials
- Kubernetes resource components
- Code
- Data schema / Data models
- Data input files (DoK Rap lyrics)
- Visual (graphs, drawings, designs, video)

### Contact

Check out the [DoK Slack channel](https://dokcommunity.slack.com/archives/C029SP0H937) for updates and discussion.  
And sign up to the update [newsletter](https://docs.google.com/forms/d/e/1FAIpQLSeNTRsesRA7-1uMyFeHMMqfG9IgdVd7soY_L4wx5WqeDUcMjA/viewform) to be able to join the bi-weekly progress calls!

 
## Thanks to all the contributors ❤️
<a href = "https://github.com/dokc/how-to-dok/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=dokc/how-to-dok"/>
</a>