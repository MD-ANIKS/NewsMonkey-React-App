import React from 'react'
import spinner from './spinner.gif'

export default function Loading () {

    return (
      <div className='text-center'>
        <img src={spinner} alt="loading" />
      </div>
    )
  
}
