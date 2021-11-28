import { Server, Socket } from "socket.io";


const getActiveRooms = (io: Server) => {
	// Convert map into 2D list:
	// ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
	const arr = Array.from(io.sockets.adapter.rooms);
	// Filter rooms whose name exist in set:
	// ==> [['room1', Set(2)], ['room2', Set(2)]]
	const filtered = arr.filter(room => !room[1].has(room[0]))
	// Return only the room name: 
	// ==> ['room1', 'room2']
	return filtered.map(i => i[0]);
}

const getMyRooms = (socket: Socket) => {
	return Array.from(socket.rooms);
}

export default {
	getActiveRooms,
	getMyRooms,
}