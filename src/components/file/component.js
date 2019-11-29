export default {
	name: 'File',
	props: [
		'file'
	],
	methods: {
		open() {
			this.$emit('open-file', this.file);
		}
	}
}