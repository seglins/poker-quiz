<script lang="ts">
	export let large = false;
	export let disabled = false;
	export let placeholder = '';
	export let value: string | number = '';
	export let type = 'text';
	export let name = '';

	export const largeClasses = 'text-2xl min-h-[100px] text-center';

	const handleChange = (event: Event) => (value = (event.target as HTMLInputElement).value);
</script>

<input
	on:input={handleChange}
	{name}
	{value}
	{type}
	{disabled}
	{placeholder}
	class={`w-full px-4 py-4 font-medium rounded-lg border border-neutral placeholder:text-neutral-dark ${
		large && largeClasses
	}`}
/>
