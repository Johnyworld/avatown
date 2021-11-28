import { writable } from 'svelte/store';

const state = writable({
	code: '',
});

export default {
	...state,
	updateCode: (code: string) => {
		state.update(() => { return { code }})
	},
	resetCode: () => {
		state.set({ code: '' })
	},
}
