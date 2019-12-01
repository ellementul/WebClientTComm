import { mapState, mapMutations } from 'vuex';
export default {
	name: 'modal',

	computed: mapState([
		'currentAction'
	]),

	methods: {
		...mapMutations({
			close: 'closeModal'
		}),

		makeAction(){
			this.$store.dispatch(this.currentAction);
			this.close();
		}
	},
};