import { mapState, mapActions } from 'vuex';
import FullPath from '../path/component.vue'
import File from '../file/component.vue'

export default {
	name: 'Catalog',
	props: [
		'idCatalog'
	],
	components: {
		FullPath,
		File
	},

	data: function(){
		return {};
	},

	computed: mapState({
		files({ catalogs }){
			return catalogs[this.idCatalog].files;
		}
	}),

	methods: {
		...mapActions([
			'updateCatalog'
		])
	},

	mounted: function () {
		this.updateCatalog(this.idCatalog);
	}

}