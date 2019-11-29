const url = "./files";


export default {

  getLocalDisks(path, fileName, callback) {
    let req = {
      action: "GetDisks"
    };

    postData(url, req, callback);
  },

  createDir(path, fileName, callback) {
    let req = {
      action: "CreateDir",
      name: fileName,
      path: path
    };

    postData(url, req, callback);
  },

  createFile(path, fileName, callback) {
    let req = {
      action: "CreateFile",
      name: fileName,
      path: path
    };

    postData(url, req, callback);
  },

  readDir(path, callback) {
    let req = {
      action: "ReadDir",
      path: path
    };

    postData(url, req, callback);
  },

  copy(source, target, fileName, callback) {
    let req = {
      action: "Copy",
      name: fileName,
      source_path: source,
      target_path: target
    };

    postData(url, req, callback);
  },

  move(source, target, fileName, callback) {
    let req = {
      action: "Move",
      name: fileName,
      source_path: source,
      target_path: target
    };

    postData(url, req, callback);
  },

  remove(path, fileName, callback) {
    let req = {
      action: "Delete",
      name: fileName,
      path: path
    };

    postData(url, req, callback);
  }
}

function postData(url, data, callback) {
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(data),
  })
  .then(res => res.ok ? res : Promise.reject("The server is not responding"))
  .then(res => res.json())
  .then(data => callback(data))
  .catch(error => callback({error: error.message}));
}