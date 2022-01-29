The cassandra yml configures how the local Cassandra instance needs to be configured.
It uses the configuration coomands in `cassandra.yml` to define provisions. For most provisions the comment lines
elaborate the configured provision.

The [provisions](https://cassandra.apache.org/doc/latest/cassandra/configuration/cass_yaml_file.html) can be read here. 

The schema needs to be manually configured after the start-up is ready. To do that, open the shell attached to the container
and run

```cmd
cqlsh -f /etc/cassandra/schema/schema.cql
```