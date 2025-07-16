interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  position,
  rating,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-200 flex flex-col justify-between h-full">
      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="text-amber-500 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={i < rating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="mb-6 flex-1">
        <p className="text-neutral-600 italic text-base leading-relaxed">
          “{quote}”
        </p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center  mt-auto">
        <div className="rounded-full bg-neutral-200 w-10 h-10 flex items-center justify-center mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-600"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-neutral-800">{author}</p>
          <p className="text-sm text-neutral-500">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
