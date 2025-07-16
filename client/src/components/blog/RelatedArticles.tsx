interface Props {
  articles: { title: string; description: string }[];
}

const RelatedArticles: React.FC<Props> = ({ articles }) => {
  if (!articles.length) return null;
  return (
    <section className="bg-gray-50 py-8 px-4">
      <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold">{article.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{article.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
