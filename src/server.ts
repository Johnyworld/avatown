import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';
import socketUtils from './utils/socketUtils';
import errors from './errors';

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

	socket.on('room_create', ({ user }, cb) => {
		const roomCode = Math.floor(Math.random() * 1000) + ''
		socket.data = { ...socket.data, user }
		socket.join(roomCode);
		cb(roomCode)
	})

	socket.on('room_join', ({ room, user }, cb) => {
		socket.data = { ...socket.data, user };
		const rooms = socketUtils.getActiveRooms(io);
		if (rooms.includes(room)) {
			socket.join(room);
			cb({ ok: true, data: room });
		} else {
			cb({ ok: false, ...errors.room.notExists, data: room });
		}
	})

	socket.on('room_get_list', (cb) => {
		const rooms = socketUtils.getActiveRooms(io);
		cb({ rooms });
	})

	socket.on('room_leave', ({ room }, cb) => {
		const rooms = socketUtils.getActiveRooms(io);
		if (room && rooms.includes(room)) {
			socket.leave(room);
			socket.to(room).emit('room_leave', { user: socket.data.user })
			cb({ ok: true })
		} else {
			cb({ ok: false, ...errors.room.notExists })
		}
	})

	socket.on('message_send', ({ room, message }, cb) => {
		const rooms = socketUtils.getActiveRooms(io);
		if (room && rooms.includes(room)) {
			socket.to(room).emit('message_send', { room, message, user: socket.data.user });
			cb({ ok: true })
		} else {
			cb({ ok: false, ...errors.room.notExists })
		}
	})


	socket.on('disconnecting', () => {
		console.log('===== disconnected', socket.data);
		socket.to([ ...socket.rooms ]).emit('room_leave', { user: socket.data.user });
	})

})





server.listen(port, () => {
	console.log(`??? Running on http://localhost:${port}`)
})
