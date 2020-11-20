const express = require('express')
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {  
    //enable CORS on socket server
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true
      });
      res.end();
    }
  });

  console.log(io);

const port = process.env.PORT || 3000;




server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

app.get('/',(req,res)=>{
	res.send("Welcome to the FleetMangement Geolocation API")
})

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('location', location => {
      console.log(location)

      socket.emit('s-emitlocation', location)
    })

    socket.on('disconnectClient', () => {
      socket.disconnect()
    })

  //   socket.on('disconnect', function () {
  //     console.log('user disconnected');
  // });
});

