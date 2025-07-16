import { Blog } from "../../types/blog";
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { useState, useRef } from 'react';

const LatestBlogCarousel = ({ blogs }: { blogs: Blog[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white mt-16 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-gray-900">Latest Articles</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className={`p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors ${!showLeftArrow ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!showLeftArrow}
            >
              <FaArrowRight className="rotate-180" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className={`p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors ${!showRightArrow ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!showRightArrow}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6"
        >
          {blogs.map((blog, i) => (
            <article 
              key={i} 
              className="flex-none w-[380px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="relative h-48">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{blog.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">
                  {blog.title}
                </h4>
                {/* <p className="text-gray-600 line-clamp-2 mb-4 flex-grow">
                  {blog.introduction}
                </p> */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    By {blog.author}
                  </p>
                  <a 
                    href={`/blog/${blog.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    Read More
                    <FaArrowRight className="text-xs" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogCarousel;
