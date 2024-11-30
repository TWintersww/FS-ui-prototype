import { Link } from "react-router-dom"

const Navbar = () => {

  return (
    <div className="navbar-container p-2 bg-red-200 sticky top-0 z-20">
      <div className="navbar w-[960px] m-auto flex flex-row gap-3 bg-cyan-200">
        <Link to="/">
          header/home
        </Link>
        <Link to="/entries">
          entries
        </Link>
        <Link to="upload">
          upload
        </Link>
      </div>
    </div>
  )
}

export default Navbar
