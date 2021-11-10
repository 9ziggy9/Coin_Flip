import { useState, useEffect } from "react";

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
        news.slice(0, 10).map((n) => (
          <div>
            <a href={n.url} target="_blank">
              {n.headline}
              <img src={n.image} />
            </a>
          </div>
        ))}
    </div>
  );
};

export default News;
