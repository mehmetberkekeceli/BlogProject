import { useContext, useState, ChangeEvent, FormEvent } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { config } from "../../config/env";
import { useHistory } from "react-router-dom";

interface NewPost {
  BlogId? :number;
  username?: string;
  title: string;
  desc: string;
  photo?: string;
}

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { user } = useContext(Context);
  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in!");
      return;
    }
    const newPost: NewPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        const res = await axios.post(config.APP_URL + "/api/Photo", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        newPost.photo = res.data.secure_url;
      } catch (err) {
        console.error(err);
      }
    }
    try {
      const res = await axios.post(config.APP_URL + "/api/Blog", newPost);
      history.push("/api/Blog/" + res.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Yazı"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Hikayeni Anlat..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Yayınla!
        </button>
      </form>
    </div>
  );
}