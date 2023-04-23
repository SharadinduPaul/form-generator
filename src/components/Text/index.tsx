import React from 'react'
import './styles.css'

interface TextProps {
  varient?: 'content1' | 'heading1'
  bold?: boolean
  white?: boolean

  className?: string
  style?: React.CSSProperties
  children?: any
}
export const Text = ({
  varient = 'content1',
  white = false,
  bold = false,
  className,
  style,
  children,
}: TextProps) => {
  return (
    <div
      className={`text-main ${varient} ${className} ${white ? 'white' : ''} ${
        bold ? 'bold' : ''
      }`}
      style={style}
    >
      {children}
    </div>
  )
}
