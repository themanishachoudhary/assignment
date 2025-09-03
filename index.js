const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.send("Port is Active");
})
const connectDB = require("./src/DB/db")
app.use(express.json());

const userRoutes = require("./src/Routes/userRoutes");
app.use("/user", userRoutes);

app.listen(port, ()=>{
    console.log(`server is running on this port" ${port}`);
})


