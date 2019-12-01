export default {
	name: 'File',
	props: [
		'file'
	],
	computed: {
		time(){
			return (new Date(this.file.ctime)).toDateString();
		},
		size(){
			if(this.file.size < 1024)
				return this.file.size + " byte";

			if(this.file.size < 1024 * 1024)
				return (this.file.size / 1024).toFixed(1) + " Kb";

			if(this.file.size < 1024 * 1024 * 1024)
				return (this.file.size / (1024 * 1024)).toFixed(1) + " Mb";
		}
	},

	methods: {
	}
}