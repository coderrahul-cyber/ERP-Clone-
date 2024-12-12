import { Link } from "react-router-dom"
import Logout from "./Logout"
interface Data {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
const Navbar = ({data} : Data) => {
  return (
    <nav className="navbar">
      <Link to="/" className="title">Graphic Era</Link>
      <img src="/assets/image/logo2.webp" className="logoo" alt="lo" />
      <div className="dp group">
        <img src={data.image} alt="" className="dpimage" />
      </div>
      <Logout />
    </nav>
  )
}

export default Navbar
