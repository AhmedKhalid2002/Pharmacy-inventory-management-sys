import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedLogin({children}) {

  const {userToken} = useSelector((state)=> state.user)
  
  if (userToken) {
    return <Navigate to={'/'} />
  }
  else{
    return children
  }
}
