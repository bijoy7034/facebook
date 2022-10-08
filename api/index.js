const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
const usersRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")


const app = express()

dotenv.config()


app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(5000, ()=> {
            console.log("server is running on 5000 db connected")
         })
    }).catch((err)=>{
        console.log(err)
    })

