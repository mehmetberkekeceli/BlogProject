import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { config } from "../../config/env";
import { Context } from "../../context/Context";
import "./singlePost.css";

interface Post {
  _id: string;
  username: string;
  title: string;
  desc: string;
  photo: string;
  createdAt: Date;
}

interface Comment {
  _id: string;
  postId: string;
  username: string;
  text: string;
  createdAt: Date;
}

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState<Post>({ _id: "", username: "", title: "", desc: "", photo: "", createdAt: new Date() });
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const onClickHandler = async () => {
    try {
      const res: AxiosResponse<Comment> = await axios.post(`${config.APP_URL}/api/BlogComment`, {
        username: user?.username,
        text: comment,
        postId: post._id,
      });
      setComments((prevComments) => [...prevComments, res.data]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get<Post>(`${config.APP_URL}/api/Blog/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  
    const fetchComments = async () => {
      try {
        const res: AxiosResponse<Comment[]> = await axios.get(`${config.APP_URL}/api/BlogComment/{{NextNewBlogId}}?postId=${post._id}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  
    fetchComments();
  }, [path, post._id]);
  

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get<Post>(`${config.APP_URL}/api/Blog/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.APP_URL}/api/Blog/${post._id}`, {
        data: { username: user?.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${config.APP_URL}/api/Blog/${post._id}`, {
        username: user?.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
      {post.photo && (
        <img src={PF + post.photo} alt="" className="singlePostImg" />
      )}
      {updateMode ? (
        <input
          type="text"
          value={title}
          className="singlePostTitleInput"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <i
                className="singlePostIcon far fa-edit"
                onClick={() => setUpdateMode(true)}
              ></i>
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
      )}
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          Kullanıcı:
          <Link to={`/?user=${post.username}`} className="link">
            <b> {post.username}</b>
          </Link>
        </span>
        <span className="singlePostDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      {updateMode ? (
        <textarea
          className="singlePostDescInput"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      ) : (
        <p className="singlePostDesc">{desc}</p>
      )}
      {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>
          Güncelle
        </button>
      )}
      <div className="main-container">
        {comments.map((text) => (
          <div className="comment-container">{comment}</div>
        ))}
        {user ? (
          <div className="comment-flexbox">
            <h3 className="comment-text">Yorum Yap!</h3>
            <textarea
              value={comment}
              onChange={onChangeHandler}
              className="input-box"
            />
            <button onClick={onClickHandler} className="comment-button">
              Gönder!
            </button>
          </div>
        ) : (
          <p className="comment-login">Yorum yapmak için giriş yapın!</p>
        )}
      </div>
    </div>
  </div>
  
  );
}


