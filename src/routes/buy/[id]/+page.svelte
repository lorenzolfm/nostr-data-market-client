<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import DateRangePicker from '$lib/components/DateRangePicker.svelte';

	export let data: PageData;
	const { sensor } = data;

	let startDate = '';
	let endDate = '';
	let isSubmitting = false;

	$: totalDays =
		startDate && endDate
			? Math.ceil(
					(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
				)
			: 0;

	$: totalPrice = totalDays * parseFloat(sensor.price);
</script>

<div class="min-h-screen bg-white text-black">
	<main class="mx-auto max-w-2xl p-8">
		<a href="/buy" class="mb-8 inline-block text-gray-600 hover:text-black"> ← Back to sensors </a>

		<div class="mb-8">
			<h1 class="mb-4 text-3xl font-bold">{sensor.id}</h1>
			<p class="mb-4 text-gray-600">{sensor.description}</p>

			<div class="space-y-2 rounded-lg bg-gray-50 p-4">
				<div class="flex items-center text-sm">
					<span class="w-24 text-gray-500">Location:</span>
					<span>{sensor.location}</span>
				</div>
				<div class="flex items-center text-sm">
					<span class="w-24 text-gray-500">Updates:</span>
					<span>Every {sensor.updateFrequency}</span>
				</div>
				<div class="flex items-center text-sm">
					<span class="w-24 text-gray-500">Price:</span>
					<span>{sensor.price} sats per day</span>
				</div>
			</div>
		</div>

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
			<DateRangePicker bind:startDate bind:endDate />

			{#if totalDays > 0}
				<div class="rounded-lg bg-gray-50 p-4">
					<p class="text-sm text-gray-600">
						Selected period: {totalDays} days
					</p>
					<p class="text-lg font-bold">
						Total: {totalPrice.toFixed(2)} sats
					</p>
				</div>
			{/if}

			<button
				type="submit"
				disabled={isSubmitting || !startDate || !endDate}
				class="flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if isSubmitting}
					<span
						class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
					></span>
				{/if}
				{isSubmitting ? 'Processing...' : 'Purchase Access'}
			</button>
		</form>
	</main>
</div>
