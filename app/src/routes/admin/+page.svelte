<script lang="ts">
	import { SocketEvent } from '@poker-quiz/lib/types';
	import { players, socket } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';

	const removePlayers = (ids?: string[]) => {
		$socket?.emit(SocketEvent.REMOVE_PLAYERS, ids);
	};
</script>

<h2 class="text-3xl font-bold mb-6">Spēlētāji</h2>

<ul class="mb-6">
	{#each $players as { id, name }}
		<li class="flex justify-between gap-4 py-4 font-semibold border-b border-neutral-light">
			{name}
			<div class="flex flex-row gap-4">
				<button class="text-destructive" on:click={() => removePlayers([id])}>Dzēst</button>
				<a href={`/admin/${id}`} class="text-primary">Atvērt</a>
			</div>
		</li>
	{/each}
</ul>

<Button on:click={() => removePlayers()}>Dzēst Atbildes</Button>
