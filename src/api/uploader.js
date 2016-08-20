import api from './api'

const UploaderAction = {
  do (data) {
    return new Promise((resolve, reject) => {
      api.upload(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  }
}

export default UploaderAction
