<script>
	import { onMount } from 'svelte';
	import io from 'socket.io-client';

	onMount(() => {
		const socket = io('http://localhost:3000');
	});
</script>
