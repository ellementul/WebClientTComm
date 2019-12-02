import { mapState } from 'vuex';
import File from '../file/component.vue'

export default {
	name: 'Catalog',
	props: [
		'idCatalog',
	],
	components: {
		File
	},

	computed: mapState({
		files({ navigation: { catalogs } }){
			return catalogs[this.idCatalog].files;
		},

		changedFiles({ navigation: { catalogs } }){
			return catalogs[this.idCatalog].changed;
		},
	}),

	methods: {

		openItem(index) {
			this.$store.dispatch('open', {idCatalog: this.idCatalog, file: this.files[index], isLoadingContent: true})
			return true;
		},

		isSelected(index) {
			return (this.changedFiles.indexOf(index) != -1);
		},

		switchChange(index) {
			this.$store.commit('switchChangedItem', { idFile: index,  idCatalog: this.idCatalog});
			return true;
		},
	}

}