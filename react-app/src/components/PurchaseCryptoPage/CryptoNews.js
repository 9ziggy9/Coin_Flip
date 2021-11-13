import { useState, useEffect } from "react";
import "../News/News"

const CryptoNews = ({ crypto }) => {
  const [news, setNews] = useState([]);

  const data = async () => {
    const res = await fetch(`/api/cryptocurrencies/${crypto.id}`);
    const d = await res.json();
    setNews(d.news);
  };

  useEffect(() => {
    data();
  }, [crypto]);

  return (
    <div className="news-main">
      {news &&
        news.slice(0, 10).map((n) => (
          <div className="news-card-main">
            <a href={n.url} target="_blank" className="news-card">
              <div className="news-text">
                <p className="news-source">{n.source}</p>
                <p className="news-title">{n.headline}</p>
              </div>
              <img className="news-img" src={n.image} />
            </a>
          </div>
        ))}
    </div>
  );
};

export default CryptoNews;
