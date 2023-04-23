import React from 'react'
import './App.css'
import { Form, JsonInput } from './components'
import { Data } from './interfaces/data'

function App() {
  const [data, setData] = React.useState<Data[]>([])
  const [error, setError] = React.useState<'invalid'|'notArray'|null>(null)

  return (
   <div className="app">
    <JsonInput {...{setData, setError}} />
    <Form {...{data, error}}/>
   </div>
  )
}

export default App
