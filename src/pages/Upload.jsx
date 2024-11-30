import { useDropzone } from 'react-dropzone'

const Upload = () => {
  const onDrop = (files) => {console.log(files)}
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

  return (
    <div className="upload-container m-3 bg-green-300">
      <div className="upload-box flex justify-center items-center h-screen w-screen">
        <div {...getRootProps()} className="upload-dropzone flex justify-center items-center w-4/5 h-2/5 max-w-[600px] max-h-[400px] border-dashed border-2 rounded-lg">
          <input {...getInputProps()}/>
          {
            isDragActive 
            ? <p>Drop files here</p>
            : <p>Drag and drop files or click to select files</p>
          }
        </div>
      </div>
    </div>
  )
}


export default Upload
