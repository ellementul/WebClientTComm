import { mapState, mapActions } from 'vuex';
import File from '../file/component.vue'

export default {
	name: 'Catalog',
	props: [
		'idCatalog'
	],
	components: {
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