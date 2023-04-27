<script lang="ts">
	import { SocketEvent, type Player } from '@poker-quiz/lib';
	import { socket } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { onMount } from 'svelte';

	const initialPlayer: Player = {
		name: '',
		answer: '',
		hasEntered: false,
		hasAnswered: false,
		hasFolded: false
	};

	let player: Player = { ...initialPlayer };

	const enter = () => {
		$socket?.emit(SocketEvent.PLAYER_ENTER, player.name);
		player.hasEntered = true;
	};

	const answer = () => {
		$socket?.emit(SocketEvent.PLAYER_ANSWER, player.answer);
		player.hasAnswered = true;
	};

	const fold = () => {
		$socket?.emit(SocketEvent.PLAYER_FOLD);
		player.hasFolded = true;
	};

	const reset = () => {
		player = { ...initialPlayer };
	};

	onMount(() => {
		socket.subscribe((socket) => {
			socket?.on(SocketEvent.PLAYER_REMOVED, () => {
				reset();
			});
		});
	});
</script>

<div class="flex flex-col items-center justify-center min-h-[100vh]">
	<div class="flex flex-col gap-6 w-full max-w-[400px]">
		<h2 class="text-3xl text-center font-bold mb-3">
			{player.hasEntered && player.name ? 'Tava Atbilde' : 'Tavs Vārds'}
		</h2>

		{#if player.hasEntered && player.name}
			<Input
				bind:value={player.answer}
				disabled={player.hasFolded}
				placeholder="Tava atbilde"
				large
			/>
			<Button on:click={answer} disabled={!player.answer || player.hasAnswered}>Iesūtīt</Button>
			<Button
				on:click={fold}
				variant="destructive"
				disabled={!player.answer || !player.hasAnswered || player.hasFolded}>Atmest</Button
			>
		{:else}
			<Input bind:value={player.name} placeholder="Vārds Uzvārds" />
			<Button on:click={enter} disabled={!player.name}>Ienākt</Button>
		{/if}
	</div>
</div>
