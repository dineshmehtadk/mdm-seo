import { Blog } from "../../types/blog";
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import bg_image from "../../assets/hero_bg_sf-scaled.webp"; // Adjust the path as necessary

const BlogHero = ({ blog }: { blog: Blog }) => (
  <div className="relative w-full min-h-[500px] overflow-hidden text-whit bg-gradient">
    {/* Animated Wavy Background */}
    {/* <div className="absolute inset-0 overflow-hidden z-0">
 
      <img
        src={bg_image}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover "
      /> 
    </div> */}
 
    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-12 py-20 h-full flex flex-col justify-center">
      <div className="max-w-4xl">
        {/* Tags */}
        {/* <div className="flex gap-4 mb-6">
          <span className="bg-white/10 px-4 py-1 rounded-full text-sm">Product Updates</span>
          <span className="bg-white/10 px-4 py-1 rounded-full text-sm">Zero Trust Access</span>
        </div> */}

        {/* Title from Props */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {blog.title.split(" ").map((word, index) =>
            index % 2 === 0 ? (
              <span key={index} className="text-white">
                {word + " "}
              </span>
            ) : (
              <span key={index} className="text-white">
                {word + " "}
              </span>
            )
          )}
        </h1>

        {/* Author & Date */}
        <div className="text-white/80 text-sm mb-10 space-y-1">
          <p>Written by <span className="text-white font-medium">{blog.author}</span></p>
          <p>{blog.publishedAt}</p>
        </div>

        {/* Share Icons */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <span className="text-white/80 text-sm">Share On</span>
          <div className="flex gap-4">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-500 transition-all"
            >
              <FaLinkedinIn className="text-white text-lg" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-500 transition-all"
            >
              <FaFacebookF className="text-white text-lg" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-500 transition-all"
            >
              <FaXTwitter className="text-white text-lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogHero;
