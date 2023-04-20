import { useContext, useState, ChangeEvent, FormEvent } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { config } from "../../config/env";
import { useHistory } from "react-router-dom";

interface NewPost {
  BlogId:number;
  Title: string;
  Content: string;
  ImageUrl:string | null;
  PublicId:string | null;
}

export default function Write() {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const { user } = useContext(Context);
  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in!");
      return;
    }
    const newPost: NewPost = {
      BlogId: -1,
      Title: Title,
      Content: Content,
      ImageUrl:null,
      PublicId:null
    };
    try {
      const res = await axios.post(`${config.APP_URL}/api/Blog`,{
        BlogId : newPost.BlogId,
        Title : newPost.Title,
        Content : newPost.Content,
        ImageUrl : newPost.ImageUrl,
        PublicId : newPost.PublicId
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
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
        <textarea
  placeholder="İçeriği giriniz..."
  className="writeInput writeText"
  value={Content}
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
