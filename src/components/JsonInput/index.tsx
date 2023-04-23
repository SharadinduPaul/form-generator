import React from 'react'
import './styles.css'
import { Data } from '../../interfaces/data'
import { isJsonString } from '../../utils/IsJSON'
import { Text } from '..'

interface JsonInputProps {
  setData: React.Dispatch<React.SetStateAction<Data[]>>
  setError: (input: 'invalid' | 'notArray' | null) => void
}
export const JsonInput = ({ setData, setError }: JsonInputProps) => {
  const [value, setValue] = React.useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventValue = e.target.value
    setValue(eventValue)
    if (isJsonString(eventValue)) {
      if (Array.isArray(JSON.parse(eventValue))) {
        setError(null)
        setData(JSON.parse(eventValue))
      } else setError('notArray')
    } else setError('invalid')
  }
  return (
    <div className="json-input">
      <Text varient='heading1' white>Json Editor</Text>
      <textarea
        placeholder="Enter you JSON data here..."
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
