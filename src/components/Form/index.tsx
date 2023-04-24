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
  const [showResult, setShowResult] = React.useState<boolean>(false)
  console.log(apiData)
  try{
    return (<ApiDataContext.Provider value={{ apiData }}>
      <div className="form-main">
        {!showResult ? <div className="form-elements">
          {error === 'notArray' ? (
            <Text>Please input an array.</Text>
          ) : error === 'invalid' ? (
            <Text className="error">Please enter a valid JSON.</Text>
          ) : (
            data?.map((item, index) => (
              <Element data={item} key={index} {...{ setApiData }} />
            ))
          )}
        </div>: <div className='apiResult'>{JSON.stringify(apiData)}</div>}
        <div className="submit">
          <button className='cancel' onClick={()=> setShowResult(false)}>
            <Text bold>Cancel</Text>
          </button>
          <button className='sub' onClick={()=>setShowResult(true)}><Text white bold>Submit</Text></button>
        </div>
      </div>
    </ApiDataContext.Provider>
    
    
  )
  }catch(error){
    return <div className="form-main">
      <Text>Please input data in correct json format</Text>
    </div>
  }
}
