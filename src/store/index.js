import Vue from 'vue'
import Vuex from 'vuex'

import fs from '../api/fileSystem'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state: {
		catalogs: [
			{
				disk: "ServerRoot",
				path: "/",
				files: [],
				changed: []
			},
			{
				disk: "ServerRoot",
				path: "/",
				files: [],
				changed: []
			}
		],
		activedCatalogs: {
			source: null,
			target: null
		},
		disks: {
			"ServerRoot": {
				mount: ".",
				lastPath: ""
			}
		},
		errorMsg: ""
	},

	mutations: {

		addDisks({ disks }, newDisks) {
			newDisks.forEach((diskName) =>{
				if(disks[diskName])
					disks[diskName].mount = diskName + '/';
				else
					Vue.set(disks, diskName, {
						mount: diskName + '/',
						lastPath: ""
					});
			});
		},

		addCatalog({ catalogs }, path) {
			catalogs.push({
				path: path,
				files: [],
				changed: []
			});
		},

		updateCatalog(state, { path, files }) {
			state.catalogs.filter((catalog, index) => path == getCatalogFullPath(state, index))
				.forEach(catalog => {
					catalog.files = files;

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

		replacePath({ catalogs }, { idCatalog, newPath }) {
			catalogs[idCatalog].path = newPath;
		},

		setErrorMsg(state, msg) {
			state.errorMsg = msg;
		},
		
	},

	actions: {
		getLocalDisks({ commit }) {

			fs.getLocalDisks((disks) =>{
				if(disks.error)
					commit('setErrorMsg', disks);
				else
					commit('addDisks', disks);
			})
		},

		openFile({ dispatch, state}, { idCatalog, file }) {
			
			if(file.isDir){
				dispatch('replacePathCatalog', {
					idCatalog: idCatalog,
					newPath: state.catalogs[idCatalog].path + file.name + '/',
				});
			}
		},

		replacePathCatalog({ commit, state }, { idCatalog, newPath }) {
			let diskName = state.catalogs[idCatalog].disk;
			let diskPath = state.disks[diskName].mount;
			let fullPath = getFullPath(diskPath, newPath);

			fs.readDir(fullPath, (msg) =>{
				if(msg.content){
					commit('replacePath', { idCatalog, newPath });
					commit('updateCatalog', {path: msg.path, files: msg.content});
				}
				else(msg.error)
					commit('setErrorMsg', msg);
			})
		},

		updateCatalog({ commit, state }, idCatalog) {
			let path = getCatalogFullPath(state, idCatalog);

			fs.readDir(path, (msg) =>{
				if(msg.content)
					commit('updateCatalog', {path: msg.path, files: msg.content});
				else(msg.error)
					commit('setErrorMsg', msg);
			})
		}

	},

	getters: {

	},

	modules: {
	},
	strict: debug
})

function getCatalogFullPath(state, idCatalog){
	let catalog = state.catalogs[idCatalog];
	return getFullPath(state.disks[catalog.disk].mount, catalog.path);
}

function getFullPath(disk, path){
	return disk + '/' + path + '/';
}