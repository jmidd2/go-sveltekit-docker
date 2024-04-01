<script  lang="ts">
	import { invalidate } from '$app/navigation';
	import Containers from '$lib/components/Containers.svelte';
	import { Action } from '$lib/enums';
	import type { DockerEvent } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const error = false;

	const eventSource = new EventSource( 'http://localhost:8080/events' );

	eventSource.addEventListener( 'message', ( msgEvent ) => {
		// Handle event
		const event: DockerEvent = JSON.parse( msgEvent.data );
		if (event.Action === Action.Remove || event.Action === Action.Create) {
			console.log(event)
			invalidate('app:containers')
		}
	} );
</script>

<svelte:head>
	<title>Containers</title>
	<meta name="description" content="List of containers" />
</svelte:head>

<div>
	<h1>Running Containers</h1>
	{#if error}
		<p>An error occurred while fetching users</p>
	{:else if data.containers}
		<Containers containers={data.containers} />
	{/if}
</div>
