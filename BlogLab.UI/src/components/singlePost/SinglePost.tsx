import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { config } from "../../config/env";
import { Context } from "../../context/Context";
import "./singlePost.css";

interface Post {
  blogId: number;
  title: string;
  content: string;
  applicationUserId:number,
  username : string,
  publishDate: Date,
  updateDate:Date,
  deleteConfirm:boolean,
  photoId: number;
  createdAt: Date;
}

interface Comment {
  blogCommentId: number,
  blogId: number,
  content: string,
  parentBlogCommentId?: number
}

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState<Post>({ blogId: -1,
    username: "",
    title: "",
    content: "",
    photoId: 0,
    createdAt: new Date(),
    applicationUserId: 0,
    publishDate: new Date(),
    updateDate: new Date(),
    deleteConfirm: false, });
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const onClickHandler = async () => {
    try {
      const res: AxiosResponse<Comment> = await axios.post(`${config.APP_URL}/api/BlogComment`, {
       
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
      setContent(res.data.content);
    };
    getPost();
  
    const fetchComments = async () => {
      try {
        const res: AxiosResponse<Comment[]> = await axios.get(`${config.APP_URL}/api/BlogComment/{{NextNewBlogId}}?postId=${post.blogId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  
    fetchComments();
  }, [path, post.blogId]);
  

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get<Post>(`${config.APP_URL}/api/Blog/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.APP_URL}/api/Blog/${post.blogId}`, {
        data: { post },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
      {post.photoId && (
        <img src={PF + post.photoId} alt="" className="singlePostImg" />
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <p className="singlePostDesc">{content}</p>
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


