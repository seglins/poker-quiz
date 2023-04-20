import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { SocketEvent, Player, PlayerWithID } from '@poker-quiz/lib/types';
import { verifyToken } from './middleware';

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

let players: PlayerWithID[] = [];

io.on('connection', (socket) => {
	const id = socket.id;

	console.log(`${id} connected`);

	socket.on(SocketEvent.SUBMIT, (player: Player) => {
		players.push({ id, ...player });
	});

	socket.on(SocketEvent.DISCARD, () => {
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

app.get('/admin/auth', verifyToken, (req: Request, res: Response) => {
	res.sendStatus(200);
});

const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
});
