# Cloud-Native Architecture #

In the [Introduction to cloud-native article](https://github.com/dokc/how-to-dok/blob/main/resources/Introduction-to-Cloud-Native.md) we concluded that cloud-native is building our application to be run on the cloud and make use of the various services provided by the cloud.</br></br>

Does that mean we need to find new ways of building our application, do we need to do something entirely different? Simple answer, **NO**. <br/> That's because cloud is made of servers, disks and networks which are the components that usually make up the traditional infrastructure.
This means that almost all the principles of the  good architectural design still apply for cloud-native architecture. </br></br>

The principle of cloud-native architecting focus on how to optimize the system for the unique capabilities of the cloud.
[Google's article on cloud-native architecture](https://cloud.google.com/blog/products/application-development/5-principles-for-cloud-native-architecture-what-it-is-and-how-to-master-it) has listed  principles for cloud-native architecture.
The following is the summary : 
- ***Design for automation***     :  Automated processes can repair, scale, deploy your system far faster than people can. <br/><br/>
- ***Be smart with state***       :  Storing of 'state', be that user data or system state is the hardest aspect of architecting a distributed, cloud-native architecture. You should therefore architect your system to be intentional about when, and how, you store state.</br></br>
- ***Favor managed services***    :  Cloud is more than just infrastructure. Most cloud providers offer a rich set of managed services, providing all sorts of functionality that relieve you of the headache of managing the backend software or infrastructure. 


Now that we know about the principles of cloud-native architecture, we now move to discuss a bit more about application archticture for the cloud.
The following are the 2 popular approaches used by developers to build their applications: <br/><br/>
**1) Monolithic Architecture**</br>
**2) Microservices Architecture**

### **Monolithic Architecture**  <hr/>
Monolithic Architecture is like a big container, wherein all the software components of an application are assembled together and tightly coupled, i.e., components are dependent on each other.
For example if we take an e-commerce application, the different components that make this app include : 
-  Authentication 
-  Inventory for all the goods
-  User database
-  Payment gateway etc.

In monolithic architecture all these components are developed as a part of one single application. This type has it's fair share of advantages and disadvantages.

- Latency (delay by the system in response to a request) , As the whole application is tightly bound, there is very little latency when using monolithic architecture.
- In terms of the usage of programming language , Monolithic software need to be programmed using the same language throughout as the whole system is bound together.
- Also error finding and debugging becomes very difficult in such architecture as we start to add more components to our application.

Now with the advent of the cloud, developers came up with a new form of architecture , the microservices architecture.

### **Microservices Architecture** <hr/>
Microservices (or microservices architecture) are a cloud native architectural approach in which a single application is composed of many loosely coupled and independently deployable smaller components, or services.</br>
These services include : 
- have their own technology stack, inclusive of the database and data management model.
- communicate with one another over a combination of REST APIs, event streaming, and message brokers.
- are organized by business capability, with the line separating services often referred to as a bounded context.

The difference between microservices and monolithic architecture is that microservices compose a single application from many smaller, loosely coupled services as opposed to the monolithic approach of a large, tightly coupled application.

So , What architecture is the best? Well that depends on the application we are building and the other factors associated with the application.

***RESOURCES***
- [Google's article on cloud-native architecture](https://cloud.google.com/blog/products/application-development/5-principles-for-cloud-native-architecture-what-it-is-and-how-to-master-it)
- [IBM's article on microservices](https://www.ibm.com/in-en/cloud/learn/microservices)

