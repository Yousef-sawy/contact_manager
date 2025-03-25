const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDb();

app.use(express.json());// to make node recive json data type 
app.use("/api/contacts" , require("./routes/contactRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});