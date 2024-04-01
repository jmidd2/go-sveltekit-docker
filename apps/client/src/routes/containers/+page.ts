import type { Container } from '$lib/types';

/** @type {import('./$types').PageLoad} */
export async function load({fetch, depends}): Promise<{containers: Container[]}> {
	const response = await fetch('http://localhost:8080/');
	const result = await response.json();

	depends('app:containers')

	return {
		containers: result
	}
}

export const ssr = false;
