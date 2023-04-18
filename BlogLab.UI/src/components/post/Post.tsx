import "./post.css";
import { Link } from "react-router-dom";

interface PostProps {
  post: {
    blogId: string;
    title: string;
    content: string;
    applicationUserId:number,
    username : string,
    publishDate: Date,
    updateDate:Date,
    deleteConfirm:boolean,
    photoId: number;
    categories: { name: string }[];
    createdAt: string;
  };
}
export type PostType = {
   blogId: string;
    title: string;
    content: string;
    applicationUserId:number,
    username : string,
    publishDate: Date,
    updateDate:Date,
    deleteConfirm:boolean,
    photoId: number;
    categories: { blogId: string; name: string }[];
    createdAt: string;
};

export default function Post({ post }: PostProps) {
  return (
    <div className="post">
      {post.photoId && <img className="postImg" src="" alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span key={c.name} className="postCat">
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post.blogId}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postContent">{post.content}</p>
    </div>
  );
}

