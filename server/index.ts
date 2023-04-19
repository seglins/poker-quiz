import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Event, Player, PlayerWithID } from '@poker-quiz/lib/types';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

let players: PlayerWithID[] = [];

io.on('connection', (socket) => {
	const id = socket.id;

	console.log(`${id} connected`);

	socket.on(Event.SUBMIT, (player: Player) => {
		players.push({ id, ...player });
	});

	socket.on(Event.DISCARD, () => {
		players = players.map((player) => {
			if (id === player.id) {
				return {
					...player,
					hasDiscarded: true,
				};
			}

			return player;
		});
	});

	socket.on('disconnect', () => {
		console.log(`${id} disconnected`);
	});
});

const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
});
