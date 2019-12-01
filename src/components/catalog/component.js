import { mapActions } from 'vuex';
import FullPath from '../path/component.vue'
import Files from '../files/component.vue'

export default {
	name: 'Catalog',
	props: [
		'idCatalog'
	],
	components: {
		FullPath,
		Files,
	},

	methods: {
		...mapActions([
			'updateCatalog',
		]),

		setSource() {
			this.$store.commit('setSourcePath', this.idCatalog);
			return true;
		},
	},

	mounted: function () {
		this.updateCatalog(this.idCatalog);
	}

}