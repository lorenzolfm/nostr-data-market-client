<script lang="ts">
	import { onMount } from 'svelte';

	interface Dot {
		x: number;
		y: number;
		z: number;
		initialZ: number;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	const dots: Dot[] = [];

	// Generate points on a sphere
	function generateSpherePoints() {
		const numPoints = 200;
		for (let i = 0; i < numPoints; i++) {
			const theta = Math.random() * 2 * Math.PI;
			const phi = Math.acos(2 * Math.random() - 1);
			const radius = 150;

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.sin(phi) * Math.sin(theta);
			const z = radius * Math.cos(phi);

			dots.push({ x, y, z, initialZ: z });
		}
	}

	function animate() {
		if (ctx === null) {
			return;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Rotate points
		const time = Date.now() * 0.001;
		dots.forEach((dot) => {
			const rotatedX = dot.x * Math.cos(time) - dot.z * Math.sin(time);
			const rotatedZ = dot.x * Math.sin(time) + dot.z * Math.cos(time);

			// Project 3D to 2D
			const scale = 800 / (800 + rotatedZ);
			const x2d = rotatedX * scale + canvas.width / 2;
			const y2d = dot.y * scale + canvas.height / 2;

			// Draw dot with size and opacity based on z-position
			const size = Math.max(1, scale * 3);
			const opacity = (rotatedZ + 150) / 300;

			if (ctx === null) {
				return;
			}

			ctx.beginPath();
			ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
			ctx.fill();
		});

		requestAnimationFrame(animate);
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvas.width = 400;
		canvas.height = 400;

		generateSpherePoints();
		animate();
	});
</script>

<div class="flex min-h-screen flex-col bg-white text-black">
	<nav class="flex items-center justify-between border-b border-gray-200 p-6">
		<div class="text-2xl font-bold">data market</div>
		<div class="space-x-8">
			<a href="#features" class="hover:text-gray-600">Features</a>
			<a href="#contact" class="hover:text-gray-600">Contact us</a>
		</div>
	</nav>

	<main class="flex flex-1">
		<div class="flex w-1/2 flex-col justify-center p-12">
			<h1 class="mb-6 text-6xl leading-tight font-bold">Buy and Sell data. Anything, anywhere.</h1>
			<p class="mb-8 text-xl text-gray-600">
				For too long corporations and governments have been in control of your data. It's time to
				take back control.
			</p>
			<div class="space-x-4">
				<a class="rounded-lg bg-black px-8 py-4 text-white hover:bg-gray-800" href="/login">
					Create your account
				</a>
			</div>
		</div>
		<div class="flex w-1/2 items-center justify-center">
			<canvas bind:this={canvas} class="h-96 w-96"></canvas>
		</div>
	</main>

	<section id="features" class="bg-gray-50 px-12 py-20">
		<h2 class="mb-16 text-center text-4xl font-bold">Key Features</h2>
		<div class="grid grid-cols-3 gap-12">
			{#each [{ title: 'Real-time Analytics', description: 'Get instant insights from sensors around the world' }, { title: 'Buy with Bitcoin', description: 'You want data from another country? No need for buerocracy. Pay with Bitcoin' }, { title: 'Powered by NOSTR', description: 'No need to ask for permission. All you need is a NOSTR account' }] as feature}
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-xl font-bold">{feature.title}</h3>
					<p class="text-gray-600">{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>
</div>
