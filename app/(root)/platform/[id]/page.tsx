import React from 'react'

const Platform = ({params} : {params: {id: number}}) => {
  return (
    <div>
  
      {params.id}
    </div>
  )
}

export default Platform