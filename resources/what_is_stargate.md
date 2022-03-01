♠ Let's understand Stargate

# What are APIs? 🚀

API stands for an **Application programming interface**. 

🔅 Consider an example below:

![](https://cdn-images-1.medium.com/max/880/1*PFEHu46MDh1sajTJgeMSqg.png)

A. Sends Request -> Here customer orders food, the waiter sends the request to the chef <br> 
B. Sends Respond -> Then chef makes the dish and gives(responds) it to the customer via waiter <br>
**Here, the waiter is acting as an API.**

Hope the above example explains what an API is, let's understand it from the developer's perspective.

![](https://cdn-images-1.medium.com/max/880/1*5IQ52kZAIfxsIH4uwOcyQg.png)

**So here, the customers mean the applications send requests to the server via API and then the server responds to them.**

# What is Stargate API?🚀

🔅 Stargate is an open-source data gateway that sits between your app and your databases. Stargate brings together an API platform and data request coordination code into one OSS project. In simple words, it is a framework used to customize all aspects of data access. It is deployed between client applications and a database to provide an abstraction layer that can be used to shape your data access to fit your application’s needs.

![](https://cdn-images-1.medium.com/max/880/1*pBJ2kPKU2JRkhWtRn1eGPg.png)


# How to use it in our cluster? ⚡
👉🏻 In order to use Stargate API in our existing cluster, we need to generate access tokens. <br>
[Get cluster up and running](https://dokc.github.io/Helm-Charts/) <br>
[How to get access token?](https://github.com/dokc/how-to-dok/blob/main/resources/how_to_retrieve_k8ssandra_superuser_credentials.md)

Now we're ready to use the REST API for CRUD operations. You can use POSTMAN as well!!

## Check existing keyspace

👉🏻 A **keyspace** is a container for which a replication factor defines the number of data replicas the database will store. Tables consist of columns that each have a name and a defined data type. Multiple tables are contained in a keyspace, but a table cannot be contained in multiple keyspaces. 

**Since we are connecting to a Cassandra database with an existing schema, we can directly see how many keyspaces are present**

```
curl -s -L -X GET localhost:8082/v2/schemas/keyspaces \              
-H "X-Cassandra-Token: $AUTH_TOKEN"   \
-H "Content-Type: application/json"  \
-H "Accept: application/json"
```

👉🏻 The authorization token and the content type are passed with `--header`. 
The token must be identified  `X-Cassandra-Token` so that cluster recognizes the token and its value. For shorthand, `cURL` can use `-L` for `--location`, `-X` for `--request`, and `-H` for `--header`

Output :

```
{
"data":[
        {"name":"system_schema"},
        {"name":"system"},  
        {"name":"system_distributed",
         "datacenters":[
          {"name":"dokc","replicas":2}
          ]},
        {"name":"system_traces",
         "datacenters":[
            {"name":"dokc","replicas":2}
            ]},
        {"name":"system_auth",
         "datacenters":[
             {"name":"dokc","replicas":2}
          ]},
        {"name":"stargate_system"},
        {"name":"data_endpoint_auth"}       ]
}
```
