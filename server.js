const {v4 :uuidv4} = require("uuid") //universally unique identifier
const express= require("express");
const app= express();
const server =require("http").createServer(app);
const io=require("socket.io")(server);

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    const uuid=uuidv4();  //generate a new UUID
    res.redirect(`/${uuid}`)
})

app.get("/:room",(req,res)=>{
    res.render("room",{roomId:req.params.room})
})

io.on("connection",socket=>{
    socket.on("join-room",(roomId,userId)=>{
        socket.join(roomId);
        socket.to(roomId).emit("user-connected",userId)
    })
})

server.listen(9999,()=> console.log("listening from 9999"));