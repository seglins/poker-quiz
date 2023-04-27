export enum SocketEvent {
	PLAYER_ENTER = 'player:enter',
	PLAYER_ENTERED = 'player:entered',
	PLAYER_ANSWER = 'player:answer',
	PLAYER_ANSWERED = 'player:answered',
	PLAYER_FOLD = 'player:fold',
	PLAYER_FOLDED = 'player:folded',
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
	answer?: string | number;
	hasEntered?: boolean;
	hasAnswered?: boolean;
	hasFolded?: boolean;
}
export type IdentifiedPlayer = {
	id: string;
} & Player;
