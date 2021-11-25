import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express()
const root = require('path').join(__dirname, '..', 'client', 'build')

app.use(express.static(root))
app.get("*", (req, res) => { res.sendFile('index.html', { root })})

const port = 4004;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {
	console.log('===== Connected', socket)
})

server.listen(port, () => {
	console.log(`✅ Running on http://localhost:${port}`)
})
