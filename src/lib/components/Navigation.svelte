<script>
	export let currentPath = '/';
</script>

<nav class="flex items-center justify-between border-b border-gray-200 p-6">
	<div class="text-2xl font-bold">data market</div>
	<div class="space-x-8">
		<a href="#features" class="hover:text-gray-600" class:hidden={currentPath === '/login'}
			>Features</a
		>
		<a href="#pricing" class="hover:text-gray-600" class:hidden={currentPath === '/login'}
			>Pricing</a
		>
		<a href="#contact" class="hover:text-gray-600" class:hidden={currentPath === '/login'}
			>Contact</a
		>
		{#if currentPath === '/login'}
			<a href="/" class="hover:text-gray-600">Home</a>
		{:else}
			<button class="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
				Get Started
			</button>
		{/if}
	</div>
</nav>
