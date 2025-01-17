import React,{createContext,useState,useEffect}from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
      const [userAuth,setUserAuth] = useState(null)

      useEffect(() => {
        const storedUserToken = localStorage.getItem('userAuthToken')
        const tokenTimestamp = localStorage.getItem('tokenTimestamp')
        const currentTime = new Date().getTime()

        if(storedUserToken && tokenTimestamp){
            const timeElapsed = currentTime - tokenTimestamp;
            const thirtyMinutes = 30 * 60 * 1000;

            if(timeElapsed > thirtyMinutes){
                  localStorage.removeItem('userAuthToken');
                  localStorage.removeItem('tokenTimestamp');
            }else{
                  setUserAuth(storedUserToken);
            }
      }
      },[])

      const userLogin = (userToken) => {
        setUserAuth(userToken)
        const currentTime = new Date().getTime();
        localStorage.setItem('userAuthToken',userToken);
        localStorage.setItem('tokenTimestamp',currentTime.toString());
      }
      const userLogout = () => {
            setUserAuth(null)
            localStorage.removeItem('userAuthToken');
            localStorage.removeItem('tokenTimestamp');
      } 
      return(
            <AuthContext.Provider value={{userAuth,userLogin,userLogout}}>
                  {children}
            </AuthContext.Provider>
      )
}
