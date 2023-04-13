import Post, { PostType } from "../post/Post";
import "./posts.css";

interface PostsProps {
  posts: PostType[];
}

export default function Posts({ posts }: PostsProps) {
  if (!Array.isArray(posts)) {
    return <div>Post Bulunamadı!</div>;
  }

  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  );
}