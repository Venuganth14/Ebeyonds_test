import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import "./NewsDetail.css";

const API_URL =
  "https://showcase.dmc.smart360web.com/api/v1/news/getall?api_key=5cef0b93x6b269ec&api_user=UI_TEST_WEB&f[]=title&f[]=news_date&f[]=thumbnail&f[]=short_description&f[]=categories&f[]=reporter&st=0&lt=25&sp=news_date&sd=DESC";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data && Array.isArray(response.data.dataSets)) {
          const news = response.data.dataSets.find(
            (item) => item.hash.datavalue === id
          );
          setNewsItem({
            title: news.title.datavalue,
            news_date: news.news_date.datavalue,
            thumbnail: news.thumbnail.datavalue.fileUrl,
            short_description: news.short_description.datavalue,
            reporter: news.reporter.datavalue || "Unknown Author",
          });

          const latest = response.data.dataSets
            .filter((item) => item.hash.datavalue !== id)
            .slice(0, 4);
          const latestItems = latest.map((item) => ({
            id: item.hash.datavalue,
            title: item.title.datavalue,
            news_date: item.news_date.datavalue,
            thumbnail: item.thumbnail.datavalue.fileUrl,
            categories:
              item.categories.datavalue[0]?.name.datavalue || "Uncategorized",
          }));
          setLatestNews(latestItems);
        } else {
          throw new Error("No news data found");
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching news: {error.message}</div>;
  }

  if (!newsItem) {
    return <div>No news found</div>;
  }

  return (
    <div className="news-detail-container">
      <div className="row">
     
      <div className="breadcrumb-container">
  <div className="breadcrumb-links">
    <Link to="/" className="breadcrumb-home">Home</Link>
    <span> / </span>
    <span className="breadcrumb-title">{newsItem.title}</span>
  </div>
  <div className="back-button-container">
    <button className="go-back-btn" onClick={() => navigate(-1)}>
      <FaArrowLeft /> Go Back
    </button>
  </div>
</div>


        

        <img
          src={newsItem.thumbnail}
          alt={newsItem.title}
          className="news-detail-image"
        />
        <div className="col-lg-8">
          <h1 className="news-detail-title">{newsItem.title}</h1>
          <div className="news-detail-meta">
            <span className="news-detail-date">
              <FaCalendarAlt className="calendar-icon" />
              {new Date(newsItem.news_date).toLocaleDateString()}
            </span>
            <span className="news-detail-author">By {newsItem.reporter}</span>
          </div>
          <p className="news-detail-content">{newsItem.short_description}</p>
        </div>

        <div className="col-lg-4 latest-news-section">
          <h3 className="latest-news-heading">Latest News</h3>
          {latestNews.map((news) => (
            <div key={news.id} className="latest-news-item">
              <div className="row align-items-center">
                <div className="col-4">
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="latest-news-image"
                  />
                </div>

                <div className="col-8">
                  <h5 className="latest-news-title">
                    <Link
                      to={`/news/${news.id}`}
                      className="latest-news-title-link"
                    >
                      {news.title}
                    </Link>
                  </h5>
                  <p className="latest-news-meta">
                    <span>{new Date(news.news_date).toLocaleDateString()}</span>{" "}
                    | <span className="news-category">{news.categories}</span>
                  </p>
                  <Link to={`/news/${news.id}`} className="read-more-btn">
                    Read More <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
