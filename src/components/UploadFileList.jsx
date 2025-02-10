

const UploadFileList = ({files, setFiles, setPreviewFile}) => {

  const handleCheckboxChange = (filePath) => {
    setFiles((prevFiles) => (
      prevFiles.map(pf => (pf.fileInfo.path === filePath) ? {...pf, checked: !pf.checked} : pf)
    ))
  }
  

  const fileEntries = files.map(file => (
    <li key={file.fileInfo.path} className="flex justify-between items-center mb-0.5">
      <div className="flex items-center gap-2">
        <input 
          type="checkbox"
          checked={file.checked}
          onChange={() => handleCheckboxChange(file.fileInfo.path)}
        />
        <span className="align-middle">{file.fileInfo.path}</span>
      </div>

      <button 
        className="text-blue-700 hover:underline bg-transparent border-none cursor-pointer"
        onClick={() => setPreviewFile(file)}
      >
        preview
      </button>
    </li>
  ))

  return <ul>{fileEntries}</ul>
}

export default UploadFileList;
