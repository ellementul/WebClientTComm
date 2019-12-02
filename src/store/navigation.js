import Vue from 'vue'

import fs from '../api/fileSystem'

const defaultDisk = "ServerRoot";

let disks = {};
disks[defaultDisk] = {
  mount: "./",
  lastPath: []
};

export default {
  state: {
    disks,
    catalogs: [
      {
        disk: defaultDisk,
        path: [],
        files: [],
        changed: [],
        notLoadingContent: true,
      },
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
      },

    ],
    sourceCatalog: 0,
    targetCatalog: 0,
  },

  getters: {
      getFullPath: state => idCatalog => getCatalogFullPath(state, idCatalog),
      source: state => getCatalogFullPath(state, state.sourceCatalog),
      target: state => getCatalogFullPath(state, state.targetCatalog),
      getChangedFileNames: state => {
        let changed = state.catalogs[state.sourceCatalog].changed;
        let files = state.catalogs[state.sourceCatalog].files;
        return files.filter((file, index) => changed.indexOf(index) != -1).map(file => file.name);
      }
  },

  mutations: {

    setSourcePath(state, idCatalog) {
      state.sourceCatalog = idCatalog;
    },

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

    setDisk({ catalogs, disks }, { nameDisk, idCatalog }){
      if(!(nameDisk in disks))
        nameDisk = defaultDisk;

      catalogs[idCatalog].disk = nameDisk;
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

    switchChangedItem({ catalogs }, { idCatalog, idFile }) {
      let changedFiles = catalogs[idCatalog].changed;
      let index = changedFiles.indexOf(idFile);

      if(index == -1)
        changedFiles.push(idFile);
      else
        changedFiles.splice(index, 1);
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
          idCatalog,
          newPath: [ ...state.catalogs[idCatalog].path, file.name],
        });
      }
    },

    escape({ dispatch, state}, idCatalog ) {
      let path = [ ...state.catalogs[idCatalog].path];
      path.pop();

      dispatch('replacePathCatalog', {
        idCatalog,
        newPath: path,
      });
    },

    changeDisk({ dispatch, commit, state }, { nameDisk, idCatalog }) {
      commit('setDisk', { nameDisk, idCatalog});
      dispatch('replacePathCatalog', {
        idCatalog,
        newPath: state.disks[nameDisk].lastPath,
      });
    },

    replacePathCatalog({ commit, state }, { idCatalog, newPath }) {
      let catalog = state.catalogs[idCatalog];
      let diskName = catalog.disk;
      let diskPath = state.disks[diskName].mount;
      let fullPath = getFullPath(diskPath, newPath);

      fs.readDir(fullPath, (msg) =>{
        if(msg.error)
          commit('setErrorMsg', {title: "Error set new path! ", error: msg.error});
        else if(msg.content){
          commit('setPath', { idCatalog, newPath });

          if(!catalog.notLoadingContent)
            commit('updateCatalog', {path: msg.path, files: msg.content});
        }
      })
    },

    update({ dispatch, state }) {
      dispatch('updateCatalog', state.sourceCatalog);
      dispatch('updateCatalog', state.targetCatalog);
    },

    updateCatalog({ commit, getters }, idCatalog) {
      let path = getters.getFullPath(idCatalog);
      
      fs.readDir(path, (msg) =>{
        if(msg.content)
          commit('updateCatalog', {path: msg.path, files: msg.content});
        if(msg.error)
          commit('setErrorMsg', {title: "Error update new path!", error: msg.error});
      })
    },
  }

};

function getCatalogFullPath(state, idCatalog){
  let catalog = state.catalogs[idCatalog];
  return getFullPath(state.disks[catalog.disk].mount, catalog.path);
}

function getFullPath(disk, path){
  return [disk, ...path].join('/');
}