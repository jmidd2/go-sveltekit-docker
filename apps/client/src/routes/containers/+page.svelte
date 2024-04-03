<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Containers from '$lib/components/Containers.svelte';
	import type { Container, DockerEvent } from '$lib/types';
	import useEventSource from '$lib/useEventSource';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	useEventSource<DockerEvent[]>( 'http://localhost:8080/events', () => { invalidate( 'app:containers' ); } );

	const containers = getContext<Writable<Container[]>>( 'containers' );
</script>

<svelte:head>
	<title>Containers</title>
	<meta name="description" content="List of containers" />
</svelte:head>

<div>
	<h1>Running Containers</h1>
	<Containers containers={$containers} />
</div>
