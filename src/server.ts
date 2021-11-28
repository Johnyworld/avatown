import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';
import socketUtils from './utils/socketUtils';

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
	console.log('--- connected', socket.id);

	socket.on('room_create', (data, cb) => {
		socket.join('X87aO');
		cb('X87aO')
	})

	socket.on('room_join', ({ room, name }, cb) => {
		socket.data = { ...socket.data, name };
		const rooms = socketUtils.getActiveRooms(io);
		console.log('===== server', rooms, room, name);
		if (rooms.includes(room)) {
			socket.join(room);
			cb({ ok: true, data: room });
		} else {
			cb({ ok: false, message: 'room is not exists', data: room });
		}
	})

	socket.on('room_get_list', (cb) => {
		const rooms = socketUtils.getActiveRooms(io);
		cb({ rooms });
	})

	socket.on('room_leave', ({ user, room }, cb) => {
		const rooms = socketUtils.getActiveRooms(io);
		if (room && rooms.includes(room)) {
			socket.leave(room);
			socket.to(room).emit('room_leave', { user })
			cb({ ok: true })
		} else {
			cb({ ok: false })
		}
	})

	socket.on('message_send', ({ room, message }) => {
		console.log('===== server', socket.data);
		socket.to(room).emit('message_send', { room, message, user: socket.data.name });
	})

})

server.listen(port, () => {
	console.log(`✅ Running on http://localhost:${port}`)
})
