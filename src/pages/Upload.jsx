import { useDropzone } from 'react-dropzone'
import UploadFileList from '../components/UploadFileList'
import { useEffect, useState } from 'react'
import { convertORFImage } from '../services/imageService'
import FadeLoader from "react-spinners/FadeLoader";

const supportedTypes = ['image/', 'video/'] // Add other MIME types if needed

const Upload = () => {
  const [files, setFiles] = useState([])
  //null means that no preview modal is active
  const [previewFile, setPreviewFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const extractThumbnail = async () => {
      if (!previewFile) return null

      if (previewFile.fileInfo.type.endsWith('orf') || previewFile.fileInfo.type.endsWith('octet-stream')) {
        try {
          //set preview to loading while image processing
          setPreviewImage('loading');
          //code to transform ORF
          const jpegImage = await convertORFImage(previewFile)
          return URL.createObjectURL(jpegImage)
        }
        catch (e) {
          console.log("Error extracting ORF thumbnail:", e)
        }
      }
      else if (supportedTypes.some(type => previewFile.fileInfo.type.startsWith(type))) {
        return URL.createObjectURL(previewFile.fileInfo)
      }
      else {
        return null
      }
    }

    const updatePreviewImage = async () => {
      const img = await extractThumbnail()
      setPreviewImage(img)
    }

    if (previewFile) {
      updatePreviewImage()
    }
  }, [previewFile])

  const onDrop = (acceptedFiles) => {
    // console.log(acceptedFiles)
    let acceptedFilesWithChecked = acceptedFiles.map(file => {
      return {
        fileInfo: file, 
        checked: true, 
      }
    })

    setFiles((prevFiles) => [...prevFiles, ...acceptedFilesWithChecked] )
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

  const handleFileUpload = () => {
    console.log(files)
  }
  const handleClearFiles = () => {
    setFiles(() => [])
  }

  const renderPreview = () => {
    if (previewImage === 'loading') {
      return <FadeLoader
      color="#A9A9A9"
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
    }
    else if (previewImage) {
      return <img 
        src={previewImage}
        className="z-20"
        style={{"maxWidth":"500px", "maxHeight":"300px", "objectFit": "none"}}
      />
    }
    else {
      return <p className="text-white text-center"> No available preview </p>
    }
  }

  return (
    <div className="upload-container m-3 bg-green-300">
      <div className="upload-box flex flex-col items-center h-screen w-screen">
        <div {...getRootProps()} className="upload-dropzone mt-3 flex justify-center items-center w-4/5 h-2/5 max-w-[600px] max-h-[400px] border-dashed border-2 rounded-lg">
          <input {...getInputProps()}/>
          {
            isDragActive 
            ? <p>Drop files/folders here</p>
            : <p>Drag and drop files/folders. Click to select files</p>
          }
        </div>

        <div className="mt-5">File List</div>
        <aside className="upload-filelist overflow-y-scroll mt-3 w-3/5 h-2/5 max-w-[600px] max-h-[400px]">
          <UploadFileList files={files} setFiles={setFiles} setPreviewFile={setPreviewFile} />
        </aside>

        <button onClick={() => handleFileUpload()}>
          upload
        </button>
        <button onClick={() => handleClearFiles()}>
          clear
        </button>
      </div>

      {/* Modal of preview */}
      {
        previewFile &&
        <div 
          className="z-10 fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center"
          onClick={() => {setPreviewFile(null); setPreviewImage(null)}}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {renderPreview()}
          </div>
        </div>
      }
    </div>
  )
}


export default Upload
