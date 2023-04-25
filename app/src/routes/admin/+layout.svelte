<script lang="ts">
	import { onMount } from 'svelte';
	import {
		SocketEvent,
		type IdentifiedPlayer,
		type SocketEventGetPlayersResponse
	} from '@poker-quiz/lib';
	import { players, socket } from '$lib/stores';

	onMount(() => {
		socket.subscribe((socket) => {
			socket?.emit(SocketEvent.GET_PLAYERS, (response: SocketEventGetPlayersResponse) => {
				players.set(response.players);
			});

			socket?.on(SocketEvent.PLAYER_SUBMITTED, (newPlayer: IdentifiedPlayer) => {
				players.set([...$players, newPlayer]);
			});

			socket?.on(SocketEvent.PLAYER_DISCARDED, (id: string) => {
				players.set(
					$players.map((player) => {
						if (player.id === id) {
							return {
								...player,
								hasDiscarded: true
							};
						}

						return player;
					})
				);
			});

			socket?.on(SocketEvent.PLAYERS_REMOVED, (ids?: string[]) => {
				players.set(ids ? $players.filter((player) => !ids.includes(player.id)) : []);
			});
		});
	});
</script>

<div class="max-w-[400px] mx-auto">
	<slot />
</div>
