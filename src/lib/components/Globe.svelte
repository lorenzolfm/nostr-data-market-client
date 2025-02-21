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

<canvas bind:this={canvas} class="h-96 w-96" />
