import React,{createContext,useState,useEffect}from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
      const [userAuth,setUserAuth] = useState(null)

      useEffect(() => {
        const storedUserToken = localStorage.getItem('userAuthToken')
        if(storedUserToken){
          setUserAuth(storedUserToken)
        }
      },[])

      const userLogin = (userToken) => {
        setUserAuth(userToken)
        localStorage.setItem('userAuthToken',userToken)
      }
      const userLogout = () => {
            setUserAuth(null)
            localStorage.removeItem('userAuthToken')
      } 
      return(
            <AuthContext.Provider value={{userAuth,userLogin,userLogout}}>
                  {children}
            </AuthContext.Provider>
      )
}
