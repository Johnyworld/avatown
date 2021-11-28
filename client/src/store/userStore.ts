import { writable } from 'svelte/store';
import type { User } from 'types';

interface UserStore {
	userInfo: User | null;
}

const state = writable<UserStore>({
	userInfo: null,
});

export default {
	...state,
	login: (username: string) => {
		state.update(() => { return { userInfo: { username }}})
	},
	logout: () => {
		state.set({ userInfo: null })
	},
}
