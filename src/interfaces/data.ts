export interface Data{
    sort: number
    label: string
    description: string
    validate: Validate
    jsonKey: string
    uiType: string
    icon?:string
    level?:number
    placeholder?:string
}

interface Validate{
    required?: boolean
    immutable?: boolean
}