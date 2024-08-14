require('dotenv').config();
const express = require('express');
const { User, Admin, Course } = require('./database');
const { zodUserSchema } = require('./validation');
var cors = require('cors');
const userRoute = require('./routes/UserRoute');
const adminRoute = require('./routes/AdminRoute');
const app = express()


app.use(express.json())
app.use(cors())

app.use("/api/v1/user/",userRoute);
app.use("/api/v1/admin",adminRoute);

app.listen(3000);