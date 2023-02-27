import LoginPage from './login'
import { Routes, Route } from 'react-router-dom'
const Auth = () => {
  
    return (
      <>
          <Routes>
            <Route element={<LoginPage />} path="login" />
          </Routes>
      </>
    )
  }
  
  export default Auth