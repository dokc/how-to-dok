const express = require('express');
var ExpressCassandra = require('express-cassandra');

app = express()

let models = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['127.0.0.1'],
        localDataCenter: 'datacenter1',
        protocolOptions: { port: 9042 },
        keyspace: 'k8ssandra',
        queryOptions: {consistency: ExpressCassandra.consistencies.one}
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe',
    }
});

var MyModel = models.loadSchema('Person', {
    fields:{
        name    : "text",
        surname : "text",
        age     : "int",
        created : "timestamp"
    },
    key:["name"]
});
MyModel.syncDB(function(err, result) {
    if (err) throw err;
   // creates migrations and syncs it with the DB
});

app.get("/hello-world", (req, res) => {
    return res.send("Hello World");
})


app.listen(3000 , () => {
    console.log("Listening on port 3000")
})



var instance = new models.instance.Person({
    name: "Abhijith",
    surname: "Ganesh",
    age: 105,
    created: Date.now()
});

instance.save(function(err){
    if(err) {
        console.log(err);
        return;
    }
    console.log('Yuppiie!');
});
MyModel.syncDB(function(err, result) {
    if (err) throw err;
   // creates migrations and syncs it with the DB
});
