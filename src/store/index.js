import Vue from 'vue'
import Vuex from 'vuex'

import fs from '../api/fileSystem'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const defaultDisk = "ServerRoot";

let disks = {};
disks[defaultDisk] = {
	mount: "./",
	lastPath: []
};

let state =  {
	disks,
	catalogs: [
		{
			disk: defaultDisk,
			path: [],
			files: [],
			changed: []
		},
		{
			disk: defaultDisk,
			path: [],
			files: [],
			changed: []
		}
	],
	sourcePath: "",
	targetPath: "",
	errorMsg: ""
};

export default new Vuex.Store({
	state,

	mutations: {

		addDisks({ disks }, newDisks) {
			newDisks.forEach((diskName) =>{
				if(disks[diskName])
					disks[diskName].mount = diskName + '//';
				else
					Vue.set(disks, diskName, {
						mount: diskName + '//',
						lastPath: []
					});
			});
		},

		setPath({ catalogs, disks }, { idCatalog, newPath }) {
			let catalog = catalogs[idCatalog];
			catalog.path = newPath;
			disks[catalog.disk].lastPath = newPath;
		},

		setSourcePath(state, idCatalog) {
			state.sourcePath = getCatalogFullPath(state, idCatalog);
		},

		setDisk({ catalogs, disks }, { nameDisk, idCatalog }){
			if(!(nameDisk in state.disks))
				nameDisk = defaultDisk;

			catalogs[idCatalog].disk = nameDisk;
			catalogs[idCatalog].path = disks[nameDisk].lastPath;
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

		switchChangedItem({ catalogs }, {idCatalog, idFile}) {
			let changedFiles = catalogs[idCatalog].changed;
			let index = changedFiles.indexOf(idFile);

			if(index == -1)
				changedFiles.push(idFile);
			else
				changedFiles.splice(index, 1);
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

		open({ dispatch, state}, { idCatalog, file }) {
			
			if(file.isDir){
				dispatch('replacePathCatalog', {
					idCatalog: idCatalog,
					newPath: [ ...state.catalogs[idCatalog].path, file.name],
				});
			}
		},

		escape({ dispatch, state}, { idCatalog }) {
			let path = [ ...state.catalogs[idCatalog].path];
			path.pop();

			dispatch('replacePathCatalog', {
				idCatalog: idCatalog,
				newPath: path,
			});
		},

		changeDisk({ dispatch, commit }, { nameDisk, idCatalog}) {
			commit('setDisk', { nameDisk, idCatalog});
			dispatch('updateCatalog',  idCatalog);
		},

		replacePathCatalog({ commit, state }, { idCatalog, newPath }) {
			let diskName = state.catalogs[idCatalog].disk;
			let diskPath = state.disks[diskName].mount;
			let fullPath = getFullPath(diskPath, newPath);

			fs.readDir(fullPath, (msg) =>{
				if(msg.content){
					commit('setPath', { idCatalog, newPath });
					commit('updateCatalog', {path: msg.path, files: msg.content});
				}
				if(msg.error)
					commit('setErrorMsg', {title: "Error set new path! ", error: msg.error});
			})
		},

		updateCatalog({ commit, state }, idCatalog) {
			let path = getCatalogFullPath(state, idCatalog);

			fs.readDir(path, (msg) =>{
				if(msg.content)
					commit('updateCatalog', {path: msg.path, files: msg.content});
				if(msg.error)
					commit('setErrorMsg', {title: "Error update new path!", error: msg.error});
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
	return [disk, ...path].join('/');
}