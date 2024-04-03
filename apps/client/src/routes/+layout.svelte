<script lang="ts">
	import type { Container, DockerEvent } from '$lib/types';
	import { setContext } from 'svelte';
	import { type Writable, writable } from 'svelte/store';
	import Header from './Header.svelte';
	import '../app.css';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const containers = writable<Container[]>([]);
	$: containers.set(data.containers)

	const events = writable([]);

	setContext<Writable<Container[]>>('containers', containers);
	setContext<Writable<DockerEvent[]>>('events', events)
</script>

<div class="app text-white">
	<Header />

	<main>
		<slot />
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
