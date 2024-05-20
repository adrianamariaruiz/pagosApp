import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <nav className='flex px-5 justify-around items-center w-full shadow-md'>
        <div>
          <Link
            to='/'
          >
            <span className='m-2 p-2 transition-all rounded-md hover:bg-tangerine-500 hover:text-white'>Home</span>
          </Link>
        </div>
        <div className='hidden sm:flex'>
          <Link className='m-2 p-2 transition-all rounded-md hover:bg-tangerine-500 hover:text-white' to="/list">Lista</Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar