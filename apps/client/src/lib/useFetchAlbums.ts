import { writable } from 'svelte/store';

export type Album = {
  id: string;
  title: string;
  artist: string;
  price: number;
}

export default function useFetchAlbums() {
  const data = writable<undefined | Album[]>();
  const error = writable();
  const isLoading = writable(false);

  async function fetchData() {
    isLoading.set(true);
    try {
      const response = await fetch('http://localhost:8080/albums');
      const result = await response.json();
      data.set(result);
      error.set(undefined);
    } catch (err) {
      data.set(undefined);
      error.set(err);
    }
    isLoading.set(false);
  }

  fetchData();

  return { isLoading, error, data };
}
