import axios from "axios"

const convertORFImage = async (file) => {
  const formData = new FormData()
  formData.append('orfImage', file.fileInfo)

  const res = await axios.post('http://localhost:3001/imageService', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  })

  //return blob of response directly
  return res.data
}

export {
  convertORFImage
}
