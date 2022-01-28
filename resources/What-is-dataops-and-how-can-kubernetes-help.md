# Introduction to DataOps
![DataOps](https://www.eweek.com/wp-content/uploads/2020/10/DataOps.jpg)

### **What is DataOps?**
<b><i>DataOps</i></b> is the orchestration of people, processes, and technology to deliver trusted, business-ready data to data citizens, operations, and applications throughout the data lifecycle. With properly governed data, businesses can comply with complex regulations, data privacy and ensure artificial intelligence (AI) model accuracy by monitoring data quality.</br>

This is the definition available on the web. It’s very complex for beginners, isn't it? So to put it in a brief:</br>

 - DataOps brings together data scientists, analysts, developers, and operations to work on the entire product/service lifecycle, from the design stage to production support.
 -  Sounds like the DevOps definition...But! the goal of DataOps is to make data analytics more efficient. To do so, DataOps adopts Agile Development principles, thereby improving the efficiency and effectiveness of the data teams and users.
 - DataOps combines principles from <b><i>DevOps, Agile Development, and Lean manufacturing.</i></b> Think of it as a water pipeline; your goal is to keep the water flowing in spite of all the plumbing work you carry out.

 And here comes two new concepts/topics Lean Manufacturing and Agile Development. Let's see one by one:</br>

 ### ***What is Lean Manufacturing?***
 <img src="https://pcigroup.com/wp-content/uploads/2020/12/Lean-5s-Quality-Gears-600x558-1.jpg" alt="drawing" style="width:350px;"/></br>
 <!-- ![lean manufacturing](https://pcigroup.com/wp-content/uploads/2020/12/Lean-5s-Quality-Gears-600x558-1.jpg) -->
 - Lean manufacturing is a production process based on an ideology of maximising productivity while simultaneously minimising waste within a manufacturing operation. The lean principle sees waste is anything that doesn’t add value that the customers are willing to pay for.</br>
 - Manufacturing happens in pipelines—raw materials flow through various manufacturing workstations to be transformed into finished goods.


## ***What is Agile?***

Let us say <b>Mr. X</b> is a developer. So, one day Bart(Client) comes to Mr. X and said:

<b>Bart:</b> Hi Mr. X! I want an application for the DOK community.</br> 
<b>Mr. X:</b> Definitely Bart! What are the features that you would like to see in the application?</br>
<b>Bart:</b> Yeah! The primary feature is it has to collect all the comments from all socials of dok community.</br>
<b>Mr.X:</b> Fine! I will start working on your application.</br>

After a year… He delivers the project in one go.

<b>Mr.X:</b> Hi Bart! Your application is ready.</br> 
<b>Bart:</b> Yeah well, Why don’t you add another feature like collect all comments and filter the most common comments.

This would be frustrating. Because developing software may take months or years.

But what if happened like this. While Mr.X is doing his application Bart may call or email him that I want this so and so feature.

So this is where agile comes into play:
<!-- <img src="http://www.agilenutshell.com/assets/what-is-agile/incrementally-over-all-at-once.png" alt="image" /> </br> -->

![image](data:image/jpeg;base64,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)
- Agile is a time-boxed, iterative approach to software delivery that builds software incrementally from the start of the project, instead of trying to deliver it all at once near the end.
![image](https://www.pmis-consulting.com/wp-content/uploads/2016/05/Agile-Project-Management-Method-e1523609638465.png)
- It works by breaking projects down into little bits of user functionality called user stories, prioritizing them, and then continuously delivering them in short two-week cycles called iterations.
- This means that data teams can publish new analytics in shorter increments, referred to as sprints, which significantly reduces wait times. Hence DataOps adopt an agile environment.

## **What are the challenges dataops trying to resolve?**

![image](https://static.wixstatic.com/media/22abe5_68fba4e3c7c944e1808fea741006a72a~mv2.png/v1/fill/w_974,h_300,al_c/22abe5_68fba4e3c7c944e1808fea741006a72a~mv2.png)

- The problem is that many organizations aren’t exactly clear on the most efficient approach to data collection and analytics. They often take a seemingly all-encompassing approach based on the principle of “we’ll collect the data and then figure out what to do with it,” that can do more harm than good.
- They then have a data team who is supposed to miraculously turn garbage into gold, which generally requires far more effort than necessary and rarely leads to the desired results. Of course, this makes it virtually impossible to deliver actionable insights on a schedule that can keep up with the demands of a DevOps team that’s pushing to get their code to market.
- DataOps takes this jumbled mess and turns it into a smooth process where data teams aren’t spending their time trying to fix problems. They aren’t wasting their time trying to turn poor raw data into something usable. Instead, they can focus on what matters, namely providing actionable insights.
- DataOps ensures that the raw data coming in is useable, it ensures that the results are accurate, it focuses on the value of people and working together, and it keeps the data team at the center of the company’s strategic objectives. After all, they no longer take months to come up with the required insights.

Now here comes the big question of how Kubernetes help DataOps. Before that let us know <i>what is kubernetes in a nutshell</i>.

Let’s say you created an application(e.g Pokemon go) and decided to share it with the world. How can you do that? by deploying it to the internet. So you deployed this application into 5 different servers using docker. And your application starts getting massive traffic even you are not imagined. Millions of users started using. You are happy on one side simultaneously you are sad because you have to scale up the servers because 5 are not enough for such massive traffic. Now you need to scale up fast and make sure all containers restart if they die. And you will be gone out of control.</br>
 <i>This is where Kubernetes comes into play.</i>

Kubernetes is an open-source <b><i>container orchestration system for automating software deployment, scaling, and management.</i></b>

- A Kubernetes cluster consists of a set of worker machines, called <i>nodes</i>, that run containerized applications.
![image](https://www.unixarena.com/wp-content/uploads/2019/05/Master-In-Charge-for-K8s-Cluster.png)
- Every cluster has at least one worker node. Hence if a node fails, your application will still be accessible from the other nodes as in a cluster, multiple nodes are grouped.

### Why should you use Kubernetes for DataOps?
     
     > Service deployment and adjustment.
     > Storage Alternatives.
     > Automatic Selection.
     > Recovery Mechanisms.
     > Constant Monitoring. and many more...

Kubernetes environment is persistently becoming the leading platform for cloud computing. Consumers looking for dynamically-scheduled container-oriented <b>DataOps</b> solutions should consider Kubernetes-as-a-Service. 


Just like Devops, DataOps is also a methdology it's not a tool.









