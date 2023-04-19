<script lang="ts">
	export let large: boolean = false;
	export let disabled: boolean = false;
	export let placeholder = '';
	export let value = '';
	export const largeClasses = 'text-2xl min-h-[100px] text-center';
</script>

<input
	bind:value
	{disabled}
	{placeholder}
	class={`w-full px-4 py-4 font-medium rounded-lg border border-neutral-light placeholder:text-neutral-dark ${
		large && largeClasses
	}`}
/>
