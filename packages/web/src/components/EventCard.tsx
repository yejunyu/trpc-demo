import { type NewsEvent, mediaLogos } from "../data/mockNews";
import "./EventCard.css";

interface EventCardProps {
  event: NewsEvent;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  // 获取最高分数的图片
  const mainImage = event.images.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  // 格式化时间
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "刚刚";
    if (diffInHours < 24) return `${diffInHours}小时前`;
    return `${Math.floor(diffInHours / 24)}天前`;
  };

  // 获取摘要的第一句话
  const getSummaryFirstSentence = (summary: string) => {
    const sentences = summary.split("|")[0].trim();
    return sentences.length > 150
      ? sentences.substring(0, 150) + "..."
      : sentences;
  };

  return (
    <article className="event-card" onClick={onClick}>
      <div className="card-content">
        {/* 左侧图片 */}
        <div className="card-image">
          <img
            src={mainImage.image_link}
            alt={mainImage.description}
            loading="lazy"
          />
        </div>

        {/* 右侧内容 */}
        <div className="card-info">
          {/* 标题 */}
          <h2 className="card-title">{event.group_title}</h2>

          {/* 摘要 */}
          <p className="card-summary">
            {getSummaryFirstSentence(event.group_summary)}
          </p>

          {/* 元信息 */}
          <div className="card-meta">
            <div className="meta-left">
              <span className="publish-time">
                🕒 {formatTimeAgo(event.earliest_published)}
              </span>
              <span className="source-info">
                综合 <strong>{event.article_num}</strong> 家媒体报道
              </span>
            </div>

            <div className="meta-right">
              {/* 媒体logo */}
              <div className="media-logos">
                {event.feeds.slice(0, 4).map((feed) => (
                  <span key={feed} className="media-logo" title={feed}>
                    {mediaLogos[feed] || feed.substring(0, 2)}
                  </span>
                ))}
                {event.feeds.length > 4 && (
                  <span className="more-sources">
                    +{event.feeds.length - 4}
                  </span>
                )}
              </div>

              {/* 重要度指示器 */}
              <div className="importance-indicator">
                <span
                  className={`importance-badge ${
                    event.importance >= 90 ? "high" : "medium"
                  }`}
                >
                  {event.importance >= 90 ? "重要" : "关注"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 悬停效果指示器 */}
      <div className="card-hover-indicator">
        <span>点击查看详情 →</span>
      </div>
    </article>
  );
};

export default EventCard;
