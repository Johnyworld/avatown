import { writable } from 'svelte/store';

export const currentRoom = writable({
	code: '',
});
