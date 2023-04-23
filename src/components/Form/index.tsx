import React from 'react'
import './styles.css'
import { Element, Text } from '..'
import { Data } from '../../interfaces/data'

interface FormProps {
  data: Data[]
  error: 'invalid' | 'notArray' | null
}

export const ApiDataContext = React.createContext<{ apiData: any }>({
  apiData: {},
})

export const Form = ({ data, error }: FormProps) => {
  const [apiData, setApiData] = React.useState<any>({})
  console.log(apiData)
  return (
    <ApiDataContext.Provider value={{apiData}}>
      <div className="form-main">
        {error === 'notArray' ? (
          <Text>Please input an array.</Text>
        ) : error === 'invalid' ? (
          <Text className="error">Please enter a valid JSON.</Text>
        ) : (
          data?.map((item, index) => (
            <Element data={item} key={index} {...{ setApiData }} />
          ))
        )}
      </div>
    </ApiDataContext.Provider>
  )
}
