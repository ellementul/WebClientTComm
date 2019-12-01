import { mapState } from 'vuex';
import Catalog from '../catalog/component.vue'

export default {
	name: 'catalogTabs',
	components: {
		Catalog
	},
	computed: mapState({
		catalogs: state => {
			state.catalogs.forEach((catalog, index) => catalog.id = index)
			return state.catalogs.filter(catalog => !catalog.notLoadingContent)
		}
	}),

}