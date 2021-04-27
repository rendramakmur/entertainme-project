import React from 'react'

export default function Error({error}) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div>
        <p>{error}</p>
      </div>
    </div>
  )
}
