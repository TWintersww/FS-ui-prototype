import Home from "./pages/Home"
import Entries from "./Pages/Entries"
import Navbar from "./pages/Navbar"
import Upload from "./pages/Upload"
import { BrowserRouter, Routes, Route, Outlet} from "react-router-dom"

function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <div>
      
      {/* <Navbar /> */}

      {/* <Entries /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
            <Route path="entries" element={<Entries />} />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
