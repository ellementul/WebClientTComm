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
		files({ catalogs }){
			return catalogs[this.idCatalog].files;
		},

		changedFiles({ catalogs }){
			return catalogs[this.idCatalog].changed;
		},
	}),

	methods: {

		openItem(index) {
			this.$store.dispatch('open', {idCatalog: this.idCatalog, file: this.files[index]})
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