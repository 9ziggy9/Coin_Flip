import { useState, useEffect } from "react";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);

  const data = async () => {
    const res = await fetch("/api/cryptocurrencies/news");
    const d = await res.json();
    setNews(d.news);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="news-main">
      {news &&
        news.slice(1, 10).map((n) => (
          <div className="news-card-main">
            <a href={n.url} target="_blank" className="news-card">
              <div className="news-text">
                <p className="news-source">⚡︎ {n.source}</p>
                <p className="news-title">{n.headline}</p>
              </div>
              <img className="news-img" src={n.image} />
            </a>
          </div>
        ))}
    </div>
  );
};

export default News;
