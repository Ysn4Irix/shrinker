<script>
	import '../app.postcss'
	import { Toaster } from 'svelte-french-toast'
	import { getImageUrl } from '$lib/utils'
	import { Icon, User, ArrowLeftOnRectangle, Cog8Tooth, ShieldCheck, Home } from 'svelte-hero-icons'

	/** @type {import('./$types').PageData} */
	export let data

	$: ({ user } = data)
</script>

<Toaster />
<main class="h-full items-center font-varela">
	<header
		class="z-50 mb-4 w-full border-b border-gray-200 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0"
	>
		<nav
			class="relative mx-auto w-full max-w-7xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
			aria-label="Global"
		>
			<div class="flex items-center justify-between">
				<a
					class="flex-none font-pacifico text-3xl text-slate-900 dark:text-gray-100"
					href="/"
					aria-label="Shrinker"
				>
					Shrinker
				</a>
				<div class="sm:hidden">
					<button
						type="button"
						class="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-white p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
						data-hs-collapse="#navbar-collapse-with-animation"
						aria-controls="navbar-collapse-with-animation"
						aria-label="Toggle navigation"
					>
						<svg
							class="h-4 w-4 hs-collapse-open:hidden"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
						<svg
							class="hidden h-4 w-4 hs-collapse-open:block"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div
				id="navbar-collapse-with-animation"
				class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 ease-in-out sm:block"
			>
				<div
					class="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:pl-7"
				>
					<div class="flex flex-row items-center justify-end gap-2">
						<a
							class="hs-dark-mode group flex items-center pr-3 font-medium text-gray-600 hover:text-blue-600 hs-dark-mode-active:hidden dark:text-gray-400 dark:hover:text-gray-500"
							href="#!"
							data-hs-theme-click-value="dark"
						>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"
								/>
							</svg>
						</a>
						<a
							class="hs-dark-mode group hidden items-center pr-3 font-medium text-gray-600 hover:text-blue-600 hs-dark-mode-active:block dark:text-gray-400 dark:hover:text-gray-500"
							href="#!"
							data-hs-theme-click-value="light"
						>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
								/>
							</svg>
						</a>

						{#if user}
							<div
								class="hs-dropdown relative inline-flex"
								data-hs-dropdown-placement="bottom-right"
							>
								<button
									id="hs-dropdown-custom-trigger"
									type="button"
									class="hs-dropdown-toggle inline-flex items-center justify-center gap-2 rounded-full border bg-white py-1 pl-1 pr-3 align-middle text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
								>
									<img
										class="h-auto w-8 rounded-full"
										src={user.avatar
											? getImageUrl(user.collectionId, user.id, user.avatar, '38x38')
											: user.avatarUrl
											? user.avatarUrl
											: `https://api.dicebear.com/5.x/thumbs/svg?radius=50&seed=${user.name}`}
										alt="avatar"
									/>
									<span
										class="max-w-[7.5rem] truncate font-medium text-gray-600 dark:text-gray-400"
									>
										{user.name ?? user.meta?.name}
									</span>
									<svg
										class="h-2.5 w-2.5 text-gray-600 hs-dropdown-open:rotate-180"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
								</button>

								<div
									class="hs-dropdown-menu duration z-10 hidden min-w-[15rem] rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:border dark:border-gray-700 dark:bg-gray-800"
									aria-labelledby="hs-dropdown-with-header"
								>
									<div class="-m-2 rounded-t-lg bg-gray-100 px-5 py-3 dark:bg-gray-700">
										<p class="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
										<p class="text-sm font-medium text-gray-800 dark:text-gray-300">
											{user.email}
										</p>
									</div>
									<div class="mt-2 py-2 first:pt-0 last:pb-0">
										<a
											class="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
											href="/"
										>
											<Icon class="flex-none" src={Home} size="16" />
											Home
										</a>
										<a
											class="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
											href="/my/profile"
										>
											<Icon class="flex-none" src={User} size="16" />
											Profile
										</a>
										<a
											class="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
											href="/my/account"
										>
											<Icon class="flex-none" src={Cog8Tooth} size="16" />
											Account
										</a>
										<a
											class="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
											href="/my/security"
										>
											<Icon class="flex-none" src={ShieldCheck} size="16" />
											Security
										</a>
										<form action="/auth/logout" method="post" style="margin: 0;">
											<button
												class="flex w-full items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
												type="submit"
											>
												<Icon class="flex-none" src={ArrowLeftOnRectangle} size="16" />
												Logout
											</button>
										</form>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</nav>
	</header>
	<slot />
</main>
