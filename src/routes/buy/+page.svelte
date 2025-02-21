<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let searchTerm = '';
	$: filteredSources = data.dataSources.filter(
		(source) =>
			source.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			source.location.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<div class="flex min-h-screen flex-col bg-white text-black">
	<main class="mx-auto w-full max-w-6xl flex-1 p-8">
		<div class="mb-8">
			<h1 class="mb-4 text-4xl font-bold">Available Data Sources</h1>
			<p class="text-gray-600">
				Browse and subscribe to verified data sources from our marketplace.
			</p>
		</div>

		<div class="mb-8">
			<input
				type="text"
				placeholder="Search by ID, description, or location..."
				bind:value={searchTerm}
				class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-black"
			/>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredSources as source}
				<div class="rounded-lg border border-gray-200 p-6 transition-colors hover:border-black">
					<div class="mb-4 flex items-start justify-between">
						<h2 class="text-xl font-bold">{source.id}</h2>
						<span class="rounded-full bg-black px-3 py-1 text-sm text-white">
							{source.price} sats
						</span>
					</div>

					<p class="mb-4 text-gray-600">
						{source.description}
					</p>

					<div class="mb-6 space-y-2">
						<div class="flex items-center text-sm">
							<span class="w-24 text-gray-500">Location:</span>
							<span>{source.location}</span>
						</div>
						<div class="flex items-center text-sm">
							<span class="w-24 text-gray-500">Updates:</span>
							<span>Every {source.updateFrequency}</span>
						</div>
						<div class="flex items-center text-sm">
							<span class="w-24 text-gray-500">Owner:</span>
							<span class="truncate" title={source.owner}>{source.owner}</span>
						</div>
					</div>

					<a
						href={`buy/${source.id}`}
						class="w-full rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
					>
						Buy
					</a>
				</div>
			{/each}
		</div>

		<!-- Empty State -->
		{#if filteredSources.length === 0}
			<div class="py-12 text-center">
				<p class="text-gray-600">No data sources found matching your search.</p>
			</div>
		{/if}
	</main>
</div>
