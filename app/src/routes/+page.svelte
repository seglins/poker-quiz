<script lang="ts">
	import { onMount } from 'svelte';
	import io, { Socket } from 'socket.io-client';
	import { Event, type Player } from '@poker-quiz/lib/types';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	let socket: Socket;

	let name: string = '';
	let answer: string = '';

	let isAnswerFormVisible: boolean = false;
	let hasAnswered: boolean = false;
	let hasDiscarded: boolean = false;

	$: player = { name, answer } as Player;

	onMount(() => {
		socket = io('http://localhost:3000');
	});

	const showAnswerForm = () => (isAnswerFormVisible = true);

	const submit = () => {
		socket.emit(Event.SUBMIT, player);
		hasAnswered = true;
	};

	const discard = () => {
		socket.emit(Event.DISCARD);
		hasDiscarded = true;
	};
</script>

<div class="flex flex-col gap-6 w-full max-w-[400px]">
	<h2 class="text-3xl text-center font-bold mb-4">
		{isAnswerFormVisible ? 'Tava Atbilde' : 'Tavs Vārds'}
	</h2>

	{#if isAnswerFormVisible}
		<Input bind:value={answer} placeholder="Tava atbilde" large />
		<Button on:click={submit} disabled={!answer || hasAnswered}>Iesūtīt</Button>
		<Button
			on:click={discard}
			variant="destructive"
			disabled={!answer || !hasAnswered || hasDiscarded}>Atmest</Button
		>
	{:else}
		<Input bind:value={name} placeholder="Vārds Uzvārds" />
		<Button on:click={showAnswerForm} disabled={!name}>Ienākt</Button>
	{/if}
</div>
