import dotenv from 'dotenv';
import server from "./src/app";
import sequelize from './src/db';
import createServices from './src/controllers/createServices';
import createLocations from './src/controllers/createLocations'
import { Server as SocketServer } from "socket.io";
import http from "http";

dotenv.config();
const PORT = process.env.PORT || 3001;

//--------- configuracion para socket io
const serverSocket = http.createServer(server) // convierto a un servidor http
const io = new SocketServer(serverSocket, {
  cors: {
    origin: "*",
  }
}) // servidor lo paso como parametro al servidor de web socket

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized');

    await createServices();
    console.log('Services created');

    await createLocations();
    console.log('Locations created')

    io.on("connection", (socket) => {
      // console.log(socket.id);
      // console.log("un usuario conectado");
      socket.on("message", function (body) {
        // console.log(message);        
        socket.broadcast.emit("message", {
          body,
          from: socket.id.slice(8),
        })
        
        
      })
      
    })

    serverSocket.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();

