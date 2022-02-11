# spotimapi

yarn add express zod config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid

yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node-dev typescript -D

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ricproenca:<password>@cluster0.buqbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
const collection = client.db("test").collection("devices");
// perform actions on the collection object
client.close();
});

Replace <password> with the password for the ricproenca user. Replace myFirstDatabase with the name of the database that connections will use by default. Ensure any option params are URL encoded.

URL encoded
https://docs.atlas.mongodb.com/troubleshoot-connection/#special-characters-in-connection-string-password

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ricproenca:<password>@cluster0.buqbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
const collection = client.db("test").collection("devices");
// perform actions on the collection object
client.close();
});
