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
		hasDiscarded: false
	};

	let player: Player = { ...initialPlayer };

	const submit = () => {
		$socket?.emit(SocketEvent.PLAYER_SUBMIT, player.answer);
		player.hasAnswered = true;
	};

	const discard = () => {
		$socket?.emit(SocketEvent.PLAYER_DISCARD);
		player.hasDiscarded = true;
	};

	const enter = () => {
		$socket?.emit(SocketEvent.PLAYER_ENTER, player.name);
		player.hasEntered = true;
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
				disabled={player.hasDiscarded}
				placeholder="Tava atbilde"
				large
			/>
			<Button on:click={submit} disabled={!player.answer || player.hasAnswered}>Iesūtīt</Button>
			<Button
				on:click={discard}
				variant="destructive"
				disabled={!player.answer || !player.hasAnswered || player.hasDiscarded}>Atmest</Button
			>
		{:else}
			<Input bind:value={player.name} placeholder="Vārds Uzvārds" />
			<Button on:click={enter} disabled={!player.name}>Ienākt</Button>
		{/if}
	</div>
</div>
