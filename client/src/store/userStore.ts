import { writable } from 'svelte/store';
import type { User } from 'types';

const userInfoFromStorage = localStorage.getItem('userInfo');
const loggedInUserInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) as User : null;

interface UserStore {
	userInfo: User | null;
}

const state = writable<UserStore>({
	userInfo: loggedInUserInfo,
});

export default {
	...state,
	login: (name: string) => {
		state.update(() => { return { userInfo: { name }}})
	},
	logout: () => {
		state.set({ userInfo: null })
	},
}
