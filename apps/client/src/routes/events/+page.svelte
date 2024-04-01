<script lang="ts">
	import Events from '$lib/components/Events.svelte';
	import type { DockerEvent } from '$lib/types';
	import { writable } from 'svelte/store';

	const events = writable<DockerEvent[]>( [] );

	const eventSource = new EventSource( 'http://localhost:8080/events' );

	eventSource.addEventListener( 'message', ( msgEvent ) => {
		// Handle event
		const event = JSON.parse( msgEvent.data );
		events.update( arr => arr.concat( event ) );
	} );
</script>

<div>
	<h1>Docker Events</h1>
	<Events events={$events} />
</div>
