<script>
	export let currentPath = '/';
</script>

<nav class="flex items-center justify-between border-b border-gray-200 p-6">
	<div class="text-2xl font-bold"><a href="/">nostr data market</a></div>
	<div class="space-x-8">
		<a href="#features" class="hover:text-gray-600" class:hidden={currentPath === '/login'}
			>Features</a
		>
		<a href="#contact" class="hover:text-gray-600" class:hidden={currentPath === '/login'}
			>Contact</a
		>
	</div>
</nav>
