import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import Layout from "../../components/layout/layout";
import { config } from "../../config/env";

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<any[]>([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${config.APP_URL}/api/Blog${search}`);
      setPosts(res.data.items);
    };
    fetchPosts();
  }, [search]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`${config.APP_URL}/api/Blog`);
      setPosts(response.data.items);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Layout>
        <div className="home">
          <Posts posts={posts} />
        </div>
      </Layout>
    </>
  );
}