<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let isSubmitting = false;
</script>

<div class="min-h-screen bg-white text-black">
	<main class="mx-auto max-w-md p-8">
		<h1 class="mb-8 text-3xl font-bold">How can I call you?</h1>

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
			<input type="hidden" name="pubkey" value={data.pubkey} />

			<div>
				<input
					type="text"
					id="nickname"
					name="nickname"
					required
					placeholder="Sr Gonzallo Rebuscado Jr."
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-black"
					value={form?.values?.nickname ?? ''}
				/>
				{#if form?.error}
					<p class="mt-2 text-sm text-red-600">{form.error}</p>
				{/if}
			</div>

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
				{isSubmitting ? 'Registering...' : 'Complete Registration'}
			</button>
		</form>
	</main>
</div>

