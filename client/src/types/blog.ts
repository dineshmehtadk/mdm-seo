export interface BlogSubSection {
  subheading: string;
  content: string[];
  listItems?: string[];
  note?: string;
}

export interface BlogSection {
  heading: string;
  content?: string[]; // Optional for sections that contain only subsections or listItems
  listItems?: string[];
  subsections?: BlogSubSection[]; // Optional nested subsections
}

export interface Blog {
  id: string;
  title: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  featureImage: string;
  author: string;
  introduction: string;
  sections: BlogSection[];
  conclusion?: {
    content: string;
    cta?: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  seoRecommendations?: {
    internalLinks: {
      text: string;
      url: string;
      description?: string;
    }[];
  };
}
