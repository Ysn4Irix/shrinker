<script>
	import { enhance, applyAction } from '$app/forms'
	import { getImageUrl } from '$lib/utils'
	import Card from '$lib/components/Card.svelte'
	import SettingInput from '$lib/components/SettingInput.svelte'
	import toast from 'svelte-french-toast'
	import { invalidateAll } from '$app/navigation'

	/** @type {import('./$types').PageData} */
	export let data

	$: ({ user } = data)

	/** @type {import('./$types').ActionData} */
	export let form

	let loading = false

	// let previewedImage

	const submitProfile = () => {
		loading = true
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Profile updated successfully.')
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

	/**
	 * Preview the uploaded image
	 * @param event
	 * @returns {Promise<void>}
	 */

	//! TODO: Fix preview image not working idk why 🤷‍♂️

	/* 	const showPreviewedImage = async (event) => {
		console.log('🚀 ~ file: +page.svelte:21 ~ showPreviewedImage ~ event:', event)

		const file = event.target.files[0]

		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				previewedImage = reader.result
			}
			reader.readAsDataURL(file)
		}
	} */
</script>

<svelte:head>
	<title>Settings | Profile</title>
</svelte:head>
<Card headerText="Profile" headerDesc="Manage your profile photo and fullname.">
	<form
		action="?/updateProfile"
		method="POST"
		enctype="multipart/form-data"
		use:enhance={submitProfile}
	>
		<!-- Grid -->
		<div class="grid grid-cols-12 gap-4 sm:gap-6">
			<div class="col-span-3">
				<label for="avatar" class="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200">
					Profile photo
				</label>
			</div>
			<!-- End Col -->

			<div class="col-span-9">
				<div class="flex items-center gap-5">
					<!-- bind:this={previewedImage} -->
					<img
						id="avatar"
						class="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
						src={user.avatar
							? getImageUrl(user.collectionId, user.id, user.avatar, '38x38')
							: user.avatarUrl
							? user.avatarUrl
							: `https://api.dicebear.com/5.x/thumbs/svg?radius=50&seed=${data.user?.name}`}
						alt="Avatar"
					/>

					<div class="flex gap-x-2">
						<div>
							<!-- on:change={(event) => showPreviewedImage(event)} -->
							<!-- End Col -->
							<SettingInput
								id="avatar"
								type="file"
								label=""
								errors={form?.errors?.avatar}
								disabled={loading}
							/>
							<!-- End Col -->
						</div>
					</div>
				</div>
			</div>
			<!-- End Col -->
			<SettingInput
				id="name"
				type="text"
				label="Fullname"
				value={form?.data?.name ?? user.name}
				errors={form?.errors?.name}
				disabled={loading}
			/>
			<!-- End Col -->
		</div>
		<!-- End Grid -->

		<div class="mt-5 flex justify-end gap-x-2">
			<button
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
</Card>
