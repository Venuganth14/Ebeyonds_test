import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NewsList.css";
import { BiGridAlt, BiListUl } from "react-icons/bi";
const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const NEWS_DISPLAY_LIMIT = 8;

  const API_URL =
    "https://showcase.dmc.smart360web.com/api/v1/news/getall?api_key=5cef0b93x6b269ec&api_user=UI_TEST_WEB&f[]=title&f[]=news_date&f[]=thumbnail&f[]=short_description&f[]=categories&f[]=reporter&st=0&lt=25&sp=news_date&sd=DESC";

  const predefinedCategories = [
    "All",
    "Sports",
    "Politics",
    "Crypto",
    "Stock",
    "Business",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data && Array.isArray(response.data.dataSets)) {
          const newsItems = response.data.dataSets.map((item) => ({
            id: item.hash.datavalue,
            title: item.title.datavalue,
            news_date: item.news_date.datavalue,
            thumbnail: item.thumbnail.datavalue.fileUrl,
            short_description: item.short_description.datavalue,
            reporter: item.reporter.datavalue || "Unknown Author",
            categories: item.categories.datavalue
              .map((cat) => cat.name.datavalue)
              .join(", "),
          }));
          setNewsData(newsItems);
          setFilteredNews(newsItems);
          setDisplayedNews(newsItems.slice(0, NEWS_DISPLAY_LIMIT));
        } else {
          throw new Error("No news data found");
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = newsData;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((news) =>
        news.categories.includes(selectedCategory)
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter(
        (news) =>
          new Date(news.news_date).getMonth() + 1 ===
          parseInt(selectedMonth, 10)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.short_description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
    setDisplayedNews(filtered.slice(0, NEWS_DISPLAY_LIMIT));
    setLoadMoreVisible(filtered.length > NEWS_DISPLAY_LIMIT);
  }, [selectedCategory, selectedMonth, searchQuery, newsData]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const loadMoreNews = () => {
    const currentLength = displayedNews.length;
    const newLength = currentLength + NEWS_DISPLAY_LIMIT;
    const newDisplayedNews = filteredNews.slice(0, newLength);
    setDisplayedNews(newDisplayedNews);

    if (newDisplayedNews.length >= filteredNews.length) {
      setLoadMoreVisible(false);
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching news: {error.message}</div>;
  }

  const latestNews = filteredNews.slice(0, 4);

  return (
    <div>
      <h2 className="mb-4">Latest News</h2>

      <Row className="mb-4 row-equal-height">
        <Col lg={4} className="mb-4">
          <div className="news-card large-card">
            <div
              className="news-image"
              style={{
                backgroundImage: `url(${latestNews[0]?.thumbnail})`,
              }}
            >
              <div className="news-overlay">
                <h5 className="news-title">{latestNews[0]?.title}</h5>
                <p className="news-date">
                  {new Date(latestNews[0]?.news_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={4} className="mb-4">
          <Row className="row-equal-height">
            <Col sm={12} className="mb-4">
              <div className="news-card small-card">
                <div
                  className="news-image"
                  style={{
                    backgroundImage: `url(${latestNews[1]?.thumbnail})`,
                  }}
                >
                  <div className="news-overlay">
                    <h5 className="news-title">{latestNews[1]?.title}</h5>
                    <p className="news-date">
                      {new Date(latestNews[1]?.news_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12}>
              <div className="news-card small-card">
                <div
                  className="news-image"
                  style={{
                    backgroundImage: `url(${latestNews[2]?.thumbnail})`,
                  }}
                >
                  <div className="news-overlay">
                    <h5 className="news-title">{latestNews[2]?.title}</h5>
                    <p className="news-date">
                      {new Date(latestNews[2]?.news_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={4} className="mb-4">
          <div className="news-card large-card">
            <div
              className="news-image"
              style={{
                backgroundImage: `url(${latestNews[3]?.thumbnail})`,
              }}
            >
              <div className="news-overlay">
                <h5 className="news-title">{latestNews[3]?.title}</h5>
                <p className="news-date">
                  {new Date(latestNews[3]?.news_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <h2 className="mb-4">All News</h2>

      <Form className="mb-4">
        <Row className="align-items-center">
          <Col md="auto">
            <Form.Label>
              <strong>Filter</strong>
            </Form.Label>
          </Col>
          <Col md={3}>
            <Form.Group controlId="categorySelect">
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {predefinedCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="monthSelect">
              <Form.Control
                as="select"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="searchQuery">
              <Form.Control
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md="auto" className="d-flex">
            <Button
              variant="light"
              className="mx-2"
              onClick={() => handleViewChange("grid")}
            >
              <BiGridAlt size={24} />
            </Button>
            <Button
              variant="light"
              className="mx-2"
              onClick={() => handleViewChange("list")}
            >
              <BiListUl size={24} />
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        {displayedNews.map((news) => (
       <Col
       key={news.id}
       sm={12}
       md={viewMode === "grid" ? 6 : 12}
       lg={viewMode === "grid" ? 3 : 12}
       className="mb-4"
     >
       <div
         className={`news-card ${
           viewMode === "list" ? "list-view-card" : ""
         }`}
       >
         <Link to={`/news/${news.id}`}>
           <div
             className={`news-image ${
               viewMode === "list" ? "list-view-image" : ""
             }`}
             style={{
               backgroundImage: `url(${news.thumbnail})`,
             }}
           ></div>
         </Link>
     
         <div className="news-content">
           <h5 className="news-title">{news.title}</h5>
           <p className="news-date">
             {new Date(news.news_date).toLocaleDateString()}
           </p>
           <p className="news-description">{news.short_description}</p>
           <div className="news-footer">
             <span className="news-reporter">{news.reporter}</span>
             <Link to={`/news/${news.id}`} className="read-more-btn">
               Read More <i className="bi bi-arrow-right"></i>
             </Link>
           </div>
         </div>
       </div>
     </Col>
     
        ))}
      </Row>

      {loadMoreVisible && (
        <div className="text-center">
          <Button variant="primary" onClick={loadMoreNews}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
