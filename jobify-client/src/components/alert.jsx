import React from 'react'

const Alert = ({ text, type }) => {
  return <div className={`alert ${type === "danger" ? "alert-danger" : "alert-success"}`}>{text || 'Alert goes here'}</div>
}

export default Alert
