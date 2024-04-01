<script lang="ts">
	// Button component logic
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cva, type VariantProps } from "class-variance-authority";

	const button = cva("font-bold py-2 px-4 rounded", {
		variants: {
			variant: {
				primary: "bg-blue-500 hover:bg-blue-700 text-white ",
				secondary: "bg-slate-500 hover:bg-slate-700 text-white ",
			},
			size: {
				small: "text-sm",
				medium: "text-base",
			},
		}
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {}

	/**
	 * For Svelte components, we recommend setting your defaultVariants within
	 * Svelte props (which are `undefined` by default)
	 */
	export let variant: $$Props["variant"] = "primary";
	export let size: $$Props["size"] = "medium";
</script>

<style>
    /* Tailwind CSS styles */
    /* Your custom styles */
</style>

<button {...$$props} class={button({ variant , size, class: $$props.class })}>
	<slot />
</button>
