import { mapState, mapActions } from 'vuex';
export default {
	name: 'FullPath',
	props: [
		'idCatalog'
	],

	computed: mapState({
		disks: state => state.disks,

		path({ catalogs }){
			return catalogs[this.idCatalog].path.join('/');
		},

		selectedDisk({ catalogs }){
			return catalogs[this.idCatalog].disk;
		}
	}),

	methods: {
		...mapActions([
			'getLocalDisks',
		]),

		setDisk(event) {
			this.$store.dispatch('changeDisk', {idCatalog: this.idCatalog, nameDisk: event.target.value})
		},

		escapeCatalog() {
			this.$store.dispatch('escape', {idCatalog: this.idCatalog});
		},
	},

	mounted: function () {
		this.$store.dispatch('getLocalDisks');
	},
}