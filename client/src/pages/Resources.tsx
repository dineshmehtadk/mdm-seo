import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ResourceCard from "@/components/common/ResourceCard";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Blog",
      description: "Insights, trends, and best practices in mobile device management and security.",
      imageSrc: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      imageAlt: "Blog",
      linkText: "Explore articles",
      href: "/blog"
    },
    {
      title: "Case Studies",
      description: "Real-world implementation stories and success metrics from our customers.",
      imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      imageAlt: "Case Studies",
      linkText: "View success stories",
      href: "/case-studies"
    },
    {
      title: "Whitepapers",
      description: "In-depth technical resources and research on mobile security topics.",
      imageSrc: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      imageAlt: "Whitepapers",
      linkText: "Download resources",
      href: "/whitepapers"
    },
    {
      title: "OWASP Mobile Top 10",
      description: "Guidance on addressing the most critical mobile app security risks.",
      imageSrc: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      imageAlt: "OWASP Mobile Top 10",
      linkText: "Learn more",
      href: "/owasp-mobile"
    }
  ];

  return (
    <>
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Resources & Insights
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Stay informed with the latest in mobile security and device management.
              Explore our collection of blogs, case studies, whitepapers, and security resources.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {resourceCategories.map((category, index) => (
              <ResourceCard
                key={index}
                title={category.title}
                description={category.description}
                imageSrc={category.imageSrc}
                imageAlt={category.imageAlt}
                linkText={category.linkText}
                href={category.href}
              />
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-800">
              Need more personalized assistance?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
              Our team of MDM experts is ready to help with your specific needs and questions.
              Reach out for a personalized consultation or to request custom resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contact">
                  Contact Our Team
                </Link>
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
                <Link href="/pricing">
                  View Pricing Plans
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Get the latest MDM insights, security updates, and industry news delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-neutral-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
