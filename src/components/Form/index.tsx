import React from 'react'
import './styles.css'
import { Text } from '..'

interface FormProps{
    error: 'invalid'|'notArray'|null
}

export const Form = ({error}:FormProps) => {
    console.log(error)
  return (
    <div className='form-main'>
        {error === 'notArray' ? <div>Please input an array.</div>: error === 'invalid'? <div className='error'>Please enter a valid JSON.</div>: <div>
          <Text>Render comps</Text></div>}

    </div>
  )
}
