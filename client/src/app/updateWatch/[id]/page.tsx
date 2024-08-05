import UpdateWatch from '@/components/UpdateWatch '
import React from 'react'

const EditWatch = ({params}: { params: {id: number}}) => {
    const id = params.id;
  return (
    <div>
        <UpdateWatch id={id} />
    </div>
  )
}

export default EditWatch