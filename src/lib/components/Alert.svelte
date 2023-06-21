<script>
	export let errors
</script>

<div
	id="dismiss-alert"
	class="rounded-md border border-red-200 bg-red-50 p-4 transition duration-300 hs-removing:translate-x-5 hs-removing:opacity-0"
	role="alert"
>
	<div class="flex">
		<div class="flex-shrink-0">
			<svg
				class="mt-0.5 h-4 w-4 text-red-400"
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
		</div>
		<div class="ml-4">
			<h3 class="text-sm font-semibold text-red-800">
				A problem has been occurred while submitting your data.
			</h3>
			<div class="mt-2 text-sm text-red-700">
				<ul class="list-disc space-y-1 pl-5">
					{#each errors as error}
						<li>{error.message}</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="ml-auto pl-3">
			<div class="-mx-1.5 -my-1.5">
				<button
					type="button"
					class="inline-flex rounded-md bg-red-50 p-1.5 text-red-700 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
					data-hs-remove-element="#dismiss-alert"
				>
					<span class="sr-only">Dismiss</span>
					<svg
						class="h-3 w-3"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
