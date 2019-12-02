import Catalog from '../catalog/component.vue'

export default {
	name: 'catalogTabs',
	components: {
		Catalog
	},
	computed: {
		catalogs() {
			let cats = this.$store.state.navigation.catalogs;
			cats.forEach((catalog, index) => catalog.id = index);
			return cats.filter(catalog => !catalog.notLoadingContent);
		}
	},

}