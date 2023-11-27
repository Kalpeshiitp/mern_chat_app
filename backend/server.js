const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();
connectDB();
const app = express()
app.use(express.json())
app.get('/', (req,res)=>{
    res.send("API is running");
})
app.use(cors());
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes)
app.use('/api/message', messageRoutes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
var server = app.listen(PORT,  console.log(`server run on port ${PORT}`.yellow.bold ));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id)
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined the room: ", room);
      });
      
    });