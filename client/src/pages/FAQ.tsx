import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

const faqCategories = [
  { name: "General", icon: "🔍", id: "general" },
  { name: "Features", icon: "⚙️", id: "features" },
  { name: "Security", icon: "🔒", id: "security" },
  { name: "Pricing", icon: "💰", id: "pricing" },
  { name: "Implementation", icon: "🚀", id: "implementation" },
  { name: "Support", icon: "🛟", id: "support" }
];

const FAQ = () => {
  return (
    <>
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Find answers to common questions about our MDM solution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-neutral-800">Categories</h2>
                <div className="space-y-2">
                  {faqCategories.map((category) => (
                    <a 
                      key={category.id}
                      href={`#${category.id}`}
                      className="flex items-center p-3 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-primary"
                    >
                      <span className="mr-2 text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </a>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
                  <h3 className="font-semibold text-neutral-800 mb-3">Can't find what you're looking for?</h3>
                  <p className="text-neutral-600 text-sm mb-4">Our support team is here to help with any questions you may have.</p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {faqCategories.map((category) => (
                <div key={category.id} id={category.id} className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-neutral-800 flex items-center">
                    <span className="mr-2 text-2xl">{category.icon}</span>
                    {category.name} Questions
                  </h2>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs
                      .filter(faq => faq.category === category.id)
                      .map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${category.id}-item-${index}`}
                          className="border border-neutral-200 rounded-lg"
                          itemScope 
                          itemProp="mainEntity" 
                          itemType="https://schema.org/Question"
                        >
                          <AccordionTrigger className="px-5 py-4 text-left font-medium text-neutral-800 hover:no-underline hover:text-primary" itemProp="name">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-5 pb-4 pt-0 text-neutral-600" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                            <div itemProp="text">
                              <p>{faq.answer}</p>
                              {faq.link && (
                                <div className="mt-2">
                                  <Link href={faq.link.url} className="text-primary hover:underline">
                                    {faq.link.text}
                                  </Link>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800">
            Still have questions?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Our team is ready to answer any questions you may have about our MDM solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
