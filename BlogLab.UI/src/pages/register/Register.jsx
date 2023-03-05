import axios from "axios";
import { useState } from "react";
import { Link , useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";

import { config } from "../../config/env";
import "./register.css";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

    
  const history = useHistory()

  const [error, setError] = useState(false);

  const onSubmit = async (data) => {

    console.log(data)

    setError(false);
    try {
      const res = await axios.post(config.APP_URL +"/register", {
        username:data.username,
        email:data.email,
        password:data.password,
      });
      res.data && history.push('/login')
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Kayıt Ol!</span>
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label>Kullanıcı Adı</label>
        <input
        {...register('username', {
          required: 'Bu alanın doldurulması zorunludur'
        })}
          type="text"
          className="registerInput"
          placeholder="Kullanıcı  Adınızı Giriniz..."
        />
        {
          errors.username && (
            <div>
              {errors.username.message}
            </div>
          )
        }
        <label>Email</label>
        <input
        {
          ...register('email', {
           required: 'Bu alanın doldurulması gereklidir',
           pattern: {
            value:   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Lütfen geçerli bir mail adresi giriniz'
           }
          })
        }
          type="text"
          className="registerInput"
          placeholder="Emailinizi Giriniz..."
         
        />
        {
          errors.email && (
            <div>
             {errors.email.message}
            </div>
          )
        }
        <label>Şifre</label>
        <input
      {
        ...register('password', {
          required: 'Bu alanın doldurulması gereklidir'
        })
      }  
          type="password"
          className="registerInput"
          placeholder="Şifrenizi Giriniz..."
          
        />
       {
        errors.password && (
          <div>
          {
            errors.password.message
          }  
          </div>
        )
       } 
        <button className="registerButton" type="submit">
          Kayıt Ol!
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Giriş Yap!
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
