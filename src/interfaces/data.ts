export interface Data {
  sort: number
  label: string
  description: string
  validate: Validate
  jsonKey: string
  uiType: UiTypes
  icon?: string
  level?: number
  placeholder?: string
  subParameters?: Data[]
  conditions?: Conditions[]
}

interface Conditions {
  jsonKey: string
  op: string
  value: string
  action: 'enable' | 'disable'
}
interface Validate {
  required?: boolean
  immutable?: boolean
  defaultValue?: string
  options?: Option[]
}

interface Option {
  label: string
  value: string
  descriptions?: string
  icon?: string
}

export type UiTypes =
  | 'Input'
  | 'Group'
  | 'Radio'
  | 'Select'
  | 'Ignore'
  | 'Switch'
