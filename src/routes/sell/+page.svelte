<script lang="ts">
	import { enhance } from '$app/forms';
	import Navigation from '$lib/components/Navigation.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let isSubmitting = false;
</script>

<div class="flex min-h-screen flex-col bg-white text-black">
	<Navigation currentPath="+page" />
	<main class="flex flex-1 flex-col items-center justify-center p-8">
		<div class="w-full max-w-md">
			<h1 class="mb-8 text-4xl font-bold">Add Data Source</h1>

			<form
				method="POST"
				class="space-y-6"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update }) => {
						isSubmitting = false;
						await update();
					};
				}}
			>
				<div>
					<label for="id" class="mb-2 block text-sm font-medium text-gray-700"> ID </label>
					<input
						type="text"
						id="id"
						name="id"
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-black"
						value={form?.values?.id ?? ''}
					/>
				</div>

				<div>
					<label for="description" class="mb-2 block text-sm font-medium text-gray-700">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						required
						rows="4"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-black"
						>{form?.values?.description ?? ''}</textarea
					>
				</div>

				{#if form?.error}
					<div class="rounded-lg bg-red-50 p-4 text-red-700">
						{form.error}
					</div>
				{/if}

				<button
					type="submit"
					disabled={isSubmitting}
					class="flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if isSubmitting}
						<span
							class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></span>
					{/if}
					{isSubmitting ? 'Adding...' : "Let's go!"}
				</button>
			</form>
		</div>
	</main>
</div>
