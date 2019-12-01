import { mapMutations, mapActions } from 'vuex';
import Button from '../action_button/component.vue'
export default {
	name: 'Actions',
	props: [],
	components: {
		Button
	},
	methods: {
		...mapMutations([
			'move',
			'copy'
		]),

		...mapActions([
			'remove'
		]),

		runAction(action) {
			this[action]();
		}
	}
}