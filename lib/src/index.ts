export enum SocketEvent {
	PLAYER_SUBMIT = 'player:submit',
	PLAYER_SUBMITTED = 'player:submitted',
	PLAYER_DISCARD = 'player:discard',
	PLAYER_DISCARDED = 'player:discarded',
	REMOVE_PLAYERS = 'players:remove',
	PLAYERS_REMOVED = 'players:removed',
	PLAYER_REMOVED = 'player:removed',
	GET_PLAYERS = 'players:get',
}

export type SocketEventGetPlayersResponse = {
	players: IdentifiedPlayer[];
};

export interface Player {
	name: string;
	answer: string | number;
	hasAnswered?: boolean;
	hasDiscarded?: boolean;
}

export type IdentifiedPlayer = {
	id: string;
} & Player;
