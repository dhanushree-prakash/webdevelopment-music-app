import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavBarContainer = () => {
  return (
    <header className='h-[70px] w-[100%] bg-[#000000] shadow-lg border-b border-[#FF1493] sticky top-0 z-10'>
        <article className='w-[95%] m-auto h-[100%] flex items-center justify-between'>
            <Logo/>
            <Menu/>
        </article>
    </header>
  )
}

export default NavBarContainer
