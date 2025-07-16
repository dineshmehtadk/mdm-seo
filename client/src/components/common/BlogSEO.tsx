// src/components/blog/BlogSEO.tsx
import { Helmet } from "react-helmet-async";

const BlogSEO = ({ title, description }) => {
  // const faqSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   "mainEntity": internalLinks?.map(link => ({
  //     "@type": "Question",
  //     "name": link.text,
  //     "acceptedAnswer": {
  //       "@type": "Answer",
  //       "text": link.description
  //     }
  //   }))
  // };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* {internalLinks && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )} */}
    </Helmet>
  );
};

export default BlogSEO;
