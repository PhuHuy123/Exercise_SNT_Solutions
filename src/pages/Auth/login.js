import { useCallback, useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin } from "../../redux/login/actions";
import Loading from "../../components/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("");
  const [secret, setSecret] = useState("");
  const [checkError, setCheckError] = useState(false);
  const { isLoggedIn, response, error, loading } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const userLogin = useCallback(
    (values) => dispatch(getUserLogin(values)),
    [dispatch]
  );
  const handleSubmit = async (e) => {
    e?.preventDefault();
    userLogin({
      grant_type: "client_credentials",
      client_id: apiKey,
      client_secret: secret,
      // client_id: "v3YvEB7MQAmosLDjPHKa3LWyfEikMU5GVzZqNLF77lFP2hsKuQ",
      // client_secret: "91BEGtP8Iv5UcmGpEljgKTzYCmNwUAvCwMSyFi1H",
    });
  };
  useEffect(() => {
    if (response && response.token_type === "Bearer") {
      if (isLoggedIn) {
        navigate("/animal");
      }
    } else {
      if (error) {
        setCheckError(true);
      }
    }
  }, [response, error]);
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>Login</h1>

          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <input
              required
              type="text"
              placeholder="API Key"
              onChange={(e) => setApiKey(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Secret"
              onChange={(e) => setSecret(e.target.value)}
            />
            {checkError && (
              <p style={{ color: "red" }}>
                Api key or Secret is not correct please check again
              </p>
            )}
            <button type="submit" id="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Login;
