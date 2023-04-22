import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { SocketEvent, Player, IdentifiedPlayer } from '@poker-quiz/lib/types';
import { verifyAuthToken } from './middleware';

dotenv.config({ path: path.resolve('../.env') });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(helmet());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

let players: IdentifiedPlayer[] = [];
let admins: string[] = [];

io.use(function (socket, next) {
	const token = socket.handshake.query['token'] as string;

	if (token) {
		try {
			jwt.verify(token, process.env.JWT_SECRET);

			if (!admins.includes(socket.id)) {
				admins.push(socket.id);
			}
		} catch (error) {}
	}

	next();
});

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	socket.on(SocketEvent.PLAYER_SUBMIT, (player: Player) => {
		const newPlayer = { id: socket.id, ...player };
		players.push(newPlayer);
		io.to(admins).emit(SocketEvent.PLAYER_SUBMITTED, newPlayer);
	});

	socket.on(SocketEvent.PLAYER_DISCARD, () => {
		players = players.map((player) => {
			if (socket.id === player.id) {
				return {
					...player,
					hasDiscarded: true,
				};
			}

			return player;
		});

		io.to(admins).emit(SocketEvent.PLAYER_DISCARDED, socket.id);
	});

	socket.on(SocketEvent.GET_PLAYERS, (callback) => {
		callback({ players });
	});

	socket.on(SocketEvent.REMOVE_PLAYERS, (ids?: string[]) => {
		if (admins.includes(socket.id)) {
			const playerIds = players.map(({ id }) => id);

			players = ids ? players.filter((player) => !ids.includes(player.id)) : [];

			io.to(admins).emit(SocketEvent.PLAYERS_REMOVED, ids);
			io.to(ids ?? playerIds).emit(SocketEvent.PLAYER_REMOVED);
		}
	});

	socket.on('disconnect', () => {
		if (admins.includes(socket.id)) {
			admins = admins.filter((admin) => admin !== socket.id);
		}

		console.log(`${socket.id} disconnected`);
	});
});

app.post('/admin/auth/login', (req: Request, res: Response) => {
	if (!req.body.password) {
		return res.status(400).json({ error: 'Password is missing' });
	}

	if (req.body.password !== process.env.ADMIN_PASSWORD) {
		return res.status(400).json({ error: 'Incorrect password' });
	}

	const token = jwt.sign({}, process.env.JWT_SECRET, {
		expiresIn: '24h',
	});

	return res.status(200).json({ token });
});

app.get('/admin/auth', verifyAuthToken, (req: Request, res: Response) => {
	res.sendStatus(200);
});

const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
});
