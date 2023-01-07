import React, { Fragment } from 'react'
import Sidebar from '../sidebar'

function BookPage() {
  return (
    <Fragment>
        <div className='flex'>
        <Sidebar/>
        <div className='p-7 text-2xl font-semibold flex-1 h-screen '>
            <h1>Home Page</h1>
            
        </div>
        </div>
    </Fragment>
  )
}

export default BookPage