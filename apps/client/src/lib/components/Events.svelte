<script lang="ts">
    import type { DockerEvent } from '$lib/types';

    export let events: DockerEvent[];
</script>

<div>
    {#each events as event}
        <p>{event.Action}, {event.Type}, {event.Actor.Attributes.name}</p>
    {/each}
</div>
