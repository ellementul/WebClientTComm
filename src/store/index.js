import Vue from 'vue'
import Vuex from 'vuex'

import fs from '../api/fileSystem'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state: {
		catalogs: [
			{
				path: "./",
				files: [{name: "File1", size: 0}, {name: "File2", size: 0}],
				changed: []
			},
			{
				path: "./",
				files: [{name: "File3", size: 0}, {name: "File4", size: 0}],
				changed: []
			}
		],
		activedCatalogs: {
			source: null,
			target: null
		},
		disks: {
			"None": {
				mount: "./",
				lastPath: ""
			}
		},
		errorMsg: ""
	},

	mutations: {

		addCatalog({ catalogs }, pathCatalog) {
			catalogs.push({
				path: pathCatalog,
				files: [],
				changed: []
			});
		},

		updateCatalog({ catalogs }, pathCatalog, files) {
			catalogs.filter(catalog => pathCatalog == catalog.path)
				.forEach(catalog => {
					catalog.files = [...files];

					catalog.changed = catalog.changed.filter(filename => {
						return !files.some(file => file.name == filename)
					})
				})
		},

		activeCatalog({ activedCatalogs }, idCatalog) {
			activedCatalogs.source = activedCatalogs.target;
			activedCatalogs.target = idCatalog;
		},

		closeCatalog(state, idCatalog) {
			state.catalogs.splice(idCatalog, 1);
			state.commit('activeCatalog', idCatalog);
		},

		setLastPath({ disks }, idDisk, path) {
			disks[idDisk].lastPath = path;
		},

		changeFile({ catalogs }, idCatalog, filename) {
			catalogs[idCatalog].changed.push(filename);
		},

		unchangeFile({ catalogs }, idCatalog, filename) {
			let changedFiles = catalogs[idCatalog].changed;
			let index = changedFiles.indexOf(filename);
			if(index != -1)
				changedFiles.splice(index, 1);
		},

		setErrorMsg(state, msg) {
			state.errorMsg = msg;
		}
		
	},

	actions: {

		updateCatalog({ commit, state: { catalogs }}, idCatalog) {
			let path = catalogs[idCatalog].path;

			fs.readDir(path, (msg) =>{
				if(msg.content)
					commit('updateCatalog', msg.path, msg.content);
				else(msg.error)
					commit('setErrorMsg', msg.error);
			})
		}

	},

	modules: {
	},
	strict: debug
})
