import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

  const {userToken} = useSelector((state)=> state.user)
  
  if (userToken) {
    return children
  }
  else{
    return <Navigate to={'/login'} />
  }
}
