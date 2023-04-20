import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Missing JWT token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		return res.status(401).json({ error: 'Invalid JWT token' });
	}
};
