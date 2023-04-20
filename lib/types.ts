export enum SocketEvent {
	SUBMIT = 'submit',
	DISCARD = 'discard',
}

export interface Player {
	name: string;
	answer: string | number;
	hasDiscarded?: boolean;
}

export type PlayerWithID = {
	id: string;
} & Player;
