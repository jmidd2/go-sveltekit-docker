import { writable } from 'svelte/store';
import { Action } from './enums';
import type { Container, DockerEvent } from './types';

export default function useFetchContainers(
  eventSource: EventSource | undefined
) {
  const data = writable<undefined | Container[]>();
  const error = writable();
  const isLoading = writable(false);

  async function fetchData() {
    isLoading.set(true);
    try {
      const response = await fetch('http://localhost:8080/');
      const result = await response.json();
      data.set(result);
      error.set(undefined);
    } catch (err) {
      data.set(undefined);
      error.set(err);
    }
    isLoading.set(false);
  }

  if (eventSource !== undefined) {
    eventSource.addEventListener('message', (msgEvent) => {
      const event = JSON.parse(msgEvent.data) satisfies DockerEvent;
      if (event.Action === Action.Start || event.Action === Action.Remove) {
        fetchData(); // Re-fetch data when new event is received
      }
    });
  }

  fetchData();

  return { isLoading, error, data };
}
