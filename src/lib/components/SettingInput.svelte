<script>
	import { Icon, InformationCircle } from 'svelte-hero-icons'
	export let value = ''
	export let id
	export let label
	export let type = 'text'
	export let disabled = false
	export let placeholder = ''

	export let errors
</script>

{#if type !== 'file'}
	<div class="col-span-3">
		<label
			for="af-account-full-name"
			class="mt-2.5 inline-block text-sm text-gray-700 dark:text-gray-200"
		>
			{label}
		</label>
		{#if id === 'username'}
			<div class="hs-tooltip inline-block [--placement:bottom]">
				<button type="button" class="hs-tooltip-toggle ml-1">
					<Icon
						class="flex-none text-gray-900 dark:text-gray-50"
						src={InformationCircle}
						size="16"
					/>
				</button>
				<span
					class="hs-tooltip-content invisible absolute z-10 inline-block w-40 rounded-md bg-gray-900 px-2 py-1 text-center text-xs font-medium text-white opacity-0 shadow-sm transition-opacity hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 dark:bg-slate-700"
					role="tooltip"
				>
					Username is generated from your fullname on registration. You can change it.
				</span>
			</div>
		{/if}
	</div>
{/if}
<!-- End Col -->

<div class="col-span-9">
	<div class="sm:flex">
		<input
			{id}
			{type}
			{value}
			class={type === 'file'
				? 'dark:file:text-white-800 w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600'
				: 'block w-full rounded-lg border-gray-200 px-3 py-3 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'}
			name={id}
			{placeholder}
			{disabled}
		/>
	</div>

	{#if errors}
		<label for={id} class="label py-0 pt-1">
			{#each errors as error}
				<span class="mt-2 text-xs text-red-600">{error}</span>
			{/each}
		</label>
	{/if}
</div>
