// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

/** @type {import('./$types').ServerLoad} */
export async function load({depends}){
	const response = await fetch('http://127.0.0.1:8080/');
	const data = await response.json();

	depends('app:containers')
	return {
		serverMessage: 'Hello World!',
		containers: data
	}
}
