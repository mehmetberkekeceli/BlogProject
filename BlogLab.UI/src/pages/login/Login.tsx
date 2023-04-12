import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { config } from "../../config/env";
import { Context } from "../../context/Context";
import { login, selectUser } from "../../redux/userSlice";
import "./login.css";

export default function Login(): JSX.Element {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { dispatch, isFetching } = useContext(Context);
  const user = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userRef.current || !passwordRef.current) {
      return;
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${config.APP_URL}/api/Account/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch(login(res.data));
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
