import "./post.css";
import { Link } from "react-router-dom";

interface PostProps {
  post: {
    _id: string;
    photo: string;
    categories: { name: string }[];
    title: string;
    createdAt: string;
    desc: string;
  };
}
export type PostType = {
  _id: string;
  title: string;
  desc: string;
  photo: string;
  categories: { _id: string; name: string }[];
  createdAt: string;
};

export default function Post({ post }: PostProps) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span key={c.name} className="postCat">
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}

