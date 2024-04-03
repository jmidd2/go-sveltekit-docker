<script lang="ts">
	import Events from '$lib/components/Events.svelte';
	import type { DockerEvent } from '$lib/types';
	import useEventSource from '$lib/useEventSource';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';

	const events = getContext<Writable<DockerEvent[]>>( 'events' );

	useEventSource<DockerEvent[]>( 'http://localhost:8080/events',
		( event ) => { events.update( arr => arr.concat( event ) ); }
	);
</script>

<div>
	<h1>Docker Events</h1>
	<Events events={$events} />
</div>
