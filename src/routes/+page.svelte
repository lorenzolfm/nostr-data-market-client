<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Features from '$lib/components/Features.svelte';
	import Globe from '$lib/components/Globe.svelte';
	import { goto } from '$app/navigation';
	import { pubkey } from '$lib/store';

	let publicKey: string;

	async function requestNostrPublicKey() {
		try {
			const publicKey = await window.nostr.getPublicKey();
			return publicKey;
		} catch (error) {
			console.error('Error getting public key:', error);
			throw error;
		}
	}
	async function connectWithNostr() {
		try {
			publicKey = await requestNostrPublicKey();

			await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({ publicKey }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			goto('/profile');
		} catch (error) {
			console.log(error);
		}

		goto('/profile');
	}
</script>

<div class="flex min-h-screen flex-col bg-white text-black">
	<Navigation currentPath="/" />

	<main class="flex flex-1">
		<div class="flex w-1/2 flex-col justify-center p-12">
			<h1 class="mb-6 text-6xl leading-tight font-bold">Buy and Sell data. Anything, anywhere.</h1>
			<p class="mb-8 text-xl text-gray-600">
				For too long corporations and governments have been in control of your data. It's time to
				take back control.
			</p>
			<div class="space-x-4">
				<button
					class="rounded-lg bg-black px-8 py-4 text-white hover:bg-gray-800"
					onclick={connectWithNostr}>Login</button
				>
			</div>
		</div>
		<div class="flex w-1/2 items-center justify-center">
			<Globe />
		</div>
	</main>

	<Features />
</div>
