var http = require('http');
http.createServer(function (req, res) {
    console.log(`Huhhhh Just got a request at ${req.url}!`)
    console.log('Huh')
    res.write('Yay!');
    res.end();
}).listen(process.env.PORT || 3000);

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Map;

const fs = require('fs');

const today = new Date().toISOString().slice(0, 10);

let messages = [];

console.log(`Server in ascolto`)

server.on('listening', () => {
    console.log('WebSocket server is listening on port 8080');
});
  

server.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const log = JSON.parse(message);

    if (log.type === 'welcome' && log.clientId) {
      const clientId = log.clientId;
      clients.set(clientId, socket);
    }else{
      const { to, data } = JSON.parse(message);
      messages.push({ to, data });
      console.log(`-${to}-`);
      // Invia il messaggio a tutti i client connessi
      console.log(clients.has(to));

      if (clients.has(to)) {
        const destClient = clients.get(to);
        destClient.send(data);
      }
    }
    clients.forEach((socket, clientId) => {
      console.log(`|${clientId}| ${clients.keys()}`);
    });

  });

  socket.on('close', () => {
    console.log('Client disconnected');
    clients.delete(socket.id);
  });

});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  fs.appendFile(`messages_${today}.json`, JSON.stringify(messages)+"\n",(err) => {
    if (err) throw err;
    console.log('Dati aggiunti al file');
  });
  console.log('Bye bye!<3');
  process.exit(0);
});
