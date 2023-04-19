<script lang="ts">
	export let variant: 'primary' | 'destructive' = 'primary';
	export let disabled: boolean = false;
</script>

<button
	on:click
	{disabled}
	class="w-full px-4 py-4 text-white font-semibold rounded-lg"
	class:bg-primary={variant === 'primary'}
	class:bg-danger={variant === 'destructive'}
	class:opacity-30={disabled}
>
	<slot /></button
>
