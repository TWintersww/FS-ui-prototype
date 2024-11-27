import { useState, useEffect, useCallback } from 'react';
import Entry from '../components/Entry'
import EntryModal from '../components/EntryModal';
import mockData from '../resources/mock.json'

const Entries = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [imgPerRow, setImgPerRow] = useState(3)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [allEntries, setAllEntries] = useState([])

  //add viewId variable corresponding to array idx
  useEffect(() => {
    const mockDataMarked = mockData.map((m, idx) => ({...m, viewId: idx}))
    setAllEntries(mockDataMarked)
  }, [])

  const selectEntry = (entryInfo) => {
    setSelectedEntry(entryInfo)
    setModalOpen(true)
    //prevents scrolling in Entries when EntryModal open
    document.body.style.overflow = "hidden"
  }
  const closeModal = () => {
    setModalOpen(false)
    //allow scroll again
    document.body.style.overflow = "auto"
  }
  const rightArrowModal = useCallback(() => {
    //len 3 array [0, 1, 2] means up to 1 can scroll right
    if (!selectedEntry || selectedEntry.viewId == null || selectedEntry.viewId + 1 >= allEntries.length) return

    setSelectedEntry(allEntries[selectedEntry.viewId + 1])
  }, [selectedEntry, allEntries])
  const leftArrowModal = useCallback(() => {
    if (!selectedEntry || selectedEntry.viewId == null || selectedEntry.viewId <= 0) return

    setSelectedEntry(allEntries[selectedEntry.viewId - 1])
  }, [selectedEntry, allEntries])
  
  



  return (
    <div className="entries-container m-3 relative z-10 bg-green-300">
      <div className="flex justify-end items-center gap-2 w-[960px] m-auto py-2">
        <input type="range" min="1" max="9" value={imgPerRow} onChange={(e) => setImgPerRow(e.target.value)} />
        <label className="w-[80px]">grid size {imgPerRow}</label>
      </div>
      <div className={`entries w-[960px] m-auto grid gap-0.5 bg-white`} style={{"gridTemplateColumns": `repeat(${imgPerRow}, minmax(0, 1fr))`}}>
        {allEntries
          .slice((pageNumber - 1) * imgPerRow * imgPerRow, pageNumber * imgPerRow * imgPerRow)
          .map(e => <Entry key={e.entryId} entryInfo={e} imgPerRow={imgPerRow} selectEntry={selectEntry}/>)
        }
      </div>
      <div className="flex justify-center items-center">
        pagination
      </div>

      {modalOpen && <EntryModal modalOpen={modalOpen} selectedEntry={selectedEntry} closeModal={closeModal} rightArrowModal={rightArrowModal} leftArrowModal={leftArrowModal}/>}
    </div>
  )
}

export default Entries
