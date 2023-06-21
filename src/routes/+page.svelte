<script>
	import { enhance, applyAction } from '$app/forms'
	import { fly } from 'svelte/transition'
	import Card from '$lib/components/Card.svelte'
	import { Icon, Trash } from 'svelte-hero-icons'
	import { getShortLink } from '$lib/utils'
	import SettingInput from '$lib/components/SettingInput.svelte'
	import toast from 'svelte-french-toast'
	import Clipboard from 'svelte-clipboard'

	/** @type {import('./$types').ActionData} */
	/** @type {import('./$types').PageData} */
	export let form, data

	let loading = false
	let isExpired = false

	let itemsPerPage = 4

	$: ({ links, origin } = data)

	const submitCreateShortLink = () => {
		loading = true
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Link has been deleted successfully')
					await update()
					break
				case 'error':
					toast.error(result.error.message)
					break
				default:
					await applyAction(result)
			}
			loading = false
			isExpired = false
		}
	}

	const submitDeleteShortLink = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Link created successfully')
					await update()
					break
				case 'error':
					toast.error(result.error.message)
					break
				default:
					await applyAction(result)
			}
		}
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<Card headerText="Shrink your link" headerDesc="Create your short links">
	<form action="?/createShortLink" method="post" use:enhance={submitCreateShortLink}>
		<!-- Grid -->
		<div class="grid grid-cols-12 gap-4 sm:gap-6">
			<!-- End Col -->
			<SettingInput
				id="url"
				type="text"
				label="Long URL"
				value={form?.data?.url ?? ''}
				errors={form?.errors?.url}
				disabled={loading}
				placeholder="https://example.com"
			/>
			<!-- End Col -->

			<!-- End Col -->
			<div class="col-span-12 items-center text-left">
				<input
					type="checkbox"
					id="expiredIn"
					name="expiredIn"
					checked={isExpired}
					on:click={() => (isExpired = !isExpired)}
					class="relative mr-2 h-7 w-[3.25rem] shrink-0 cursor-pointer appearance-none rounded-full border border-transparent bg-gray-100 ring-1 ring-transparent ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:h-6 before:w-6 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow

				before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-blue-600 checked:bg-none checked:before:translate-x-full checked:before:bg-blue-200 focus:border-blue-600 focus:outline-none focus:ring-blue-600 dark:bg-gray-700 dark:before:bg-gray-400 dark:checked:bg-blue-600 dark:checked:before:bg-blue-200 dark:focus:ring-offset-gray-800"
				/>
				<label for="expirein" class=" text-sm text-gray-500 dark:text-gray-400">Expire in</label>
				<!-- End Col -->
				<select
					class:hidden={!isExpired}
					id="expiration"
					name="expiration"
					class="ml-[4.6rem] rounded-md border-gray-200 px-4 py-3 pr-9 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
				>
					<option selected value="Infinity">Infinity</option>
					<option value="5">5 Min</option>
					<option value="30">30 Min</option>
					<option value="60">1 Hour</option>
					<option value="1440">1 Day</option>
					<option value="10080">1 Week</option>
					<option value="43830">1 Month</option>
					<option value="43830">1 Year</option>
				</select>
				<!-- End Col -->
			</div>

			<!-- End Col -->

			<div class="col-span-12 text-center">
				{#if form?.shortLink}
					<button
						type="button"
						class="inline-flex flex-shrink-0 items-center justify-center gap-x-2.5 rounded-md border bg-white px-3 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
					>
						<Clipboard
							text={form?.shortLink}
							let:copy
							on:copy={() => toast.success('Link copied to clipboard')}
						>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<a
								class="text-md hover:none w-full py-3 text-right font-bold text-blue-600 decoration-2"
								href="#!"
								on:click={copy}
							>
								{form?.shortLink}
							</a>
						</Clipboard>
						<svg
							class="h-3.5 w-3.5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
							/>
							<path
								d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
							/>
						</svg>
					</button>
				{/if}
			</div>
		</div>
		<!-- End Grid -->

		<div class="mt-5 flex justify-end gap-x-2">
			<button
				class:disabled={loading}
				type="submit"
				class="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
			>
				{#if loading}
					<div
						class="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
						role="status"
						aria-label="loading"
					>
						<span class="sr-only">Loading...</span>
					</div>
				{:else}
					Shrinker
				{/if}
			</button>
		</div>
	</form>
</Card>

<!-- Table Section -->
<div class="mx-auto max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-5">
	<!-- Card -->
	<div class="flex flex-col">
		<div class="-m-1.5 overflow-x-auto">
			<div class="inline-block min-w-full p-1.5 align-middle">
				<div
					class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900"
				>
					<!-- Header -->
					<div
						class="grid gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-700 md:flex md:items-center md:justify-between"
					>
						<div>
							<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
								Your short links
							</h2>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								View and menage your short links
							</p>
						</div>
					</div>
					<!-- End Header -->

					<!-- Table -->
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead>
							<tr>
								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span
											class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
										>
											ID
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span
											class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
										>
											Link
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span
											class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
										>
											Short link
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span
											class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
										>
											views
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span
											class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
										>
											Status
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-left">
									<div class="flex items-center gap-x-2">
										<span
											class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
										>
											Created
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-right" />
							</tr>
						</thead>

						<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
							{#if links.length === 0}
								<p class="text-md px-5 py-5 text-gray-600 dark:text-gray-400">
									You don't have any short links yet
								</p>
							{:else}
								{#each links.slice(0, itemsPerPage) as row, id}
									<tr
										{id}
										in:fly={{ y: 50, duration: 500, delay: 500 }}
										out:fly={{ duration: 500 }}
									>
										<td class="h-px w-px whitespace-nowrap">
											<div class="px-6 py-3">
												<span class="text-sm text-gray-600 dark:text-gray-400">
													{row.id}
												</span>
											</div>
										</td>
										<td class="h-px w-px whitespace-nowrap">
											<div class="px-6 py-3">
												<button
													type="button"
													class="inline-flex flex-shrink-0 items-center justify-center gap-x-2.5 rounded-md border bg-white px-2.5 align-middle text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
												>
													<Clipboard
														text={row.url}
														let:copy
														on:copy={() => toast.success('Copied to clipboard')}
													>
														<!-- svelte-ignore a11y-click-events-have-key-events -->
														<a
															class="text-md hover:none w-full py-2 text-right font-bold text-blue-600 decoration-2"
															href="#!"
															on:click={copy}
														>
															{row.url.slice(0, 35)} ...
														</a>
													</Clipboard>

													<svg
														class="h-3.5 w-3.5 text-gray-400"
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														viewBox="0 0 16 16"
													>
														<path
															d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
														/>
														<path
															d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
														/>
													</svg>
												</button>
											</div>
										</td>
										<td class="h-px w-px whitespace-nowrap">
											<div class="px-6 py-3">
												<button
													type="button"
													class="inline-flex flex-shrink-0 items-center justify-center gap-x-2.5 rounded-md border bg-white px-2.5 align-middle text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
												>
													<Clipboard
														text={getShortLink(row.shortSlug, origin)}
														let:copy
														on:copy={() => toast.success('Copied to clipboard')}
													>
														<!-- svelte-ignore a11y-click-events-have-key-events -->
														<a
															class="text-md hover:none w-full py-2 text-right font-bold text-blue-600 decoration-2"
															href="#!"
															on:click={copy}
														>
															{getShortLink(row.shortSlug, origin)}
														</a>
													</Clipboard>

													<svg
														class="h-3.5 w-3.5 text-gray-400"
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														viewBox="0 0 16 16"
													>
														<path
															d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
														/>
														<path
															d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
														/>
													</svg>
												</button>
											</div>
										</td>

										<td class="h-px w-px whitespace-nowrap">
											<div class="px-6 py-3">
												<span
													class="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-gray-200 dark:text-gray-200"
												>
													{row.views}
												</span>
											</div>
										</td>

										<td class="h-px w-px whitespace-nowrap">
											{#if row.expiration === 'Infinity' || parseInt(row.expiration) > Date.now()}
												<div class="px-6 py-2">
													<span
														class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
													>
														<svg
															class="h-2.5 w-2.5"
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16"
														>
															<path
																d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
															/>
														</svg>
														Active
													</span>
												</div>
											{:else}
												<div class="px-6 py-2">
													<span
														class="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-gray-200"
													>
														<svg
															class="h-2.5 w-2.5"
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16"
														>
															<path
																d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
															/>
														</svg>
														Expired
													</span>
												</div>
											{/if}
										</td>

										<td class="h-px w-px whitespace-nowrap">
											<div class="px-6 py-3">
												<span class="text-sm text-gray-600 dark:text-gray-400">
													{new Date(row.created).toDateString()}
												</span>
											</div>
										</td>
										<td class="h-px w-px whitespace-nowrap">
											<form
												action="?/deleteShortLink"
												method="post"
												use:enhance={submitDeleteShortLink}
											>
												<input type="hidden" name="shortLinkId" value={row.id} />
												<div class="px-6 py-1.5">
													<button
														type="submit"
														class="inline-flex h-[2.875rem] w-[2.875rem] flex-shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-semibold text-white transition-all"
													>
														<Icon class="h-5 w-5 text-red-500 hover:text-red-400" src={Trash} />
													</button>
												</div>
											</form>
										</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
					<!-- End Table -->

					<!-- Footer -->
					<div
						class="grid gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700 md:flex md:items-center md:justify-between"
					>
						<div>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								<span class="font-semibold text-gray-800 dark:text-gray-200">
									{links.length}
								</span> results
							</p>
						</div>

						<div>
							<div class="inline-flex gap-x-2">
								{#if itemsPerPage < links.length}
									<button
										type="button"
										class="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
										on:click={() => (itemsPerPage = itemsPerPage + 4)}
									>
										Show more
										<svg
											class="h-3 w-3"
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											viewBox="0 0 16 16"
										>
											<path
												fill-rule="evenodd"
												d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
											/>
										</svg>
									</button>
								{/if}
							</div>
						</div>
					</div>
					<!-- End Footer -->
				</div>
			</div>
		</div>
	</div>
	<!-- End Card -->
</div>
<!-- End Table Section -->
