import { mapState } from 'vuex';
import FullPath from '../path/component.vue'

export default {
	name: 'TargetPath',
	props: [],
	components: {
		FullPath,
	},

	computed: mapState({
		idCatalog(state){
			return state.targetCatalog;
		}
	}),

	methods: {
	},

}