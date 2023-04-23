import React from 'react'
import './styles.css'
import { Data } from '../../interfaces/data'
import { Text } from '..'
import CheckBox from '../../assets/check.png'
import { ApiDataContext } from '../Form'

interface ElementProps {
  data: Data
  inGroup?: boolean
  handleApiData?: (key: string, value: any) => void
  setApiData?: React.Dispatch<any>
}

interface ElementComponentProps {
  data: Data
  handleApiData: (key: string, value: any) => void
}

interface TitleProps {
  label: string
  required?: boolean
  description?: string
}

const Title = ({ label, required, description }: TitleProps) => {
  return (
    <Text className="title-main" bold>
      {label}
      {required && <span className="required">*</span>}
      {description && <span>i</span>}
    </Text>
  )
}

const Input = ({ data, handleApiData }: ElementComponentProps) => {
  React.useEffect(() => {
    handleApiData(data?.jsonKey, data?.validate?.defaultValue ?? '')
  }, [])
  return (
    <>
      <Title
        label={data?.label}
        required={data.validate?.required}
        description={data?.description}
      />
      <input
        disabled={data?.validate?.immutable}
        placeholder={data?.placeholder || `Enter ${data?.label}`}
        onChange={(e) => handleApiData(data?.jsonKey, e.target.value)}
      />
    </>
  )
}
const Group = ({ data, handleApiData }: ElementComponentProps) => {
  const localApiRef = React.useRef<any>(null)

  const handleApiDataLocally = (key: string, value: any) => {
    localApiRef.current = { ...localApiRef.current, [key]: value }
    handleApiData(data?.jsonKey, localApiRef.current)
  }
  return (
    <>
      <Title
        label={data?.label}
        required={data.validate?.required}
        description={data?.description}
      />
      <div className="hr" />
      {data?.subParameters?.map((item, index) => (
        <Element
          data={item}
          key={index}
          inGroup
          handleApiData={handleApiDataLocally}
        />
      ))}
    </>
  )
}
const Ignore = ({ data, handleApiData }: ElementComponentProps) => {
  const localApiRef = React.useRef<any>(null)
  const [show, setShow] = React.useState<boolean>(false)

  const { apiData } = React.useContext(ApiDataContext)

  const handleApiDataLocally = (key: string, value: any) => {
    localApiRef.current = { ...localApiRef.current, [key]: value }
    handleApiData(data?.jsonKey, localApiRef.current)
  }
  const checkCondition = () => {
    try {
      let actionHappend = false
      data?.conditions?.forEach((condition) => {
        const action: boolean = condition.action === 'enable' ? true : false
        let targetValue = apiData
        const keys = condition?.jsonKey.split('.')
        keys.forEach((key) => {
          targetValue = targetValue[key]
        })
        if (eval(`"${targetValue}" ${condition.op} "${condition.value}"`)) {
          setShow(action)
          actionHappend = true
          console.log('setting show')
          return
        }
      })
      if (!actionHappend) setShow(false)
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    console.log('it changed state', apiData)
    if (apiData) checkCondition()
  }, [apiData])

  return (
    <>
      {show &&
        data?.subParameters?.map((item, index) => (
          <Element
            data={item}
            key={index}
            inGroup
            handleApiData={handleApiDataLocally}
          />
        ))}
    </>
  )
}

const Radio = ({ data, handleApiData }: ElementComponentProps) => {
  const [selected, setSelected] = React.useState(data?.validate?.defaultValue)

  React.useEffect(() => {
    handleApiData(data?.jsonKey, data?.validate?.defaultValue ?? '')
  }, [])

  return (
    <>
      {data?.validate?.options?.map((item, index) => (
        <div
          className={`radio ${selected === item?.value ? 'selected' : ''}`}
          key={index}
          onClick={() => {
            setSelected(item?.value)
            handleApiData(data?.jsonKey, item?.value)
          }}
        >
          <Title label={item?.label} description={item?.descriptions} />
        </div>
      ))}
    </>
  )
}
const Select = ({ data, handleApiData }: ElementComponentProps) => {
  const [selected, setSelected] = React.useState(data?.validate?.defaultValue)

  React.useEffect(() => {
    handleApiData(data?.jsonKey, data?.validate?.defaultValue ?? '')
  }, [])

  return (
    <>
      <Title
        label={data?.label}
        required={data.validate?.required}
        description={data?.description}
      />
      <select
        name={data?.label}
        value={selected}
        id={data?.label}
        onChange={(e) => {
          setSelected(e.target?.value)
          handleApiData(data?.jsonKey, e.target?.value)
        }}
      >
        {data?.validate?.options?.map((item, index) => (
          <option key={index} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </select>
    </>
  )
}
const Switch = ({ data, handleApiData }: ElementComponentProps) => {
  const [selected, setSelected] = React.useState<boolean>(
    !!data?.validate?.defaultValue,
  )

  React.useEffect(() => {
    handleApiData(data?.jsonKey, data?.validate?.defaultValue ?? '')
  }, [])

  return (
    <>
      <img
        src={CheckBox}
        className={`switch ${selected ? 'checked' : ''}`}
        alt="check"
        onClick={() => {
          const select = selected
          setSelected(!select)
          handleApiData(data?.jsonKey, !select)
        }}
      />
      <Title
        label={data?.label}
        required={data.validate?.required}
        description={data?.description}
      />
      <div style={{ flex: '1' }} />
    </>
  )
}

export const Element = ({
  data,
  inGroup,
  handleApiData,
  setApiData,
}: ElementProps) => {
  const dataChangeHandler = (key: string, value: any) => {
    handleApiData
      ? handleApiData(key, value)
      : setApiData
      ? setApiData((prev: any) => ({ ...prev, [key]: value }))
      : null
  }
  const { uiType } = data
  return (
    <div
      className={`element-main ${uiType === 'Group' ? 'group' : ''} ${
        inGroup ? 'in-group' : ''
      }`}
    >
      {uiType === 'Input' ? (
        <Input {...{ data }} handleApiData={dataChangeHandler} />
      ) : uiType === 'Group' ? (
        <Group {...{ data }} handleApiData={dataChangeHandler} />
      ) : uiType === 'Radio' ? (
        <Radio {...{ data }} handleApiData={dataChangeHandler} />
      ) : uiType === 'Select' ? (
        <Select {...{ data }} handleApiData={dataChangeHandler} />
      ) : uiType === 'Switch' ? (
        <Switch {...{ data }} handleApiData={dataChangeHandler} />
      ) : uiType === 'Ignore' ? (
        <Ignore {...{ data }} handleApiData={dataChangeHandler} />
      ) : (
        <div>Form element not present for {data?.label} :(</div>
      )}
    </div>
  )
}
