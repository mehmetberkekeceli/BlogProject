import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css"
import BinanceAPIExample from "../../components/crypto/BinanceAPIExample";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

function News() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=3d1d863338284ca893adf4310f220cf9`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div className="news">
      <h1 className="newsHeader">Dünyadan Teknoloji Haberleri</h1>
      <BinanceAPIExample/>
      {articles.length > 0 ? (
        articles.map((article) => (
          // sadece img url'si null değilse, yani bir resim varsa, devam eder.
          article.urlToImage && (
            <div key={article.title}>
              <h2>{article.title}</h2>
              <img src={article.urlToImage} alt={article.title} />
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Devamını Oku!
              </a>
            </div>
          )
        ))
      ) : (
        <p>Haberler yükleniyor...</p>
      )}
    </div>
  );
}

export default News;
