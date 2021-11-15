import { useState, useEffect } from "react";
import "../News/News";

const CryptoNews = ({ crypto }) => {
  const [news, setNews] = useState([]);
  const [news2, setNews2] = useState([]);

  const data = async () => {
    const res = await fetch(`/api/cryptocurrencies/${crypto.id}`);
    const d = await res.json();
    setNews(d.news);
  };

  const data2 = async () => {
    const res = await fetch(`/api/cryptocurrencies/news`);
    const d = await res.json();
    setNews2(d.news);
  };

  useEffect(() => {
    data();
  }, [crypto]);

  useEffect(() => {
    if (news?.length < 1) {
      data2();
    }
  }, [news]);

  return (
    <div className="news-main">
      {news?.length &&
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
      {(news2 &&
        news?.length < 1) ?
        news2.slice(0, 10).map((n) => (
          <div className="news-card-main">
            <a href={n.url} target="_blank" className="news-card">
              <div className="news-text">
                <p className="news-source">{n.source}</p>
                <p className="news-title">{n.headline}</p>
              </div>
              <img className="news-img" src={n.image} />
            </a>
          </div>
        )) : null}
    </div>
  );
};

export default CryptoNews;
