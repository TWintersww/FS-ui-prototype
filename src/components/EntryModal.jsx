import { useEffect } from "react"
import { useModalScroll } from "../hooks/useModalScroll"


const EntryModal = ({modalOpen, selectedEntry, closeModal, rightArrowModal, leftArrowModal}) => {
  const {throttleHandleKeyDown, registerKeyUp} = useModalScroll(rightArrowModal, leftArrowModal)

  useEffect(() => {

    if (modalOpen) {
      window.addEventListener("keydown", throttleHandleKeyDown)
      window.addEventListener("keyup", registerKeyUp)
    }

    return () => {
      window.removeEventListener("keydown", throttleHandleKeyDown)
      window.removeEventListener("keyup", registerKeyUp)
    }
  }, [modalOpen, throttleHandleKeyDown])

  return (
    <div className="entry-modal-container flex fixed inset-0 top-0 w-full h-full z-20 bg-slate-600 bg-opacity-50">
      <div className="close-modal fixed w-full h-full z-10" onClick={closeModal}>
        
      </div>
      <div className="entry-modal bg-white w-[500px] h-[600px] m-auto z-20">
        <img src={selectedEntry.imageURL} className="entry-modal-image" style={{"width":"500px", "height":"300px", "objectFit": "contain", "backgroundColor": "rgb(240, 240, 240)"}}/>
        <div className="entry-modal-content h-[300px] overflow-y-scroll px-2 py-1 font-serif leading-relaxed">
          <div className="entry-modal-content-title font-bold text-lg mb-2">
            {selectedEntry.title}
          </div>
          <div className="entry-modal-content-species text-stone-500 italic mb-2">
            {selectedEntry.speciesName}
          </div>
          <div className="entry-modal-content-description">
            {selectedEntry.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryModal
