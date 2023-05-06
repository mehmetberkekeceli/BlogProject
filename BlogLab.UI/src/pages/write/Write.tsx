import { useContext, useState, ChangeEvent, FormEvent } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { config } from "../../config/env";
import { useHistory } from "react-router-dom";

interface NewPost {
  blogId:number;
  title: string;
  content: string;
  imageUrl:string | null;
  publicId:string | null;
}

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(Context);
  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in!");
      return;
    }
    const newPost: NewPost = {
      blogId: -1,
      title: title,
      content: content,
      imageUrl:null,
      publicId:null
    };
    try {
      const res = await axios.post(`${config.APP_URL}/api/Blog`,{
        blogId : newPost.blogId,
        title : newPost.title,
        content : newPost.content,
        imageUrl : newPost.imageUrl,
        publicId : newPost.publicId
      });
      history.push(`/post/${res.data.blogId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
    console.log("Axios Error:", error.message);
    console.log("Axios Request:", error.config);
    console.log("Axios Response:", error.response);
  }else {
    console.log(error)
  }
    }
  };
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Başlık Giriniz..."
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
        <textarea
  placeholder="İçeriği giriniz..."
  className="writeInput writeText"
  value={content}
  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
  />
        </div>
        <button className="writeSubmit" type="submit">
          Yayınla!
        </button>
      </form>
    </div>
  );
}