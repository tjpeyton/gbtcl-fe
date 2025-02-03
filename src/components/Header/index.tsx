import React from 'react'


type HeaderProps = {
  title: string,
  dialog?: React.ReactNode
}

const Header = (props: HeaderProps) => {

  return (
    <div className='flex justify-between items-center mb-8'>
      <h1 className='text-2xl font-bold'>{ props.title }</h1>
      { props.dialog }
    </div>
  )
}

export default Header
