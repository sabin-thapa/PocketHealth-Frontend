import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import AuthNavigator from './AuthNavigator'
import DrawerNavigator from './Drawer/DrawerNavigator'
import { NavigationContainer } from '@react-navigation/native'
import Loading from '../components/Loading'

const Route = () => {
    const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true)
    const [loading, setLoading] = useState(false)

    const onAuthStateChanged = (user) => {
        setUser(user);
        if(initializing) setInitializing(false);
    }

    useEffect(() => {
      console.log('Authenticated: ', isAuthenticated);
    }, [isAuthenticated])

    if (loading) {
        return <Loading />
    }   
  return (
    <NavigationContainer>
    {!isAuthenticated ? <AuthNavigator /> : <DrawerNavigator />}
  </NavigationContainer>
  )
}

export default Route