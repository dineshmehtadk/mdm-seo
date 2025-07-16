const NewsletterCTA = () => (
  <section className="bg-gradient text-white py-16 px-4 mt-16">
    <div className="max-w-4xl mx-auto text-center">
      <h3 className="text-3xl md:text-4xl font-bold mb-4">
        Stay Updated with Our Latest Insights
      </h3>
      <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
        Join our community of readers and get exclusive content delivered straight to your inbox.
      </p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
        <div className="w-full sm:w-auto flex-grow">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <button 
          className=" w-full sm:w-auto px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Subscribe Now
        </button>
      </form>
      <p className="text-sm text-blue-100 mt-6">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  </section>
);

export default NewsletterCTA;
