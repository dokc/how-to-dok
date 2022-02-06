The cassandra.yml file configures the local Cassandra instance.
It uses the configuration commands in `cassandra.yml` to define provisions. For most provisions the comment lines

elaborate the configured provision.

The [provisions](https://cassandra.apache.org/doc/latest/cassandra/configuration/cass_yaml_file.html) can be read here. 

The schema needs to be manually configured after the start-up is ready. To do that, open the shell attached to the container
and run

```cmd
cqlsh -f /etc/cassandra/schema/schema.cql
```
