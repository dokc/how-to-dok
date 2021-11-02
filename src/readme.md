# How to create a model?
Read the documentation for the (schema)[https://express-cassandra.readthedocs.io/en/stable/installation/]

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