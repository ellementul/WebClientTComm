import { mapState, mapActions } from 'vuex';
export default {
	name: 'FullPath',
	props: [
		'idCatalog'
	],
	computed: mapState({
		disks: state => state.disks,

		path({ catalogs }){
			return catalogs[this.idCatalog].path;
		}
	}),

	methods: {
		...mapActions([
			'getLocalDisks',
			'updateCatalog',
		]),

		updatePath(){
			
		}
	},

	mounted: function () {
		this.getLocalDisks();
	},
}