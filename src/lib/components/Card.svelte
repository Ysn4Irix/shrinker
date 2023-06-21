<script>
	export let headerText = ''
	export let headerDesc = ''
</script>

<div class="mx-auto mt-12 max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
	<!-- Card -->
	<div class="rounded-xl bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-7">
		<div class="mb-8">
			<h2 class="pb-1 text-xl font-bold text-gray-800 dark:text-gray-200">{headerText}</h2>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				{headerDesc}
			</p>
		</div>
		<slot />
	</div>
	<!-- End Card -->
</div>
