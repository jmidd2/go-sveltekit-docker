<script lang="ts">
	import Containers from '$lib/components/Containers.svelte';
	import Events from '$lib/components/Events.svelte';
	import type { Container, DockerEvent } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	const containers = getContext<Writable<Container[]>>('containers');
	const events = getContext<Writable<DockerEvent[]>>('events');
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-2xl">
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
	</h1>

	<Containers containers={$containers} />
	<Events events={$events} />
</section>

<style>

</style>
