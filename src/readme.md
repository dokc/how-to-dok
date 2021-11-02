# What does this do?

This skeletal structure gives us a rough structure to connect to cassandra database running in our container, the express framework will be used as the backend framework in our project and through this DB configuration, we'll be able to directly execute NoSQL queries in JavaScript instead of CQL. This can be very useful for developers as everything is simplified in one language.

# How to create a model?

Read the documentation for the [schema](https://express-cassandra.readthedocs.io/en/stable/installation/)

Multiple model structures can be created using this!

# Running the databse
 - Install yarn and npm
 - ```sh
    yarn add express-cassandra nodemon
    ```
 - To create the database , run the docker compose file
 ```sh
    docker compose up
```
 - To run the ORM 
 ```sh
    yarn database
```
 - One instance of person gets created and synchronized with the DB 
