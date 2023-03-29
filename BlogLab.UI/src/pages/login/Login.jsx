import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useHistory } from "react-router-dom";
import { config } from "../../config/env";
import { Context } from "../../context/Context";
import { login, selectUser } from "../../redux/userSlice";
import "./login.css";


export default function Login() {
  const userRef = useRef();
  const history = useHistory();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  // Redux
  const user = useSelector(selectUser)


  useEffect(() => {
    if(user) {
      history.push('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${config.APP_URL}/api/Account/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,

      });

      dispatch(login(res.data))

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Giriş Yap!</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Kullanıcı Adınız</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Kullanıcı Adınızı Giriniz..."
          ref={userRef}
        />
        <label>Şifre</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Şifrenizi Giriniz..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Giriş!
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Kayıt Ol!
        </Link>
      </button>
    </div>
    
  );
}
