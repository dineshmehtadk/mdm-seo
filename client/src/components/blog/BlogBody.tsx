import { FaRegCheckCircle } from "react-icons/fa";
import {
  FaArrowRight,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { Blog } from "../../types/blog";

const BlogBody = ({ blog }: { blog: Blog }) => (
  <motion.article
    className="max-w-3xl mx-auto px-4 text-gray-800"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {/* Introduction */}
    <p className="text-xl text-gray-700 font-light leading-relaxed mt-10 mb-6">
      {blog.introduction}
    </p>

    {/* Feature Image */}
    <img
      src={blog.featureImage}
      alt="Feature"
      className="rounded-3xl w-full object-cover shadow-xl my-8"
    />

    {/* Sections */}
    {blog.sections.map((sec, i) => (
      <section key={i} className="mb-14">
        <h2 className="text-3xl font-bold text-gray-900 mb-5 border-l-8 pl-4 border-blue-500">
          {sec.heading}
        </h2>

        {/* Paragraphs */}
        {sec.content?.map((para, j) => (
          <p
            key={j}
            className="text-base md:text-lg text-gray-700 leading-relaxed mb-3"
          >
            {para}
          </p>
        ))}

        {/* List Items */}
        {Array.isArray(sec.listItems) && sec.listItems?.length > 0 && (
          <ul className="mt-4 space-y-3">
            {sec.listItems.map((item, k) => (
              <li
                key={k}
                className="flex items-start text-gray-800 text-base gap-3 group"
              >
                <FaRegCheckCircle
                  className="text-green-600 mt-1 flex-shrink-0 group-hover:scale-110 transition"
                  size={20}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Subsections */}
        {sec.subsections?.map((sub, sIdx) => (
          <div
            key={sIdx}
            className="bg-gradient-to-tr from-gray-50 to-white  rounded-xl p-5 mt-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-primary mb-3">
              {sub.subheading}
            </h3>

            {sub.content.map((para, pIdx) => (
              <p
                key={pIdx}
                className="text-base text-gray-700 leading-relaxed mb-2"
              >
                {para}
              </p>
            ))}

            {Array.isArray(sub.listItems) && sub.listItems?.length > 0 && (
              <ul className="mt-2 space-y-2">
                {sub.listItems.map((item, lIdx) => (
                  <li
                    key={lIdx}
                    className="flex items-start text-gray-800 text-base gap-3 group"
                  >
                    <FaRegCheckCircle
                      className="text-green-600 mt-1 flex-shrink-0 group-hover:scale-110 transition"
                      size={20}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {sub.note && (
              <p className="text-sm italic text-gray-500 mt-3">{sub.note}</p>
            )}
          </div>
        ))}
      </section>
    ))}

    {/* Conclusion */}
    {blog.conclusion && (
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-5">Conclusion</h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
          {blog.conclusion.content}
        </p>

        {/* CTA Box */}
        {blog.conclusion.cta && (
          <div className="bg-gradient text-white rounded-2xl px-6 py-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">
              {blog.conclusion.cta.title}
            </h3>
            <p className="text-blue-100 mb-5 text-base md:text-lg">
              {blog.conclusion.cta.description}
            </p>
            <a
              href="https://calendly.com/mobiheal-demo/booking/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-blue-100 transition"
            >
              {blog.conclusion.cta.buttonText}
              <FaArrowRight />
            </a>
          </div>
        )}
      </section>
    )}

    {/* Social Share */}
    <div className="border-t pt-6 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-500">Share this article:</p>
      <div className="flex gap-4">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition"
        >
          <FaLinkedinIn size={20} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            window.location.href
          )}&text=${encodeURIComponent(blog.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-sky-500 transition"
        >
          <FaXTwitter size={20} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-700 transition"
        >
          <FaFacebookF size={20} />
        </a>
      </div>
    </div>
  </motion.article>
);

export default BlogBody;
