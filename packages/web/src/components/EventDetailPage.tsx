import { type NewsEvent, mediaLogos } from "../data/mockNews";
import "./EventDetailPage.css";

interface EventDetailPageProps {
  event: NewsEvent;
  onBack: () => void;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, onBack }) => {
  // 获取最高分数的图片作为主图
  const heroImage = event.images.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  // 格式化时间
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 处理摘要文本，将 | 替换为段落
  const formatSummary = (summary: string) => {
    return summary
      .split("|")
      .map((paragraph) => paragraph.trim())
      .filter((p) => p.length > 0);
  };

  const summaryParagraphs = formatSummary(event.group_summary);

  return (
    <div className="event-detail-page">
      {/* 顶部导航 */}
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>
          ← 返回新闻流
        </button>
        <div className="header-actions">
          <button className="share-button">分享</button>
          <button className="bookmark-button">收藏</button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="detail-container">
        {/* 左侧主内容 */}
        <main className="detail-main">
          {/* 顶部视觉区 */}
          <div className="hero-section">
            <img
              src={heroImage.image_link}
              alt={heroImage.description}
              className="hero-image"
            />
            <div className="hero-content">
              <h1 className="event-title">{event.group_title}</h1>
              {event.suggested_headline && (
                <h2 className="event-subtitle">{event.suggested_headline}</h2>
              )}
            </div>
          </div>

          {/* 深度解读 - 这是最重要的部分 */}
          <div className="explanation-section">
            <div className="section-header">
              <h3>深度解读</h3>
              <span className="section-subtitle">为何重要</span>
            </div>
            <div className="explanation-content">
              <p>{event.explanation}</p>
            </div>
          </div>

          {/* 事件摘要 */}
          <div className="summary-section">
            <h3>事件摘要</h3>
            <div className="summary-content">
              {summaryParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 多方报道 */}
          <div className="articles-section">
            <h3>多方报道 ({event.article_num}篇)</h3>
            <div className="articles-list">
              {event.articles.map((article, index) => (
                <article key={index} className="article-item">
                  <div className="article-header">
                    <span className="media-badge">
                      {mediaLogos[article.feed] || article.feed}
                    </span>
                    <span className="article-time">
                      {formatDateTime(article.published)}
                    </span>
                  </div>
                  <h4 className="article-title">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </h4>
                  <div className="article-footer">
                    <span className="article-source">{article.feed}</span>
                    <span className="external-link">外链 ↗</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>

        {/* 右侧信息栏 */}
        <aside className="detail-sidebar">
          {/* 相关图片 */}
          {event.images.length > 1 && (
            <div className="sidebar-section">
              <h4>相关图片</h4>
              <div className="related-images">
                {event.images
                  .filter((img) => img !== heroImage)
                  .slice(0, 3)
                  .map((image, index) => (
                    <div key={index} className="related-image">
                      <img src={image.image_link} alt={image.description} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 事件信息 */}
          <div className="sidebar-section">
            <h4>事件信息</h4>
            <div className="event-info">
              <div className="info-item">
                <span className="info-label">首次报道</span>
                <span className="info-value">
                  {formatDateTime(event.earliest_published)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">重要程度</span>
                <span className="info-value">
                  <span
                    className={`importance-score ${
                      event.importance >= 90 ? "high" : "medium"
                    }`}
                  >
                    {event.importance}/100
                  </span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">报道媒体</span>
                <span className="info-value">{event.feeds.length} 家</span>
              </div>
              <div className="info-item">
                <span className="info-label">文章总数</span>
                <span className="info-value">{event.article_num} 篇</span>
              </div>
            </div>
          </div>

          {/* 信源媒体 */}
          <div className="sidebar-section">
            <h4>信源媒体</h4>
            <div className="source-media">
              {event.feeds.map((feed) => (
                <div key={feed} className="media-item">
                  <span className="media-logo-large">
                    {mediaLogos[feed] || feed.substring(0, 2)}
                  </span>
                  <span className="media-name">{feed}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 分享按钮 */}
          <div className="sidebar-section">
            <h4>分享到</h4>
            <div className="share-buttons">
              <button className="share-btn weibo">微博</button>
              <button className="share-btn wechat">微信</button>
              <button className="share-btn twitter">Twitter</button>
              <button className="share-btn copy">复制链接</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetailPage;
