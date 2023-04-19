<script lang="ts">
	export let large: boolean = false;
	export let disabled: boolean = false;
	export let placeholder: string = '';
	export let value: string | number = '';
	export let type: string = 'text';

	export const largeClasses = 'text-2xl min-h-[100px] text-center';

	const handleChange = (event: Event) => (value = (event.target as HTMLInputElement).value);
</script>

<input
	on:input={handleChange}
	{value}
	{type}
	{disabled}
	{placeholder}
	class={`w-full px-4 py-4 font-medium rounded-lg border border-neutral placeholder:text-neutral-dark ${
		large && largeClasses
	}`}
/>
