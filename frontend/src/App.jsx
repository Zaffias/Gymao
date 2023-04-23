import { useState } from 'react';
import { MainRouting } from "./router/MainRouting";
import { useEffect } from 'react';
import { AppContext } from './context';
import { axiosInstance } from '../config/axiosConfig';

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    if(!user && localStorage.getItem('token')){
      (async () => {
        // Move to its own function
        const user = await axiosInstance.get('/user/me');
        setUser(user.data);
        setAuthenticated(true);
      })()
    }
  })
  return (
    <AppContext.Provider value={{user, setUser, authenticated, setAuthenticated}}>
      <MainRouting/>
    </AppContext.Provider>
  )
}
export default App;
