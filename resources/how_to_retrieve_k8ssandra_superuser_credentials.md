# How to retrieve K8ssandra superuser credentials ?

## Before starting 

Before proceeding further just make sure you have your K8ssandra cluster up and running. To check the status of your pods run: 

```sh
kubectl get pods
```

*Your output should look like this:*
```sh
NAME                                                   READY   STATUS    RESTARTS   AGE
dok-k8ssandra-kube-prometh-operator-6fdf96f759-dqhmb   1/1     Running   0          9h
prometheus-dok-k8ssandra-kube-prometh-prometheus-0     2/2     Running   0          9h
dok-k8ssandra-dc1-stargate-55fb98ff88-6lhm2            1/1     Running   14         9h
dok-k8ssandra-grafana-5b8b6986f4-h7js9                 2/2     Running   0          9h
dok-k8ssandra-dc1-default-sts-0                        2/2     Running   0          39m
dok-k8ssandra-cass-operator-84549dd7d6-b42lq           1/1     Running   9          9h
```

---

## Retrieve K8ssandra superuser credentials

You’ll need the K8ssandra superuser username and password in order to access Cassandra utilities and do things like generating Stargate access token to connect to Cassandra, accessing Cassandra using CQLSH, etc. 


**:white_check_mark: Step 1: Retrieve the K8ssandra superuser `username` and `password`:**

  - To extract the `username` execute the following command:

    ```sh
    kubectl get secrets <deployment/cluster-name>-superuser -o jsonpath="{.data.username}"
    ```

    In my case, I have kept my `cluster-name` as `dok-k8ssandra`, so my command will look like:

    ```sh
    kubectl get secrets dok-k8ssandra-superuser -o jsonpath="{.data.username}"
    ```

    *Your output should look like this:*
    ```sh
    ZG9rLWs4c3NhbmRyYS1zdXBlcnVzZXI=
    ```

  - To extract the `password` execute the following command:

    ```sh
    kubectl get secrets <deployment/cluster-name>-superuser -o jsonpath="{.data.password}"
    ```

    In my case, I have kept my `cluster-name` as `dok-k8ssandra`, so my command will look like:

    ```sh
    kubectl get secrets dok-k8ssandra-superuser -o jsonpath="{.data.password}"
    ```

    *Your output should look like this:*
    ```sh
    WmdsSDNkdDhqVTJZem9ldGdYelI=
    ```
   
       **The credentials you extracted here are encoded, so before using them you need to decode them using base64.**  
       
    
**:white_check_mark: Step 2: Decoding the K8ssandra superuser `username` and `password`:**

  - Decoding `username` using base64:
    
    If you are using Ubuntu CLI, you can run the following command:
    
    ```sh
    echo <encoded username> | base64 --decode
    ```
    
    If this command dosen't works on your CLI, you can try using the online base64 [decoder](https://www.base64decode.org/).
    
    *Your decoded username should look like this:*
    ```sh
    dok-k8ssandra-superuser
    ```

  - Decoding `password` using base64:
    
    If you are using Ubuntu CLI, you can run the following command:
    
    ```sh
    echo <encoded password> | base64 --decode
    ```
    
    If this command dosen't works on your CLI, you can try using the online base64 [decoder](https://www.base64decode.org/).
    
    *Your decoded password should look like this:*
    ```sh
    ZglH3dt8jU2YzoetgXzR
    ```
    
Awesome, So now we have our decoded credentials ready to use for accessing Cassandra utilities. Let's see an example where we need to use them to generate a Stargate access token to access Cassandra.

---

## Generate a Stargate access token


Stargate provides Document, REST and GraphQL APIs for CRUD access to data stored in Apache Cassandra. In order to use any of the API, an authorization token must be generated to access the interface.

**:white_check_mark: Step 1: Port forwarding Stargate Service:**

Run the `kubectl port-forward` command to forward the ports for CQLSH and Stargate access:
```sh
kubectl port-forward svc/dok-k8ssandra-dc1-stargate-service 8080 8081 8082 8084 8085 9042 
```

*Expected output:*
```sh
Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
Forwarding from 127.0.0.1:8081 -> 8081
Forwarding from [::1]:8081 -> 8081
Forwarding from 127.0.0.1:8082 -> 8082
Forwarding from [::1]:8082 -> 8082
Forwarding from 127.0.0.1:8084 -> 8084
Forwarding from [::1]:8084 -> 8084
Forwarding from 127.0.0.1:8085 -> 8085
Forwarding from [::1]:8085 -> 8085
Forwarding from 127.0.0.1:9042 -> 9042
Forwarding from [::1]:9042 -> 9042
```

Note that the port for the auth service is 8081, to which we will make our POST request to get auth token.


**:white_check_mark: Step 2: Generate an auth token:**

We will use cURL to access the REST interface to generate the needed token. Execute the command below by replacing the `<k8ssandra-username>` and `<k8ssandra-password>` with the decoded credentials you retrieved in the previous steps.

Command:

```sh
curl -L -X POST 'http://localhost:8081/v1/auth' -H 'Content-Type: application/json' --data-raw '{"username": "<k8ssandra-username>", "password": "<k8ssandra-password>"}'
```

*You should receive a token in the response similar to this:*

```sh
{"authToken":"f9e6208d-805c-48b0-86a0-40f33996e94a"}
```
**_Never share this with anyone, it is a secret token_**


