// 模拟科技新闻数据
export interface NewsImage {
  score: number;
  image_link: string;
  description: string;
}

export interface NewsArticle {
  title: string;
  published: string;
  link: string;
  feed: string;
}

export interface NewsEvent {
  id: string;
  group_title: string;
  suggested_headline: string;
  group_summary: string;
  explanation: string;
  earliest_published: string;
  importance: number;
  article_num: number;
  feeds: string[];
  images: NewsImage[];
  articles: NewsArticle[];
}

export const mockNewsData: NewsEvent[] = [
  {
    id: "1",
    group_title: "ChatGPT用户每日生成提示词达25亿次，OpenAI宣布新里程碑",
    suggested_headline:
      "OpenAI reveals ChatGPT processes 2.5 billion daily prompts",
    group_summary:
      "OpenAI宣布ChatGPT现在每天处理超过25亿次用户提示词，这一数字相比去年同期增长了300%。公司表示这一增长主要来自企业用户的大规模采用，以及新推出的GPT-4 Turbo模型的高效处理能力。 | 这一里程碑凸显了AI聊天机器人在日常工作和生活中的普及程度，同时也反映了OpenAI在竞争激烈的AI市场中的领先地位。",
    explanation:
      "这一数字的意义远超表面统计。25亿次日活跃交互意味着ChatGPT已经成为仅次于搜索引擎的信息获取工具，这正在重塑人们获取知识和解决问题的方式。对企业而言，这标志着AI工具从实验阶段进入生产力核心，预示着一个全新的工作范式。同时，如此大规模的数据处理也为OpenAI提供了训练更强大模型的宝贵资源，形成了正向循环。",
    earliest_published: "2024-01-15T08:30:00Z",
    importance: 95,
    article_num: 8,
    feeds: ["TechCrunch", "The Verge", "Mashable", "Ars Technica"],
    images: [
      {
        score: 95,
        image_link:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        description: "ChatGPT logo and interface on screen",
      },
      {
        score: 80,
        image_link:
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=300&fit=crop",
        description: "AI and machine learning visualization",
      },
    ],
    articles: [
      {
        title:
          "OpenAI's ChatGPT Hits 2.5 Billion Daily Prompts, Setting New Industry Record",
        published: "2024-01-15T08:30:00Z",
        link: "#",
        feed: "TechCrunch",
      },
      {
        title:
          "ChatGPT Usage Explodes: 25 Billion Daily Interactions Mark AI Mainstream Adoption",
        published: "2024-01-15T09:15:00Z",
        link: "#",
        feed: "The Verge",
      },
      {
        title: "How ChatGPT's 2.5B Daily Prompts Signal the Future of Work",
        published: "2024-01-15T10:00:00Z",
        link: "#",
        feed: "Mashable",
      },
    ],
  },
  {
    id: "2",
    group_title: "苹果发布Vision Pro 2代预告，重量减轻40%续航翻倍",
    suggested_headline:
      "Apple teases Vision Pro 2 with 40% weight reduction and doubled battery life",
    group_summary:
      "苹果在今日的开发者大会上首次展示了Vision Pro第二代的早期原型。新设备在保持相同显示质量的前提下，重量从目前的600克降至约360克，电池续航时间从2小时提升至4小时。 | 苹果表示新一代产品将搭载专为AR优化的M4芯片，并引入了全新的眼球追踪算法，显著降低了眩晕感。产品预计将在2024年底正式发布。",
    explanation:
      "Vision Pro 2的改进解决了初代产品的核心痛点：重量和续航。40%的重量减轻将大幅提升长时间佩戴的舒适度，这是空间计算设备走向大众市场的关键门槛。续航时间翻倍意味着用户可以进行更深度的工作和娱乐体验。这些改进配合M4芯片的性能提升，预示着苹果正在加速推进其'空间计算'愿景，可能引发整个AR/VR行业的新一轮竞争。",
    earliest_published: "2024-01-15T14:20:00Z",
    importance: 88,
    article_num: 6,
    feeds: ["MacRumors", "9to5Mac", "The Verge", "CNET"],
    images: [
      {
        score: 92,
        image_link:
          "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=400&fit=crop",
        description: "Apple Vision Pro headset",
      },
    ],
    articles: [
      {
        title:
          "Apple Vision Pro 2: Lighter, Longer-Lasting, and Coming This Year",
        published: "2024-01-15T14:20:00Z",
        link: "#",
        feed: "MacRumors",
      },
      {
        title: "Vision Pro Gets Major Upgrade: 40% Lighter with M4 Chip",
        published: "2024-01-15T14:45:00Z",
        link: "#",
        feed: "9to5Mac",
      },
    ],
  },
  {
    id: "3",
    group_title: "Meta开源Llama 3.1：405B参数模型挑战GPT-4性能",
    suggested_headline:
      "Meta releases open-source Llama 3.1 with 405B parameters to compete with GPT-4",
    group_summary:
      "Meta发布了迄今为止最大的开源语言模型Llama 3.1，拥有4050亿参数。在多项基准测试中，该模型的性能接近甚至超越了GPT-4。Meta表示，开源这一模型是为了推动AI研究的民主化。 | 除了405B版本，Meta还发布了70B和8B参数的优化版本，适用于不同的计算资源需求。所有模型都支持32K上下文长度，并在代码生成、数学推理等任务上表现出色。",
    explanation:
      "Llama 3.1的发布是AI开源运动的重大胜利。一个性能媲美GPT-4的模型现在可以被任何组织下载、修改和部署，这将大幅降低AI应用的门槛。对企业而言，这意味着可以在自己的基础设施上运行顶级AI模型，无需依赖外部API，保证数据隐私和成本控制。长远来看，这可能重塑AI产业格局，从少数科技巨头垄断转向更加多元化的生态系统。",
    earliest_published: "2024-01-15T16:00:00Z",
    importance: 93,
    article_num: 12,
    feeds: ["TechCrunch", "Ars Technica", "VentureBeat", "AI News"],
    images: [
      {
        score: 88,
        image_link:
          "https://images.unsplash.com/photo-1655720033654-a4239dd42d10?w=800&h=400&fit=crop",
        description: "Meta AI and Llama model visualization",
      },
    ],
    articles: [
      {
        title: "Meta's Llama 3.1: The Open-Source AI Model That Rivals GPT-4",
        published: "2024-01-15T16:00:00Z",
        link: "#",
        feed: "TechCrunch",
      },
      {
        title:
          "405 Billion Parameters: Meta Releases Largest Open-Source Language Model",
        published: "2024-01-15T16:30:00Z",
        link: "#",
        feed: "Ars Technica",
      },
    ],
  },
  {
    id: "4",
    group_title: "特斯拉FSD版本12正式推送，完全基于神经网络驾驶",
    suggested_headline:
      "Tesla rolls out FSD v12 with end-to-end neural network driving",
    group_summary:
      "特斯拉开始向用户推送Full Self-Driving (FSD) Beta版本12，这是首个完全基于端到端神经网络的自动驾驶系统。新版本抛弃了传统的规则编程，完全依靠AI从感知到决策的全流程处理。 | 早期用户报告显示，FSD v12在城市复杂路况下的表现显著提升，特别是在处理施工区域、临时交通标志等动态场景时更加自然流畅。马斯克表示这标志着自动驾驶技术的'iPhone时刻'。",
    explanation:
      "FSD v12代表了自动驾驶技术范式的根本转变。从规则驱动转向端到端神经网络，意味着系统能够处理程序员无法预见的复杂场景，这是通往真正无人驾驶的关键一步。如果这一方法被证明有效且安全，将重新定义整个自动驾驶行业的技术路线。对特斯拉而言，这不仅是技术突破，更是商业模式的革命——每辆车都成为数据收集和模型训练的节点，形成了难以复制的竞争壁垒。",
    earliest_published: "2024-01-15T12:15:00Z",
    importance: 91,
    article_num: 9,
    feeds: ["Electrek", "InsideEVs", "TechCrunch", "Automotive News"],
    images: [
      {
        score: 90,
        image_link:
          "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop",
        description: "Tesla vehicle with FSD technology",
      },
    ],
    articles: [
      {
        title:
          "Tesla FSD v12 Goes Live: The End-to-End Neural Network Revolution",
        published: "2024-01-15T12:15:00Z",
        link: "#",
        feed: "Electrek",
      },
      {
        title: "Tesla's FSD v12 Ditches Code for Pure AI Driving",
        published: "2024-01-15T13:00:00Z",
        link: "#",
        feed: "InsideEVs",
      },
    ],
  },
  {
    id: "5",
    group_title: "Google Quantum AI实现重大突破，纠错量子计算机原型问世",
    suggested_headline:
      "Google Quantum AI achieves breakthrough with error-corrected quantum computer prototype",
    group_summary:
      "Google量子AI团队宣布成功构建了首个实用级别的纠错量子计算机原型，能够在保持量子态稳定的同时执行复杂计算任务。这一突破解决了量子计算最大的技术障碍之一：量子态的脆弱性。 | 新系统使用了1000个物理量子比特来构建10个逻辑量子比特，错误率较之前降低了100倍。Google表示，这为实现商用量子计算机奠定了基础，预计5年内将推出商业化产品。",
    explanation:
      "量子纠错的实现是量子计算从实验室走向实用的分水岭。目前量子计算面临的最大挑战是量子态极易受到环境干扰而崩溃，这使得复杂计算变得不可靠。Google的突破意味着我们终于拥有了构建大规模、稳定量子计算机的技术路径。这将在密码学、药物发现、材料科学等领域产生革命性影响，甚至可能重新定义计算本身的边界。对整个科技产业而言，这标志着下一个计算时代的开端。",
    earliest_published: "2024-01-15T10:45:00Z",
    importance: 96,
    article_num: 7,
    feeds: ["Nature", "Science", "MIT Tech Review", "Quantum Magazine"],
    images: [
      {
        score: 94,
        image_link:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
        description: "Quantum computer with cooling system",
      },
    ],
    articles: [
      {
        title:
          "Google's Quantum Leap: Error-Corrected Computing Becomes Reality",
        published: "2024-01-15T10:45:00Z",
        link: "#",
        feed: "Nature",
      },
      {
        title:
          "Breakthrough: Google Solves Quantum Computing's Biggest Challenge",
        published: "2024-01-15T11:20:00Z",
        link: "#",
        feed: "MIT Tech Review",
      },
    ],
  },
];

// 用于首页展示的热门话题
export const trendingTopics = [
  "ChatGPT",
  "Vision Pro",
  "Meta AI",
  "Tesla FSD",
  "量子计算",
  "神经网络",
  "自动驾驶",
  "AR/VR",
  "开源AI",
  "苹果",
];

// 媒体Logo映射（实际项目中应该使用真实的logo）
export const mediaLogos: Record<string, string> = {
  TechCrunch: "TC",
  "The Verge": "TV",
  Mashable: "M",
  "Ars Technica": "AT",
  MacRumors: "MR",
  "9to5Mac": "95M",
  CNET: "CN",
  VentureBeat: "VB",
  "AI News": "AI",
  Electrek: "E",
  InsideEVs: "IE",
  "Automotive News": "AN",
  Nature: "N",
  Science: "S",
  "MIT Tech Review": "MIT",
  "Quantum Magazine": "QM",
};
