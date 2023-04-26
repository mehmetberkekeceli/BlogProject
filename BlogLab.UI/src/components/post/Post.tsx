import "./post.css";
import { Link } from "react-router-dom";

interface PostProps {
  post: {
    blogId: number;
    title: string;
    content: string;
    applicationUserId:number,
    username : string,
    publishDate: Date,
    updateDate:Date,
    deleteConfirm:boolean,
    photoId: number;
    categories: {
      blogId: number;
      username: string;
      title : string;
      publishDate : Date;
      content : string;
    }[];
  };
}
export type PostType = {
   blogId: number;
    title: string;
    content: string;
    applicationUserId:number,
    username : string,
    publishDate: Date,
    updateDate:Date,
    deleteConfirm:boolean,
    photoId: number;
    categories: {
      blogId: number;
      username: string;
      title : string;
      publishDate : Date;
      content : string;
    }[];

};

export default function Post({ post }: PostProps) {
  return (
    <div className="post">
      <img className="postImg" src="https://images.wallpaperscraft.com/image/single/japan_shirakawa_houses_112963_1920x1080.jpg" alt="" />
      <div className="postInfo">
        <div className="postCats">
        </div>
        <Link to={`/post/${post.blogId}`} className="link">
          <p className="postCat">Yazar: {post.username}</p>
          <br />
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.publishDate).toDateString()}
        </span>
      </div>
    </div>
  );
}