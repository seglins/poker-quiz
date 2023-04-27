<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { IdentifiedPlayer } from '@poker-quiz/lib';
	import { players } from '$lib/stores';

	let player: IdentifiedPlayer | null;

	onMount(() => {
		players.subscribe((players) => {
			const existingPlayer = players.find((player) => player.id === $page.params.playerId);

			if (!existingPlayer) {
				return;
			}

			player = existingPlayer;
		});
	});
</script>

{#if player}
	<h3 class="text-xl font-bold mb-3">{player.name}</h3>
	{#if player.answer}
		<p
			class="text-4xl font-bold"
			class:text-destructive={player.hasFolded}
			class:opacity-50={player.hasFolded}
		>
			{player.answer}
		</p>
	{/if}
{/if}
