import { mapState } from 'vuex';

import CatalogTabs from './components/catalogTabs/component.vue'
import TargetPath from './components/targetPath/component.vue'
import Modal from './components/modal_window/component.vue'
import Actions from './components/actions/component.vue'


export default {
	name: 'app',
		components: {
		TargetPath,
		CatalogTabs,
		Actions,
		Modal
	},
	computed: mapState([
		'currentAction'	
	]),

}
