<script>
	export let value = ''
	export let id
	export let label
	export let type = 'text'
	export let disabled = false

	export let errors
</script>

<!-- Form Group -->
<div>
	{#if id === 'password_login'}
		<div class="flex items-center justify-between">
			<label for={id} class="mb-2 block text-sm dark:text-white">{label}</label>
			<a
				class="text-right text-sm font-medium text-blue-600 decoration-2 hover:underline"
				href="/auth/reset-password">Forgot password?</a
			>
		</div>
	{:else}
		<label for={id} class="mb-2 block text-sm dark:text-white">{label}</label>
	{/if}
	<div class="relative">
		<input
			{type}
			{id}
			name={id}
			class="block w-full rounded-md {errors
				? 'border-red-200 dark:border-red-700'
				: 'border-gray-200 dark:border-gray-700'} px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400"
			{value}
			{disabled}
			aria-describedby="{type}-error"
		/>
		{#if errors}
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<svg
					class="h-5 w-5 text-red-500"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
					aria-hidden="true"
				>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
					/>
				</svg>
			</div>
		{/if}
	</div>
	{#if errors}
		{#each errors as error}
			<p class="mt-2 text-xs text-red-600" id="email-error">{error}</p>
		{/each}
	{/if}
</div>
<!-- End Form Group -->
