import { useState, useEffect } from "react";

const News = () => {
  const [news, setNews] = useState([]);

  const data = async () => {
    // const res = await fetch(
    //   "https://cryptopanic.com/api/v1/posts/?auth_token=10753ce58e826fb61d74ed6360c3f7c97e4f7372&public=true",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const d = await res.json();
    // console.log(d);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="news-main">
      {news &&
        news.slice(0, 10).map((n) => (
          <>
            <a href={n.url} target="_blank">
              {n.title}
            </a>
          </>
        ))}
    </div>
  );
};

export default News;
