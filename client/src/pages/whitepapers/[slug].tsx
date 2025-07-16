// pages/whitepapers/[slug].tsx
import { useParams } from "wouter";
import { whitepapers } from "@/lib/whitepapersData";
import WhitepaperDetails from "@/components/whitePaper/WhitepaperDetails";

const WhitepaperDetailPage = () => {
  const { slug } = useParams();

  const whitepaper = whitepapers.find((wp) => wp.slug === slug);

  if (!whitepaper) {
    return <div className="text-center py-20 text-red-500">Whitepaper not found.</div>;
  }

  return <WhitepaperDetails {...whitepaper} />;
};

export default WhitepaperDetailPage;
