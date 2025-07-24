import { useState } from "react";
import { mockNewsData, trendingTopics, type NewsEvent } from "../data/mockNews";
import EventCard from "./EventCard";
import "./NewsHomePage.css";

interface NewsHomePageProps {
  onEventClick: (event: NewsEvent) => void;
}

const NewsHomePage: React.FC<NewsHomePageProps> = ({ onEventClick }) => {
  const [sortBy, setSortBy] = useState<"latest" | "trending">("latest");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  // 根据排序方式排列新闻
  const sortedNews = [...mockNewsData].sort((a, b) => {
    if (sortBy === "latest") {
      return (
        new Date(b.earliest_published).getTime() -
        new Date(a.earliest_published).getTime()
      );
    } else {
      return b.importance - a.importance;
    }
  });

  // 获取热门事件（过去24小时内importance最高的事件）
  const topEvents = [...mockNewsData]
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 5);

  const categories = [
    "全部",
    "AI技术",
    "苹果",
    "自动驾驶",
    "量子计算",
    "企业动态",
  ];

  return (
    <div className="news-homepage">
      {/* 顶部导航栏 */}
      <header className="top-header">
        <div className="header-content">
          <div className="logo">
            <h1>TechFlow</h1>
            <span className="tagline">科技事件聚合平台</span>
          </div>
          <nav className="top-nav">
            <a href="#" className="nav-link active">
              首页
            </a>
            <a href="#" className="nav-link">
              深度
            </a>
            <a href="#" className="nav-link">
              创投
            </a>
            <a href="#" className="nav-link">
              企业服务
            </a>
          </nav>
        </div>
      </header>

      <div className="main-container">
        {/* 左侧导航栏 */}
        <aside className="left-sidebar">
          <div className="sidebar-section">
            <h3>分类浏览</h3>
            <ul className="category-list">
              {categories.map((category) => (
                <li
                  key={category}
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>排序方式</h3>
            <div className="sort-options">
              <button
                className={sortBy === "latest" ? "active" : ""}
                onClick={() => setSortBy("latest")}
              >
                最新发布
              </button>
              <button
                className={sortBy === "trending" ? "active" : ""}
                onClick={() => setSortBy("trending")}
              >
                热门推荐
              </button>
            </div>
          </div>
        </aside>

        {/* 中间内容区 */}
        <main className="main-content">
          <div className="content-header">
            <h2>科技事件 • {sortBy === "latest" ? "最新" : "热门"}</h2>
            <p className="content-subtitle">
              汇聚全球科技媒体，提供深度解读的事件驱动新闻
            </p>
          </div>

          <div className="news-feed">
            {sortedNews.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onEventClick(event)}
              />
            ))}
          </div>
        </main>

        {/* 右侧边栏 */}
        <aside className="right-sidebar">
          <div className="sidebar-section">
            <h3>热门事件</h3>
            <div className="top-events">
              {topEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="top-event-item"
                  onClick={() => onEventClick(event)}
                >
                  <span className="event-rank">{index + 1}</span>
                  <div className="event-info">
                    <h4>{event.group_title}</h4>
                    <div className="event-meta">
                      <span className="importance-score">
                        热度 {event.importance}
                      </span>
                      <span className="article-count">
                        {event.article_num}篇报道
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>热门话题</h3>
            <div className="trending-topics">
              {trendingTopics.map((topic) => (
                <span key={topic} className="topic-tag">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>今日数据</h3>
            <div className="daily-stats">
              <div className="stat-item">
                <span className="stat-number">{mockNewsData.length}</span>
                <span className="stat-label">今日事件</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {mockNewsData.reduce(
                    (sum, event) => sum + event.article_num,
                    0
                  )}
                </span>
                <span className="stat-label">聚合文章</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {
                    Array.from(
                      new Set(mockNewsData.flatMap((event) => event.feeds))
                    ).length
                  }
                </span>
                <span className="stat-label">信源媒体</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsHomePage;
