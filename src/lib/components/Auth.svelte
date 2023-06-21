<script>
	import OAuth from '$lib/components/OAuth.svelte'

	export let title = ''
	export let template = ''
	export let providers
</script>

<main
	class:mt-14={template === 'login'}
	class:mt-32={template === 'reset-password'}
	class="mx-auto w-full max-w-xl items-center p-6"
>
	<div
		class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="p-4 sm:p-6">
			<div class="text-center">
				<h1 class="block text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
					{#if template === 'login'}
						Don't have an account yet?
						<a class="font-medium text-blue-600 decoration-2 hover:underline" href="/auth/register">
							Sign up here
						</a>
					{:else if template === 'register'}
						Already have an account?
						<a class="font-medium text-blue-600 decoration-2 hover:underline" href="/auth/login">
							Sign in here
						</a>
					{:else}
						Remember your password?
						<a class="font-medium text-blue-600 decoration-2 hover:underline" href="/auth/login">
							Sign in here
						</a>
					{/if}
				</p>
			</div>

			<div class="mt-5">
				{#if template === 'login' || template === 'register'}
					<!-- OAuth -->
					<OAuth {providers} {template} />
					<!-- OAuth -->
					<div
						class="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600"
					>
						Or
					</div>
				{/if}
			</div>
			<slot />
		</div>
	</div>
</main>
