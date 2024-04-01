<script>
  export let containers;
</script>

<div>
{#if containers.length > 0}
    <ul>
        {#each containers as container}
            <li>
                {container.Id} - {container.Image}
            </li>
        {/each}
    </ul>
{:else}
    <p>No running containers</p>
{/if}
</div>
