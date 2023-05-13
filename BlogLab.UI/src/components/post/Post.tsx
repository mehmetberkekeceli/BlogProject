import "./post.css";
import { Link } from "react-router-dom";
import PostPhoto from '../../photos/PostPhoto.jpg';

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
  const shortenedContent = post.content.substring(0, 100) + "...";

  return (
    <div className="post">
      <div className="postInfo">
        <div className="postCats">
        </div>
        <Link to={`/post/${post.blogId}`} className="link">
        <img className="postImg" src={PostPhoto} alt="" />
          <p className="postCat">Yazar: {post.username}</p>
          <span className="postTitle">{post.title}</span>
          <p className="postDesc">{shortenedContent}</p>
          {post.content.length > 100 && (
            <Link to={`/post/${post.blogId}`}>
            </Link>
          )}
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.publishDate).toDateString()}
        </span>
      </div>
    </div>
  );
}
