export default {
	name: 'ActionButton',
	props: [
		'title'
	],
	methods: {
		pressButton() {
			this.$emit('press', this.title);
		}
	}
}