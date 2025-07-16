import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { caseStudies } from "@/lib/data";

const categories = [
  { label: "All Industries", value: "all" },
  { label: "Retail", value: "retail" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Enterprise", value: "enterprise" },
];

const CaseStudies = () => {
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
      setLocation("/case-studies");
    } else {
      setLocation(`/case-studies/category/${value}`);
    }
  };

  const getStudies = (category: string) => {
    return category === "all"
      ? caseStudies
      : caseStudies.filter((study) => study.category.toLowerCase() === category);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Customer Success Stories
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Real-world implementation stories and success metrics from our customers across industries.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={tabValue} onValueChange={handleTabChange}>
            <TabsList className="flex flex-wrap gap-2 mb-16 sm:mb-14 md:mb-10">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(({ value }) => (
              <TabsContent key={value} value={value}>
                <div className="space-y-16">
                  {getStudies(value).map((study, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <div
                            className="h-full min-h-[250px]"
                            style={{
                              backgroundImage: `url('${study.imageSrc}')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        </div>
                        <div className="md:w-2/3 p-8">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {study.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-2xl font-bold mb-4 text-neutral-800 hover:text-primary">
                            {study.title}
                          </h2>
                          <p className="text-neutral-600 mb-6">{study.summary}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {study.results.map((result, resultIndex) => (
                              <div
                                key={resultIndex}
                                className="bg-neutral-50 p-4 rounded-lg"
                              >
                                <div className="text-primary font-bold text-2xl">
                                  {result.stat}
                                </div>
                                <div className="text-neutral-600 text-sm">
                                  {result.label}
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button asChild>
                            <Link href={`/case-studies/${study.slug}`}>
                              Read Full Case Study
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getStudies(value).length === 0 && (
                    <p className="text-center text-neutral-500">No case studies found.</p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800">
            Ready to become our next success story?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Our team of MDM experts can help you achieve your mobile device management goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              asChild
            >
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
