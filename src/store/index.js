import Vue from 'vue'
import Vuex from 'vuex'

import fs from '../api/fileSystem'
import navigation from './navigation'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
	state: {
		currentAction: null,
		errorMsg: ""
	},

	modules: {
		navigation,
	},

	getters: {

	},

	mutations: {

		copy(state, idCatalog){
			state.currentAction = 'copy';
			state.targetCatalog = idCatalog || state.targetCatalog
		},

		move(state, idCatalog){
			state.currentAction = 'copy';
			state.targetCatalog = idCatalog || state.targetCatalog
		},

		

		closeModal(state) {
			state.currentAction = null;
			state.isShowModal = false;
		},

		setErrorMsg(state, msg) {
			state.errorMsg = msg;
		},
		
	},

	actions: {

		copy({ dispatch, commit, getters }){
			let source = getters.source;
			let target = getters.target;
			let changedFiles = getters.getChangedFileNames;

			changedFiles.forEach(nameFile => fs.copy(source, target, nameFile, (msg) =>{
				if(msg.error)
					commit('setErrorMsg', {title: "Error update new path!", error: msg.error});

				dispatch('update');
			}));
		},

		move({ dispatch, commit, getters }){
			let source = getters.source;
			let target = getters.target;
			let changedFiles = getters.getChangedFileNames;

			changedFiles.forEach(nameFile => fs.move(source, target, nameFile, (msg) =>{
				if(msg.error)
					commit('setErrorMsg', {title: "Error update new path!", error: msg.error});

				dispatch('update');
			}));
		},

		remove({ dispatch, commit, getters }){
			let path = getters.source;
			let changedFiles = getters.getChangedFileNames;
			
			changedFiles.forEach(nameFile => fs.remove(path, nameFile, (msg) =>{
				if(msg.error)
					commit('setErrorMsg', {title: "Error update new path!", error: msg.error});

				dispatch('update');
			}));
		},

	},
	strict: debug
})