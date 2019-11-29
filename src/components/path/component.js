import { mapState } from 'vuex';
export default {
	name: 'Path',
	props: [
		'idCatalog'
	],
	computed: mapState({
		disks: state => state.disks,

		path({ catalogs }){
			return catalogs[this.idCatalog].path;
		}
	}),
}