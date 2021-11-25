import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express()
const root = require('path').join(__dirname, '..', 'client', 'build')

app.use(express.static(root))
app.get("*", (req, res) => { res.sendFile('index.html', { root })})

const port = process.env.PORT || 4004;
const server = http.createServer(app);
const io = new SocketIO.Server(server, { cors: {
	origin: ["http://localhost:8080"],
	methods: ["GET", "POST"]
}});

io.on('connection', socket => {
	console.log('---- connected');
})

server.listen(port, () => {
	console.log(`✅ Running on http://localhost:${port}`)
})
