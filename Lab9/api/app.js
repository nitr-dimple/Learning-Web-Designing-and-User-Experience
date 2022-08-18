import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import model from './models/index.js';


const app = express();

// mongoose.connect('mongodb://localhost:27017/contactdb');
// const { MongoClient }  = require('mongodb');
const MONGO_USERNAME = 'doadmin';
const MONGO_PASSWORD = '6u0G724rZ1tb3S9i';
const MONGO_HOSTNAME = 'db-mongodb-nyc3-48149-03c689a9.mongo.ondigitalocean.com';
const MONGO_PORT = '27017';
const MONGO_DB = 'contactdb';
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
// mongoose.connect(url, {useNewUrlParser: true});
// mongoose.connect('mongodb+srv://db-mongodb-nyc3-48149-03c689a9.mongo.ondigitalocean.com:27017/contactdb');
mongoose.connect('mongodb+srv://doadmin:6u0G724rZ1tb3S9i@db-mongodb-nyc3-48149-03c689a9.mongo.ondigitalocean.com/contactdb?authSource=admin&replicaSet=db-mongodb-nyc3-48149&tlsInsecure=true')

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

routes(app);

export default app;