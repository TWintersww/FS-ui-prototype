const Entry = ({entryInfo, imgPerRow, selectEntry}) => {
  const width = 960;
  let imgDim = width / imgPerRow
  let imgStyling = `${imgDim}px`

  const onEntryClick = () => {
    selectEntry(entryInfo)
  }

  return (
    <div className="entry-container" onClick={onEntryClick}>
      {/* relative of entry is for absolute title overlay */}
      <div className="entry relative group">
        <img src={entryInfo.imageURL} className="entry-img group-hover:brightness-75" style={{"width": imgStyling, "height": imgStyling, "objectFit": "contain", "backgroundColor": "rgb(240, 240, 240)"}}/>
        <div className="entry-title absolute opacity-0 group-hover:opacity-100 bottom-0 ml-0.5 overflow-hidden whitespace-nowrap text-ellipsis text-purple-500">{entryInfo.title}</div>
      </div>
    </div>
  )
}

export default Entry
