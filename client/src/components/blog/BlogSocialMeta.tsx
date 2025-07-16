import { Blog } from "../../types/blog";
import { FaFacebook, FaTwitter, FaLinkedin, FaLink, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

const BlogSocialMeta = ({ blog }: { blog: Blog }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${blog.title} ${currentUrl}`)}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <aside className="sticky top-12 space-y-8">
      <div className="bg-white rounded-2xl px-6 pt-8  shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">Share this article</h3>
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-3 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors"
          >
            <FaFacebook className="text-xl" />
            <span>Share on Facebook</span>
          </button>
          <button 
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-3 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors"
          >
            <FaTwitter className="text-xl" />
            <span>Share on Twitter</span>
          </button>
          <button 
            onClick={() => handleShare('linkedin')}
            className="flex items-center gap-3 px-4 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-colors"
          >
            <FaLinkedin className="text-xl" />
            <span>Share on LinkedIn</span>
          </button>
          <button 
            onClick={() => handleShare('whatsapp')}
            className="flex items-center gap-3 px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#25D366]/90 transition-colors"
          >
            <FaWhatsapp className="text-xl" />
            <span>Share on WhatsApp</span>
          </button>
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaLink className="text-xl" />
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl px-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">Article Info</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Published</p>
            <p className="text-gray-900">{blog.publishedAt}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Reading Time</p>
            <p className="text-gray-900">{blog.readTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Author</p>
            <p className="text-gray-900">{blog.author}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogSocialMeta;
