# Introduction to Cloud Native #

### **What is Cloud Native?**  <hr/>

***The Cloud Native Computing Foundation(CNCF)***  defines Cloud Native as technologies that empower organizations to build and run scalable applications in modern, dynamic environments 
such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.

**So simply defined, cloud-native is building an application for the cloud by making efficient use of the resources the cloud provides.** 

### **Need for cloud-native**  <hr/>

1) Cloud-native applications are different from the traditional applications that run in our data centers. 
The applications that are designed traditionally  are not built keeping cloud compatibility in mind, this hinders the smooth functioning of the application.<br/>

2) So, we need a new architecture for our applications to utilize the benefits of the cloud. There is a need to design the applications keeping the cloud in mind and take advantage of several services the cloud provides.<br/>

3) Also Applications built on the philosophy and principles of cloud native can still be extended to the on-premises server. Cloud Native gives us that extended flexibility. An application that is deployed on cloud can be deployed on-prem if it is managed well and done right.



### **Why Cloud Native?**   <hr/>

Since the cloud reduces the overhead cost of owning a server and configuring it to run our application, it makes more sense to use a cloud service to run our application which makes the whole process easy.
The cloud offers various services that can be utilied to make our applications more efficient.<br/><br/>
Some of the various service included with a cloud : 
- Isolation
- Scalability
- Value-added cloud services 

***Isolation***
1) Isolation refers to the fact that a small part of rather large application can be built in isolation , and many such isolated parts together constitute of the application. These isolated parts of the application communicate over the network, most commonly using API's.
2) The ability to create parts ( microservices ) of a large application in isolation helps in many factors of development and operations for example scalability, debugging, etc.
3) So for example, in the case, when there is a bug or error in the application, you know which component to fix and this also avoids any side effects as the components are all unrelated pieces of code.

***Scalability***
1) Simply deploying your application on the cloud does not make it cloud-native. To be cloud native it should be able to take full benefits of the cloud. One of the key features would be Scalability.
2) 2) In today's dynamic world it is not quite enough for the application to just perform as intended, but it should be able to handle the fluctuating traffic it recieves, i.e. **Ability to handle a sudden increase in traffic**, In such cases the application should be able to perform well without breaking down.
3) To achieve this, a cloud native application runs in multiple runtimes spread across multiple hosts. The applications should be designed and architected in a way that they support multi regional, active-active deployments.

***Value Addition***
1) By using the value-added services provided by the cloud provider, we will get to know all the available options on the cloud and we can also learn about all the new services. This will help us to take good long-termed decisions.
2) We can reduce the operational risk and get things done at greater velocity by leveraging the value-added services that are available on the cloud.

#### So to conclude cloud-native is building our application to be run on the cloud and make use of the various services provided by the cloud. ####

***RESOURCES***
- [IBM's introduction to cloud-native article](https://ibm.github.io/cloud-enterprise-examples/concepts/cloud-native-overview/)
- [Cloud Native Computing Foundation on What is Cloud Native and Why Should I Care?](https://www.youtube.com/watch?v=d_8Vly4_ofo)
