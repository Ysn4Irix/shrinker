<script>
	import { enhance, applyAction } from '$app/forms'
	import Card from '$lib/components/Card.svelte'
	import SettingInput from '$lib/components/SettingInput.svelte'
	import toast from 'svelte-french-toast'
	import { invalidateAll } from '$app/navigation'

	/** @type {import('./$types').ActionData} */
	export let form

	let loading = false
	let modalLoading = false

	const submitSecurityAccountDelete = () => {
		modalLoading = true
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Account deleted successfully')
					await invalidateAll()
					break
				case 'error':
					toast.error(result.error.message)
					break
				default:
					await applyAction(result)
			}
			modalLoading = false
		}
	}

	const submitSecurityChangePassword = () => {
		loading = true
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Password changed successfully')
					await invalidateAll()
					break
				case 'error':
					toast.error(result.error.message)
					break
				default:
					await applyAction(result)
			}
			loading = false
		}
	}
</script>

<svelte:head>
	<title>Settings | Security</title>
</svelte:head>
<Card headerText="Security" headerDesc="Manage your account password and account deletion">
	<form action="?/updatePassword" method="POST" use:enhance={submitSecurityChangePassword}>
		<!-- Grid -->
		<div class="grid grid-cols-12 gap-4 sm:gap-6">
			<!-- End Col -->
			<SettingInput
				id="oldPassword"
				type="password"
				label="Old Password"
				errors={form?.errors?.oldPassword}
				disabled={loading}
			/>
			<!-- End Col -->

			<!-- End Col -->
			<SettingInput
				id="password"
				type="password"
				label="New Password"
				errors={form?.errors?.password}
				disabled={loading}
			/>
			<!-- End Col -->

			<!-- End Col -->
			<SettingInput
				id="passwordConfirm"
				type="password"
				label="Confirm New Password"
				errors={form?.errors?.passwordConfirm}
				disabled={loading}
			/>
			<!-- End Col -->
		</div>
		<!-- End Grid -->

		<div class="mt-5 flex justify-end gap-x-2">
			<button
				class:disabled={loading}
				type="submit"
				class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
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
					Save changes
				{/if}
			</button>
		</div>
	</form>
	<div class="mb-1 mt-5 rounded-md border border-red-300 bg-red-200 p-3" role="alert">
		<div class="flex">
			<div class="ml-4">
				<div class="mb-2">
					<h2 class="pb-1 text-xl font-semibold text-red-800 dark:text-red-800">Danger Zone</h2>
				</div>
				<div class="mt-2 text-sm text-red-700">
					<button
						data-hs-overlay="#hs-modal-account-deletion"
						class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
					>
						Delete your account
					</button>
				</div>
			</div>
		</div>
	</div>
</Card>
<!-- Account Deletion Confirm Modal -->
<div
	id="hs-modal-account-deletion"
	class="hs-overlay fixed left-0 top-0 z-[60] hidden h-full w-full overflow-y-auto overflow-x-hidden"
>
	<div
		class="m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg md:mx-auto md:w-full md:max-w-2xl"
	>
		<div
			class="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="absolute right-2 top-2">
				<button
					type="button"
					class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-sm text-gray-500 transition-all hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
					data-hs-overlay="#hs-modal-account-deletion"
				>
					<span class="sr-only">Close</span>
					<svg
						class="h-3.5 w-3.5"
						width="8"
						height="8"
						viewBox="0 0 8 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>

			<div class="overflow-y-auto p-4 sm:p-10">
				<div class="flex gap-x-4 md:gap-x-7">
					<!-- Icon -->
					<span
						class="inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:border-red-600 dark:bg-red-700 dark:text-red-100 sm:h-[62px] sm:w-[62px]"
					>
						<svg
							class="h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
							/>
						</svg>
					</span>
					<!-- End Icon -->

					<div class="grow">
						<h3 class="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">Delete Account</h3>
						<p class="text-gray-400">
							Permanently remove your Account and all of its associated links from Shrinker
							platform. This action is not reversible, so please continue with caution.
						</p>
					</div>
				</div>
			</div>

			<div
				class="flex items-center justify-end gap-x-2 border-t bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
			>
				<button
					type="button"
					class="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-2.5 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
					data-hs-overlay="#hs-modal-account-deletion"
				>
					Cancel
				</button>
				<form action="?/deleteAccount" method="post" use:enhance={submitSecurityAccountDelete}>
					<button
						class:disabled={modalLoading}
						type="submit"
						class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
						data-hs-overlay="#hs-modal-account-deletion"
					>
						{#if modalLoading}
							<div
								class="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
								role="status"
								aria-label="loading"
							>
								<span class="sr-only">Loading...</span>
							</div>
						{:else}
							Permanently delete
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- Account Deletion Confirm Modal -->
