'use client'

import WalletInfo from '../WalletInfo'


const TopNav = () => {

  return (
    <nav className='flex flex-row justify-between h-20 px-10 items-center'>
      <div className="flex flex-row items-center gap-10 flex-1 margin">
      </div>
      <div className='ml-8'>  
        <WalletInfo />
      </div>
    </nav>
  )
}

export default TopNav
