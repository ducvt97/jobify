import React from 'react'

const Alert = ({ text }) => {
  return <div className="alert alert-danger">{text || 'Alert goes here'}</div>
}

export default Alert
