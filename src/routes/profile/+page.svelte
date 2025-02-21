<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import { onMount } from 'svelte';
	export let data;
	let userName: string;

	onMount(() => {
		if (!data.user) return;

		userName = data.user;
	});
</script>

<div class="flex min-h-screen flex-col bg-white text-black">
	<Navigation currentPath="/profile" />

	<main class="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-8">
		<div class="mb-16 text-center">
			<h1 class="mb-4 text-5xl font-bold">
				Hello, {userName}
			</h1>
			<p class="text-xl text-gray-600">What would you like to do today?</p>
		</div>

		<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
			<a
				class="group relative flex h-64 flex-col items-center justify-center rounded-xl border-2 border-black bg-white p-8 text-center transition-colors duration-300 hover:bg-black"
				href="/sell"
			>
				<div
					class="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-5"
				>
					<svg class="h-32 w-32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<h2 class="relative mb-4 text-2xl font-bold group-hover:text-white">I have data to sell</h2>
				<p class="relative text-gray-600 group-hover:text-gray-300">
					List your datasets and reach global buyers
				</p>
			</a>

			<a
				class="group relative flex h-64 flex-col items-center justify-center rounded-xl border-2 border-black bg-white p-8 text-center transition-colors duration-300 hover:bg-black"
				href="/buy"
			>
				<div
					class="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-5"
				>
					<svg class="h-32 w-32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
						/>
					</svg>
				</div>

				<h2 class="relative mb-4 text-2xl font-bold group-hover:text-white">I want to buy data</h2>
				<p class="relative text-gray-600 group-hover:text-gray-300">
					Browse verified datasets from trusted sellers
				</p>
			</a>
		</div>

		<!-- Quick Stats -->
		<div class="mt-16 w-full">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
				{#each [{ label: 'Active Listings', value: '3' }, { label: 'Completed Sales', value: '12' }, { label: 'Total Revenue', value: '$2,450' }, { label: 'Buyer Rating', value: '4.9/5' }] as stat}
					<div class="text-center">
						<p class="mb-2 text-3xl font-bold">{stat.value}</p>
						<p class="text-gray-600">{stat.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>

