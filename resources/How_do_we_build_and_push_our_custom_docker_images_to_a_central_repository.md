# 🔰 How do we build and push our custom docker images to a central repository? 

## Docker 🐋
Docker is an open-source lightweight virtualization tool. It is containerizing platform in which user can run and deploy application and its dependencies and form containers to run over any linux infrastructure.

## What Exactly Is A Docker Image? 🐋
A Docker image is a read-only, inert template that comes with instructions for deploying containers. In Docker, everything basically revolves around images.An image consists of a collection of files (or layers) that pack together all the necessities—such as dependencies, source code, and libraries—needed to set up a completely functional container environment.

**Images are stored on a Docker registry, such as the Docker Hub, or on a local registry.**

## 🔰 Ways to create a custom docker image:

👉🏻 There are two ways from which we can create a custom docker image:

1. Manually by using commit command
2. Dockerfile

## 🔰 Let's take an example and built the docker image using both the ways:

👉🏻 So here we are going to **Build Apache Web Server Docker Image**

<i>Apache web server is popular open source http web server tool which is widely used for deployment of webpages. It can be installed in any operating system.</i>

## 1. Manual :

### Step 1: Get the latest Centos Docker image by using docker pull command.
`docker pull centos:7` <i>Docker pull command is used to download or pull latest image from Docker Hub repositories.</i> 
(You can work with any version or any distribution of linux)

🔅 Output :
```
7: Pulling from library/centos
2d473b07cdd5: Pull complete 
Digest: sha256:9d4bcbbb213dfd745b58be38b13b996ebb5ac315fe75711bd618426a630e0987
Status: Downloaded newer image for centos:7
docker.io/library/centos:7
```

### Step 2: To check and list all docker images
         `docker images`

🔅 Output :
```
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
centos       7         eeb6ee3f44bd   4 months ago   204MB
```

### Step 3: To run docker image we use following command <br>
👉🏻 `-i & -t` : `-i` gives an option to set the cli flag to interactive and `-t` is used to set the terminal flag. <br>
👉🏻 `--name` : This argument is used to tag a name to the running container.<br>
👉🏻 `docker run –it –name webserver centos:7`

🔅 Output :
```
[root@39a40757b33f /]# 
[root@39a40757b33f /]# 
```

### Step 4: Now install Apache webserver and it’s all dependencies <br>
👉🏻 `yum install httpd –y`

🔅 Output :
```
Loaded plugins: fastestmirror, ovl
Determining fastest mirrors
 * base: repo.extreme-ix.org
 * extras: repo.extreme-ix.org
 * updates: repo.extreme-ix.org
base                                                                                                                                                  | 3.6 kB  00:00:00     
extras                                                                                                                                                | 2.9 kB  00:00:00     
updates                                                                                                                                               | 2.9 kB  00:00:00     
(1/4): base/7/x86_64/group_gz                                                                                                                         | 153 kB  00:00:00     
(2/4): extras/7/x86_64/primary_db                                                                                                                     | 243 kB  00:00:00     
(3/4): base/7/x86_64/primary_db                                                                                                                       | 6.1 MB  00:00:02     
(4/4): updates/7/x86_64/primary_db                                                                                                                    |  13 MB  00:00:02     
Resolving Dependencies
--> Running transaction check
---> Package httpd.x86_64 0:2.4.6-97.el7.centos.4 will be installed
--> Processing Dependency: httpd-tools = 2.4.6-97.el7.centos.4 for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: system-logos >= 7.92.1-1 for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: /etc/mime.types for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: libaprutil-1.so.0()(64bit) for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: libapr-1.so.0()(64bit) for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Running transaction check
---> Package apr.x86_64 0:1.4.8-7.el7 will be installed
---> Package apr-util.x86_64 0:1.5.2-6.el7 will be installed
---> Package centos-logos.noarch 0:70.0.6-3.el7.centos will be installed
---> Package httpd-tools.x86_64 0:2.4.6-97.el7.centos.4 will be installed
---> Package mailcap.noarch 0:2.1.41-2.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

=============================================================================================================================================================================
 Package                                   Arch                                Version                                            Repository                            Size
=============================================================================================================================================================================
Installing:
 httpd                                     x86_64                              2.4.6-97.el7.centos.4                              updates                              2.7 M
Installing for dependencies:
 apr                                       x86_64                              1.4.8-7.el7                                        base                                 104 k
 apr-util                                  x86_64                              1.5.2-6.el7                                        base                                  92 k
 centos-logos                              noarch                              70.0.6-3.el7.centos                                base                                  21 M
 httpd-tools                               x86_64                              2.4.6-97.el7.centos.4                              updates                               94 k
 mailcap                                   noarch                              2.1.41-2.el7                                       base                                  31 k

Transaction Summary
=============================================================================================================================================================================
Install  1 Package (+5 Dependent packages)

Total download size: 24 M
Installed size: 32 M
Downloading packages:
warning: /var/cache/yum/x86_64/7/base/packages/apr-1.4.8-7.el7.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
Public key for apr-1.4.8-7.el7.x86_64.rpm is not installed
(1/6): apr-1.4.8-7.el7.x86_64.rpm                                                                                                                     | 104 kB  00:00:00     
(2/6): apr-util-1.5.2-6.el7.x86_64.rpm                                                                                                                |  92 kB  00:00:00     
Public key for httpd-tools-2.4.6-97.el7.centos.4.x86_64.rpm is not installed
(3/6): httpd-tools-2.4.6-97.el7.centos.4.x86_64.rpm                                                                                                   |  94 kB  00:00:00     
(4/6): mailcap-2.1.41-2.el7.noarch.rpm                                                                                                                |  31 kB  00:00:00     
(5/6): httpd-2.4.6-97.el7.centos.4.x86_64.rpm                                                                                                         | 2.7 MB  00:00:00     
(6/6): centos-logos-70.0.6-3.el7.centos.noarch.rpm                                                                                                    |  21 MB  00:00:03     
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                        6.8 MB/s |  24 MB  00:00:03     
Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Importing GPG key 0xF4A80EB5:
 Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
 Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
 Package    : centos-release-7-9.2009.0.el7.centos.x86_64 (@CentOS)
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : apr-1.4.8-7.el7.x86_64                                                                                                                                    1/6 
  Installing : apr-util-1.5.2-6.el7.x86_64                                                                                                                               2/6 
  Installing : httpd-tools-2.4.6-97.el7.centos.4.x86_64                                                                                                                  3/6 
  Installing : centos-logos-70.0.6-3.el7.centos.noarch                                                                                                                   4/6 
  Installing : mailcap-2.1.41-2.el7.noarch                                                                                                                               5/6 
  Installing : httpd-2.4.6-97.el7.centos.4.x86_64                                                                                                                        6/6 
  Verifying  : mailcap-2.1.41-2.el7.noarch                                                                                                                               1/6 
  Verifying  : apr-1.4.8-7.el7.x86_64                                                                                                                                    2/6 
  Verifying  : apr-util-1.5.2-6.el7.x86_64                                                                                                                               3/6 
  Verifying  : httpd-2.4.6-97.el7.centos.4.x86_64                                                                                                                        4/6 
  Verifying  : httpd-tools-2.4.6-97.el7.centos.4.x86_64                                                                                                                  5/6 
  Verifying  : centos-logos-70.0.6-3.el7.centos.noarch                                                                                                                   6/6 

Installed:
  httpd.x86_64 0:2.4.6-97.el7.centos.4                                                                                                                                       

Dependency Installed:
  apr.x86_64 0:1.4.8-7.el7 apr-util.x86_64 0:1.5.2-6.el7 centos-logos.noarch 0:70.0.6-3.el7.centos httpd-tools.x86_64 0:2.4.6-97.el7.centos.4 mailcap.noarch 0:2.1.41-2.el7

Complete!
```

### Step 5: Now create a webpage at location `/var/www/html/index.html`

👉🏻 ```Custom docker image created !!!```

### Step 6: Now exit from the running container using `exit` command.

 * Exit command will stop the container. Exit command of docker same as power off or shut down of our computer.

### Step 7: We have container in which apache webserver is installed and our webpage is configured. We can make a new customized docker image from the stopped docker image using `docker commit` command. Docker commit command will build our own image.

👉🏻 `docker commit <container_id or name of container> <Name of new image>:<version name>`

i.e; `docker commit webserver web:v1`

🔅 Output:

```
sha256:4b0c6ef101f8cc4674a9d2809c4baa4a5c1d839d0ea0b0832e5334aa93f993ee
```
You can see by running `docker images` command.

🔅 Output:
```
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
web          v1        4b0c6ef101f8   2 minutes ago   392MB
centos       7         eeb6ee3f44bd   4 months ago    204MB
```

### Step 8: Launching a webserver container using our customized image. <br>
👉🏻 `-p`: This argument is used to port forwarding. Which means anybody from outside who comes for 8080 its request is forwarded to port 80. Port 80 is default port number where apache webserver runs.

👉🏻 `/usr/sbin/httpd –D FOREGROUND`: This argument is command which will run when container is launched this command will start the web server

👉🏻 `docker run -p 8080:80 web:v1 /usr/sbin/httpd -D FOREGROUND`
🔅 Output :
```
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message
```

### Step 9: To See the Result using `curl IP` or you can also see on webpage `http://ip`

🔅 Output:
```
Custom docker image created!!!
```

### So this was the manual process by using commit command, we can do this simply using Dockerfile.

## 2. Dockerfile

Let's start

### Step 1: Make a directory
👉🏻 `mkdir test` and `cd test`

### Step 2: Now create a file `Dockerfile` 
(File name is hard coded do not change the file name) <br>
👉🏻 `touch Dockerfile`

### Step 3: Create a sample web page with name index.html
👉🏻 ```Custom docker image created using Dockerfile!!!```

### Step 4: Edit the Dockerfile using following instructions
```
FROM centos:7
MAINTAINER Vrukshali
RUN yum install httpd -y
COPY index.html /var/www/html/
CMD [“/usr/sbin/httpd”, “-D”, “FOREGROUND”]
EXPOSE 80
```

👉🏻 Dockerfile commands explanation:

1. **MAINTAINER** — This command is used to give the information about the author or manager who is managing this image.
`MAINTAINER Vrukshali`

2. **RUN** — Before building an image if want some configuration that needs to be present in the image. Inside the image we need to install Apache web server image the command to install that image is
`RUN yum install httpd -y`

3. **COPY** - This command is used to copy a file from host os to docker container
`COPY index.html /var/www/html`

4. **EXPOSE** - This command is used to specify the port number in which the container is running its process. Anybody can come from outside and connect to this port. Apache webserver is launched at port 80 by default that is why we need to expose container at port 80.
`EXPOSE 80`

5. **CMD** - To run a command as soon as container is launched. CMD command is different from RUN because RUN is used at the time of building an image and CMD used to run command when container is started. <br>
`/usr/sbin/httpd` - This command is used to start the web server <br>
`-DFOREGROUND` — This is not a docker command this is http server argument which is used to run webserver in background. If we do not use this argument the server will start and then it will stop. <br>
`CMD [“/usr/sbin/httpd”,” -D”,” FOREGROUND”]`

### Step 5: Build the image using docker build. 
👉🏻 `.` is Dockerfile is present n current location and `–t` option is to tag or name the image.

👉🏻 `docker build -t webserver:v1 .`

🔅 Output:
```
Sending build context to Docker daemon  3.072kB
Step 1/6 : FROM centos:7
7: Pulling from library/centos
2d473b07cdd5: Pull complete 
Digest: sha256:9d4bcbbb213dfd745b58be38b13b996ebb5ac315fe75711bd618426a630e0987
Status: Downloaded newer image for centos:7
 ---> eeb6ee3f44bd
Step 2/6 : MAINTAINER Vrukshali
 ---> Running in 88e69a0595b2
Removing intermediate container 88e69a0595b2
 ---> 369d25b8da6b
Step 3/6 : RUN yum install httpd -y
 ---> Running in 1860738988a1
Loaded plugins: fastestmirror, ovl
Determining fastest mirrors
 * base: centos.mirror.snu.edu.in
 * extras: centos.mirror.snu.edu.in
 * updates: centos.mirror.snu.edu.in
Resolving Dependencies
--> Running transaction check
---> Package httpd.x86_64 0:2.4.6-97.el7.centos.4 will be installed
--> Processing Dependency: httpd-tools = 2.4.6-97.el7.centos.4 for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: system-logos >= 7.92.1-1 for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: /etc/mime.types for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: libaprutil-1.so.0()(64bit) for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Processing Dependency: libapr-1.so.0()(64bit) for package: httpd-2.4.6-97.el7.centos.4.x86_64
--> Running transaction check
---> Package apr.x86_64 0:1.4.8-7.el7 will be installed
---> Package apr-util.x86_64 0:1.5.2-6.el7 will be installed
---> Package centos-logos.noarch 0:70.0.6-3.el7.centos will be installed
---> Package httpd-tools.x86_64 0:2.4.6-97.el7.centos.4 will be installed
---> Package mailcap.noarch 0:2.1.41-2.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

================================================================================
 Package           Arch        Version                       Repository    Size
================================================================================
Installing:
 httpd             x86_64      2.4.6-97.el7.centos.4         updates      2.7 M
Installing for dependencies:
 apr               x86_64      1.4.8-7.el7                   base         104 k
 apr-util          x86_64      1.5.2-6.el7                   base          92 k
 centos-logos      noarch      70.0.6-3.el7.centos           base          21 M
 httpd-tools       x86_64      2.4.6-97.el7.centos.4         updates       94 k
 mailcap           noarch      2.1.41-2.el7                  base          31 k

Transaction Summary
================================================================================
Install  1 Package (+5 Dependent packages)

Total download size: 24 M
Installed size: 32 M
Downloading packages:
warning: /var/cache/yum/x86_64/7/base/packages/apr-1.4.8-7.el7.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
Public key for apr-1.4.8-7.el7.x86_64.rpm is not installed
Public key for httpd-tools-2.4.6-97.el7.centos.4.x86_64.rpm is not installed
--------------------------------------------------------------------------------
Total                                              7.3 MB/s |  24 MB  00:03     
Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Importing GPG key 0xF4A80EB5:
 Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
 Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
 Package    : centos-release-7-9.2009.0.el7.centos.x86_64 (@CentOS)
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : apr-1.4.8-7.el7.x86_64                                       1/6 
  Installing : apr-util-1.5.2-6.el7.x86_64                                  2/6 
  Installing : httpd-tools-2.4.6-97.el7.centos.4.x86_64                     3/6 
  Installing : centos-logos-70.0.6-3.el7.centos.noarch                      4/6 
  Installing : mailcap-2.1.41-2.el7.noarch                                  5/6 
  Installing : httpd-2.4.6-97.el7.centos.4.x86_64                           6/6 
  Verifying  : mailcap-2.1.41-2.el7.noarch                                  1/6 
  Verifying  : apr-1.4.8-7.el7.x86_64                                       2/6 
  Verifying  : apr-util-1.5.2-6.el7.x86_64                                  3/6 
  Verifying  : httpd-2.4.6-97.el7.centos.4.x86_64                           4/6 
  Verifying  : httpd-tools-2.4.6-97.el7.centos.4.x86_64                     5/6 
  Verifying  : centos-logos-70.0.6-3.el7.centos.noarch                      6/6 

Installed:
  httpd.x86_64 0:2.4.6-97.el7.centos.4                                          

Dependency Installed:
  apr.x86_64 0:1.4.8-7.el7                                                      
  apr-util.x86_64 0:1.5.2-6.el7                                                 
  centos-logos.noarch 0:70.0.6-3.el7.centos                                     
  httpd-tools.x86_64 0:2.4.6-97.el7.centos.4                                    
  mailcap.noarch 0:2.1.41-2.el7                                                 

Complete!
Removing intermediate container 1860738988a1
 ---> c6d73b46684e
Step 4/6 : COPY index.html /var/www/html/
 ---> fec295e21fda
Step 5/6 : CMD [“/usr/sbin/httpd”, “-D”, “FOREGROUND”]
 ---> Running in 599680c1a9e8
Removing intermediate container 599680c1a9e8
 ---> cb229d67cb7d
Step 6/6 : EXPOSE 80
 ---> Running in ed9972b66ac1
Removing intermediate container ed9972b66ac1
 ---> 5ca87e671dc1
Successfully built 5ca87e671dc1
Successfully tagged webserver:v1
```

You can now run `docker images` command
Output:
```
REPOSITORY   TAG       IMAGE ID       CREATED              SIZE
webserver    v1        5ca87e671dc1   About a minute ago   392MB
centos       7         eeb6ee3f44bd   4 months ago         204MB
```

### Step 6: Run a container using docker image created by Dockerfile

`docker run –dit –p 1234:80 webserver:v1`

### Step 7: To See the Result :

`curl http://<host ip>:1234/` or on webpage `http://<host ip>:1234/`

🔅 Output :
```
Custom docker image created using Dockerfile!!!
```

## So till here we have created our custom images using both ways. Now we need to push this image to central repository, here I will be using DockerHub as central registry.

### Step 1: You need a DockerHub Account
👉🏻 You can create this on https://hub.docker.com/

### Step 2: Login to DockerHub via terminal

`docker login --username=yourhubusername --email=youremail@company.com`
👉🏻 With your own username and email that you used for the account. Enter your password when prompted. If everything worked you will get a message similar to
```
WARNING: login credentials saved in /home/username/.docker/config.json
Login Succeeded
```

### Step 3: Tag your image

`docker tag <image id or image name>:<version> yourhubusername/<image_name>:<version>`

👉🏻 `docker tag webserver:v1 vrukshali26/web:v1`

You can see using `docker images`
```
REPOSITORY        TAG       IMAGE ID       CREATED          SIZE
webserver         v1        5ca87e671dc1   14 minutes ago   392MB
vrukshali26/web   v1        5ca87e671dc1   14 minutes ago   392MB
centos            7         eeb6ee3f44bd   4 months ago     204MB
```

### Step 4: Push your image to the DockerHub
👉🏻 `docker push yourhubusername/<image_name>:<version>`

🔅 Output:
```
The push refers to repository [docker.io/vrukshali26/web]
a59ac102fa99: Pushed 
951641dc1264: Pushed 
174f56854903: Mounted from library/centos 
v1: digest: sha256:29169ceace4c1c0e29022d77453be7dcc97070d9ab1f5bbb640051ff13178f64 size: 948
```

### Now you can see on DockerHub, your first custom docker image has been pushed...

# Hurrayyyy!!! 🤩🤩



