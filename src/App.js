import Auth from "./pages/Auth";
import Client from "./pages/Client";
import LoginPage from "./pages/Auth/login";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { getCheckToken } from "./redux/login/actions";


const App = () => {
  const isLogin=localStorage.getItem('access_token')
  const dispatch = useDispatch();
  const checkToken = useCallback(
    () => dispatch(getCheckToken()),
    [dispatch]
  );
  useEffect(() => {
    checkToken()
  }, []);

  return (
    <>
      <Routes>
        {isLogin && <Route element={<Client />} path="animal/*" />}
        <Route element={<Auth />} path="auth/*" />
        <Route element={<LoginPage />} path="/*" />
      </Routes>
    </>
  );
};

export default App;
