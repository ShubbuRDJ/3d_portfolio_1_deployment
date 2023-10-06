import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {styles} from '../style'
import {navLinks} from '../constants/index'
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';

const Navbar = () => {
  const [active,setActive] = useState('')
  const [toggle,setToggle] = useState(false)
  return (
    <nav className={`${styles.paddingX} w-full flex items-center z-20 py-5 fixed top-0 bg-primary`}>
      <div className="w-full flex justify-between item-center max-w-7xl mx-auto">
        <Link to='/' className='flex items-center gap-2' onClick={()=>{
          setActive('');
          window.scrollTo(0,0);
        }}>
          <img src='logo.svg' alt="logo" className='w-9 h-9 object-contain'/>
          <p className="text-white text-[18px] font-bold cursor-pointer flex">Shubham &nbsp;<span className='sm:block hidden sm:hidden lg:block xl:block'>|&nbsp;Full Stack Developer</span></p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks?.map((link)=>{
            return (
              <li key={link.id} className={`${active === link.title? 'text-white' : 'text-secondary'} font-medium text-[18px] hover:text-white cursor-pointer`} onClick={()=>setActive(link.title)}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            )
          })}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle?close:menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer 'onClick={()=>setToggle(!toggle)} />
          <div className={`${!toggle?'hidden':'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
          <ul className='list-none flex flex-col gap-4 justify-end items-start'>
          {navLinks?.map((link)=>{
            return (
              <li key={link.id} className={`${active === link.title? 'text-white' : 'text-secondary'} font-poppins font-medium text-[16px]  cursor-pointer`} onClick={()=>{
                setActive(link.title);
                setToggle(!toggle);
                }}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            )
          })}
        </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar