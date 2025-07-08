import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
const [user] = useAuthState(auth)
  
return user ? children : <Navigate to='/' />;
}

export default PrivateRoute
