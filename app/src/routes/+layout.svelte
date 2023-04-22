<script>
	import '../app.css';
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { socket } from '$lib/stores';

	afterNavigate((navigation) => {
		if ($socket || navigation.to?.route.id === '/admin/login') {
			return;
		}

		socket.set(
			io(PUBLIC_API_URL, {
				query: {
					token: $page.data.token
				}
			})
		);
	});
</script>

<main>
	<slot />
</main>
