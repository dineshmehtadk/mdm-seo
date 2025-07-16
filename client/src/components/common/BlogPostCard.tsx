import { Link } from "wouter";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  excerpt,
  date,
  imageSrc,
  imageAlt,
  href,
}) => {
  return (
    <Link href={href}>
      <a className="group block bg-white rounded-lg overflow-hidden h-52   shadow-lg hover:shadow-xl transition-shadow ease-in-out">
        <div className="aspect-w-16 aspect-h-9 bg-neutral-200">
          <div className="w-full h-full" style={{ 
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>
        <div className="p-5">
          <div className="text-sm text-neutral-500 mb-2">{date}</div>
          <h4 className="text-lg font-semibold mb-2 text-neutral-800 line-2 group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="text-neutral-600 line-clamp-2">
            {excerpt}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
