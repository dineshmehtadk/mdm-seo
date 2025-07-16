// types/whitepaper.ts
export interface WhitepaperSection {
  heading: string;
  subSections?: {
    subHeading?: string;
    bullets?: string[];
    paragraphs?: string[];
  }[];
  paragraphs?: string[];
  bullets?: string[];
}

export interface WhitepaperData {
  id: string;
  title: string;
  subtitle?: string;        // make optional
  authorInfo?: string;
  footerText?: string;      // make optional
  sections: WhitepaperSection[];
}
