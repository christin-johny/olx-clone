import React from 'react'
import './Navbar.css'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchwt from '../../assets/search1.svg'

const Navbar = ({toggleModal,toggleModalSell}) => {

  return (
    <div>
      <nav className='fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-white border-b-white border-solid'>
        <img src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg" alt="" className='w-12' />
        <div className='relative location-search ml-5'>
            <img src={search} alt="" className='absolute top-4 left-2 w-5' />
            <input type="text" placeholder='Search city ,area,country....' className='w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'  />
            <img src={arrow} alt="" className='absolute top-4 right-3 w-3 cursor-pointer' />
        </div>
      
        <div className="ml-5 mr-2 relative w-full main-search">
          <input placeholder='Find Cars, Mobile Phones, and More...' className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
          <div style={{ backgroundColor: '#002f34' }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
            <img className="w-5 filter invert" src={searchwt} alt="Search Icon" />
          </div>
        </div>

        <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
          <p className="font-bold mr-3" >English</p>
          <img src={arrow} alt="" className='w-5 cursor-pointer' />
        </div>
        <p onClick={toggleModal}>Login</p>
        <p onClick={toggleModalSell}>sell</p>
      </nav>

    </div>
  )
}

export default Navbar
