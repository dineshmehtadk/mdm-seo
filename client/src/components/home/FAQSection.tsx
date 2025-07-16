import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is MobiHeal MDM compliant with industry regulations?",
      answer: "Yes, MobiHeal MDM is designed to help organization maintain compliance with major regulations including DPDP 2023. We provide compliance reports, and security controls that align with industry standards and best practices."
    },
    {
      question: "How does MobiHeal MDM prevent data leakage?",
      answer: "MobiHeal MDM implements comprehensive data loss prevention (DLP) measures including app blacklisting/whitelisting, clipboard controls, file sharing restrictions, screenshot prevention and containerization of corporate data. These controls prevent sensitive information from being shared outside approved channels."
    },
    {
      question: "How is MobiHeal MDM priced?",
      answer: "MobiHeal MDM is priced per device per month, with different tiers based on the features you need. Our Essential Plan is priced at ₹99/device/month, and Professional at ₹149/device/month. We offer discounts for volume licensing."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial that includes full access to all features. You can manage up to 2 devices during the trial period with no credit card required. Our team provides support throughout the trial to help you evaluate the solution properly."
    },
    {
      question: "Can MobiHeal MDM integrate with our existing systems?",
      answer: "Yes, MobiHeal MDM offers integration capabilities with enterprise systems like Microsoft 365 for implementing conditional email access."
    },
     {
      question: "What support options are available?",
      answer: "Support options vary by plan. Essential plans include email and phone support during business hours.  Professional plans include extended priority support with dedicated account management. All customers have access to our knowledge base and regular webinars."
    },
    {
      question: "What is your uptime guarantee?",
      answer: "MobiHeal MDM guarantees 99.9% uptime for our cloud services. For organizations with stringent uptime requirements, our Professional plan includes enhanced SLAs with up to 99.99% guaranteed uptime."
    }
    
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Frequently Asked Questions</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Find answers to common questions about our MDM solution.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-neutral-200 rounded-lg"
                itemscope 
                itemprop="mainEntity" 
                itemtype="https://schema.org/Question"
              >
                <AccordionTrigger className="px-5 py-4 text-left font-medium text-neutral-800 hover:no-underline hover:text-primary" itemprop="name">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 pt-0 text-neutral-600" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                  <div itemprop="text">
                    <p>{faq.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <Link href="/faq" className="inline-flex items-center text-primary hover:text-primary-dark font-medium">
              View all FAQs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
