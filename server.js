const express = require('express');
const cors = require("cors");
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const user_controller = require("./controller/user")
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const mongoDB = 'mongodb://localhost:27017/beadando';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


app.post('/register', user_controller.add_user);
app.post('/login', function (req,res,err) {
     user_controller.get_user(req.body.name)
        .exec(function (err, user) {
            if (user && user.name === req.body.name && user.password === req.body.password){
                res.json(user);
            } else {
                res.json(false)
            }
        })
});
const router = require('./routes');

app.use("/api", router);