import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import BlogPostCard from "@/components/common/BlogPostCard";
import { blogPosts } from "@/lib/data";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BlogCategories = [
  { name: "All", value: "all" },
  { name: "Mobile Security", value: "mobile-security" },
  { name: "MDM Best Practices", value: "mdm-best-practices" },
  { name: "BYOD", value: "byod" },
  { name: "Compliance", value: "compliance" },
  { name: "Industry Trends", value: "industry-trends" },
];

const Blog = () => {
  const [location, setLocation] = useLocation();
  const [tabValue, setTabValue] = useState("all");

  // Sync tabValue from URL
  useEffect(() => {
    const fromURL = location.split("/")[3]?.toLowerCase() || "all";
    setTabValue(fromURL);
  }, [location]);

  const handleTabChange = (value: string) => {
    setTabValue(value);
    if (value === "all") {
      setLocation("/blog");
    } else {
      setLocation(`/blogs/category/${value}`);
    }
  };

  const getblogs = (category: string) => {
    return category === "all"
      ? blogPosts
      : blogPosts.filter((study) => study.category.toLowerCase() === category);
  };
  return (
    <>
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Mobile Device Management Blog
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Insights, trends, and best practices in mobile device management
              and security.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={tabValue} onValueChange={handleTabChange}>
<TabsList className="flex flex-wrap gap-3 mb-12">
  {BlogCategories.map((cat) => (
    <TabsTrigger
      key={cat.value}
      value={cat.value}
      className="px-4 py-2 rounded-full text-sm 
        bg-neutral-100 text-neutral-700 
        hover:bg-neutral-200 
        data-[state=active]:bg-primary 
        data-[state=active]:text-white 
        transition-colors duration-200"
    >
      {cat.name}
    </TabsTrigger>
  ))}
</TabsList>






            {BlogCategories.map(({ value }) => (
              <TabsContent key={value} value={value}>
                <div className="mb-16 mt-28 sm:mt-6">
                  <h2 className="text-2xl font-bold mb-6 text-neutral-800">
                    Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {getblogs(value)
                      .slice(0, 3)
                      .map((post, index) => (
                        // <BlogPostCard
                        //   key={index}
                        //   title={post.title}
                        //   excerpt={post.excerpt}
                        //   date={post.date}
                        //   imageSrc={post.imageSrc}
                        //   imageAlt={post.imageAlt}
                        //   href={post.href}
                        // />
                        <BlogPostCard
                          key={index}
                          title={post.title}
                          excerpt={post.excerpt}
                          date={post.date}
                          imageSrc={post.imageSrc}
                          imageAlt={post.imageAlt}
                          href={post.href}
                        />
                      ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 text-neutral-800">
                    Latest Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {getblogs(value)
                      .slice(3)
                      .map((post, index) => (
                        <BlogPostCard
                          key={index}
                          title={post.title}
                          excerpt={post.excerpt}
                          date={post.date}
                          imageSrc={post.imageSrc}
                          imageAlt={post.imageAlt}
                          href={post.href}
                        />
                      ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800">
              Subscribe to Our Blog
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Get the latest MDM insights, security updates, and industry news
              delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <Button type="submit">Subscribe</Button>
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

export default Blog;
