<script>
	export let features = [
		{
			title: 'Secure Transactions',
			description: 'Enterprise-grade security and automated escrow system for safe data exchange'
		},
		{
			title: 'Global Marketplace',
			description: 'Connect with thousands of verified data providers and buyers worldwide'
		},
		{
			title: 'Quality Assured',
			description: 'All datasets are verified and rated by our community of data experts'
		}
	];
</script>

<section id="features" class="bg-gray-50 px-12 py-20">
	<h2 class="mb-16 text-center text-4xl font-bold">Key Features</h2>
	<div class="grid grid-cols-3 gap-12">
		{#each features as feature}
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h3 class="mb-4 text-xl font-bold">{feature.title}</h3>
				<p class="text-gray-600">{feature.description}</p>
			</div>
		{/each}
	</div>
</section>
