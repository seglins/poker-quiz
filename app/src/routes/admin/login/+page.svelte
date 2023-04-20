<script lang="ts">
	import { enhance } from '$app/forms';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	export let form;
</script>

<div class="flex flex-col items-center justify-center min-h-[100vh]">
	<form class="flex flex-col gap-4 w-full" method="POST" use:enhance>
		<Input type="password" placeholder="Parole" name="password" />
		<Button>Ienākt</Button>

		{#if form?.error}
			<p class="p-4 text-destructive text-center font-medium text-sm rounded-lg">
				{form.error}
			</p>
		{/if}
	</form>
</div>
