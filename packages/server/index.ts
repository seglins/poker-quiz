import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

const PORT = 3000;

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	socket.on('disconnect', () => {
		console.log(`${socket.id} disconnected`);
	});
});

server.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
});
