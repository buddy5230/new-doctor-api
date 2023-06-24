import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoute from './route/user_route';

import admin from './route/admin';
const dbConfig ='mongodb+srv://poopiratbuddy:1234@cluster0.3evcesm.mongodb.net/?retryWrites=true&w=majority'
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(dbConfig).then(() => {
  console.log('Database successfully connected');
}, error => {
  console.log('Could not connect to database: ' + error);
});

app.use("/admin", admin);
app.use("/", userRoute);

/*const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Node Server has Started at Port " + port);
});*/
