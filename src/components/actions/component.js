import { mapActions } from 'vuex';
import Button from '../action_button/component.vue'
export default {
	name: 'Actions',
	props: [],
	components: {
		Button
	},
	methods: {
		...mapActions([
			'move',
			'copy',
			'remove'
		]),
	}
}