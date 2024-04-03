export default function useEventSource<T>(url: string | URL, func: (event: T) => void) {
	const eventSource = new EventSource( url );

	eventSource.addEventListener( 'message', ( msgEvent ) => {
		// Handle event
		const event = JSON.parse( msgEvent.data );
		func(event);
	} );
}
