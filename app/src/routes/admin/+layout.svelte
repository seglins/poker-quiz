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

			socket?.on(SocketEvent.PLAYER_ENTERED, (newPlayer: IdentifiedPlayer) => {
				players.set([...$players, newPlayer]);
			});

			socket?.on(SocketEvent.PLAYER_ANSWERED, (id: string, answer: string) => {
				players.set($players.map((player) => (player.id === id ? { ...player, answer } : player)));
			});

			socket?.on(SocketEvent.PLAYER_FOLDED, (id: string) => {
				players.set(
					$players.map((player) => (player.id === id ? { ...player, hasFolded: true } : player))
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
