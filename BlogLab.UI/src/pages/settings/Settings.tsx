import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
//import { useAuth } from "../../hooks/authHook";
import { config } from "../../config/env";

export default function Settings(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const { user, dispatch } = useContext(Context);
  //const PF: string = "http://localhost:5000/images/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user?._id,
      username,
      email,
      password,
      profilePic: user.profilePic
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(config.APP_URL + "/api/Account/register", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(config.APP_URL+"/api/Blog/user/{{NextNewApplicationUserId}}" + user?._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  if(!user) {
    return (
      <div>Bekleniyor</div>
    )
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Hesabını Güncelle!</span>
          <span className="settingsDeleteTitle">Hesabını Sil!</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profil Fotoğrafı</label>
          <div className="settingsPP">
            <img
              src="https://avatars.githubusercontent.com/u/108813428?v=4"//{file ? URL.createObjectURL(file) : PF+user?.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            placeholder={user?.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Şifre</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Güncelle
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profil Güncellendi!
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

