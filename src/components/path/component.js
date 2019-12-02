import { mapState, mapActions } from 'vuex';
export default {
	name: 'FullPath',
	props: [
		'idCatalog',
	],

	computed: mapState({
		disks: state => state.navigation.disks,

		path({ navigation: { catalogs } }){
			return '/'+ catalogs[this.idCatalog].path.join('/') + '/';
		},

		selectedDisk({ navigation: { catalogs } }){
			return catalogs[this.idCatalog].disk;
		}
	}),

	methods: {
		...mapActions([
			'getLocalDisks',
		]),

		setDisk(event) {
			this.$store.dispatch('changeDisk', {
				idCatalog: this.idCatalog, 
				nameDisk: event.target.value})
		},

		changePath(event) {
			this.$store.dispatch('replacePathCatalog', {
				idCatalog: this.idCatalog, 
				newPath: event.target.value.split('/').filter(name => name)})
		},

		escapeCatalog() {
			this.$store.dispatch('escape', this.idCatalog );
		},
	},

	mounted: function () {
		this.$store.dispatch('getLocalDisks');
	},
}