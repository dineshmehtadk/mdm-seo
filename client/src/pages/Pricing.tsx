import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, HelpCircleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sub } from "date-fns";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  // const pricingPlans = [
  //   {
  //     title: "Basic",
  //     description: "For small teams and startups",
  //     monthlyPrice: "$4",
  //     annualPrice: "$3.50",
  //     ctaText: "Get Started",
  //     ctaLink: "/contact",
  //     popular: false,
  //     features: [
  //       { name: "Up to 100 devices", included: true },
  //       { name: "Basic app management", included: true, tooltip: "Deploy, update, and remove company approved apps" },
  //       { name: "Remote lock & wipe", included: true },
  //       { name: "Email support", included: true },
  //       { name: "Basic security policies", included: true },
  //       { name: "Kiosk mode", included: false },
  //       { name: "Advanced security controls", included: false },
  //       { name: "24/7 priority support", included: false },
  //       { name: "API access", included: false },
  //       { name: "Custom integrations", included: false }
  //     ]
  //   },
  //   {
  //     title: "Essential",
  //     description: "For growing businesses",
  //     monthlyPrice: "$8",
  //     annualPrice: "$7",
  //     ctaText: "Get Started",
  //     ctaLink: "/contact",
  //     popular: true,
  //     features: [
  //       { name: "Up to 500 devices", included: true },
  //       { name: "Advanced app management", included: true, tooltip: "App whitelist/blacklist, selective permissions, version control" },
  //       { name: "Remote lock & wipe", included: true },
  //       { name: "Email & phone support", included: true },
  //       { name: "Enhanced security policies", included: true },
  //       { name: "Kiosk mode", included: true },
  //       { name: "Basic security controls", included: true },
  //       { name: "Extended business hours support", included: true },
  //       { name: "Basic API access", included: true },
  //       { name: "Custom integrations", included: false }
  //     ]
  //   },
  //   {
  //     title: "Professional",
  //     description: "For enterprises & large teams",
  //     monthlyPrice: "$12",
  //     annualPrice: "$10",
  //     ctaText: "Contact Sales",
  //     ctaLink: "/contact",
  //     popular: false,
  //     features: [
  //       { name: "Unlimited devices", included: true },
  //       { name: "Complete app management", included: true, tooltip: "Advanced app configuration, enterprise app store, automated deployment" },
  //       { name: "Advanced remote control", included: true, tooltip: "Remote view, assist, and troubleshoot devices in real-time" },
  //       { name: "24/7 priority support", included: true },
  //       { name: "Custom security policies", included: true },
  //       { name: "Custom kiosk configurations", included: true },
  //       { name: "Advanced security controls", included: true },
  //       { name: "Dedicated account manager", included: true },
  //       { name: "Full API access", included: true },
  //       { name: "Custom integrations", included: true }
  //     ]
  //   }
  // ];

  const pricingPlans = [
  {
    title: "Basic",
    description: "(MDM & MAM)",
    subDescription: "All MDM features for two devices",
    monthlyPrice: "Free",
    annualPrice: "Free",
    ctaText: "Get Started",
    ctaLink: "/contact",
    popular: false,
    trial: "For 14 days",
    features: [
      { name: "Android Enterprise", included: true },
      { name: "Application Management", included: true },
      { name: "Permission Management", included: true },
      { name: "Managed Configuration", included: true },
      { name: "Kiosk Mode", included: true },
      { name: "Bring Your Own Device (BYOD)", included: true },
      { name: "Remote Lock & Wipe", included: true },
      { name: "Audit Logs", included: true },
      { name: "Two Devices", included: true }
    ]
  },
  {
    title: "Essential",
    description: "(MDM & MAM)",
    subDescription: "All MDM features for unlimited devices",
    monthlyPrice: "₹99 ",
    annualPrice: "Billed Annually + 18% GST",
    ctaText: "Get Started",
    ctaLink: "/contact",
    popular: true,
    features: [
      { name: "Android Enterprise", included: true },
      { name: "Application Management", included: true },
      { name: "Permission Management", included: true },
      { name: "Managed Configuration", included: true },
      { name: "Kiosk Mode", included: true },
      { name: "Bring Your Own Device (BYOD)", included: true },
      { name: "Remote Lock & Wipe", included: true },
      { name: "Audit Logs", included: true },
      { name: "Unlimited Devices", included: true }
    ]
  },
  {
    title: "Professional",
    description: "(MDM & MAM)",
    subDescription: "Essential Plan + advanced controls",
    monthlyPrice: "₹149 ",
    annualPrice: "Billed Annually + 18% GST",
    ctaText: "Contact Sales",
    ctaLink: "/contact",
    popular: false,
    features: [
      { name: "Android Enterprise", included: true },
      { name: "Application Management", included: true },
      { name: "Permission Management", included: true },
      { name: "Managed Configuration", included: true },
      { name: "Kiosk Mode", included: true },
      { name: "Bring Your Own Device (BYOD)", included: true },
      { name: "Remote Lock & Wipe", included: true },
      { name: "Audit Logs", included: true },
      { name: "Notifications", included: true },
      { name: "Geo Location", included: true },
      { name: "Geo Fencing", included: true },
      { name: "Unlimited Devices", included: true },
      { name: "Customer Support", included: true }
    ]
  }
];


  const faqItems = [
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial for our Basic and Essential plans. For the Professional plan, we provide a personalized demo with a trial period tailored to your organization's needs."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can upgrade your plan at any time. The new pricing will be prorated for the remainder of your billing cycle. Downgrades will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a minimum contract length?",
      answer: "Monthly plans have no minimum contract length. Annual plans require a 12-month commitment but offer significant savings."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay via invoice with net-30 terms."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees. The price you see is the price you pay. All features listed in each plan are included at no additional cost."
    }
  ];

  return (
    <>
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Choose the plan that fits your organization's needs with our straightforward pricing structure.
            </p>
            <div className="inline-flex items-center p-1 bg-primary-dark/30 rounded-lg">
              <button
                className={`px-4 py-2 rounded-md text-sm ${
                  billingCycle === "monthly" ? "bg-white text-primary" : "text-white"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly Billing
              </button>
              {/* <button
                className={`px-4 py-2 rounded-md text-sm ${
                  billingCycle === "annually" ? "bg-white text-primary" : "text-white"
                }`}
                onClick={() => setBillingCycle("annually")}
              >
                Annual Billing <span className="text-xs opacity-75">(Save ~15%)</span>
              </button> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="lg:w-1/3 relative">
                {/* <div className={`h-full bg-white border ${plan.popular ? 'border-primary' : 'border-neutral-200'} rounded-xl ${plan.popular ? 'shadow-md hover:shadow-lg' : 'shadow-sm hover:shadow-md'} transition-shadow`}> */}
                 <div className={`group h-full bg-white border rounded-xl transition-shadow ${plan.popular ? 'border-primary shadow-md hover:shadow-lg scale-105' : 'border-neutral-200 hover:border-primary shadow-sm hover:shadow-md  scale-95'}`}>

                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium inline-block">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="p-6 border-b border-neutral-100">
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">{plan.title}</h3>
                    <p className="text-neutral-600 mb-4">{plan.description}</p>
                    {plan.subDescription && (
                      <p className="text-sm text-neutral-500 mb-4">{plan.subDescription}</p>
                    )}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                       <div className="text-2xl font-bold text-neutral-800">
    {plan.title === "Basic" ? "Free" : plan.monthlyPrice}
  </div>
  <div className="text-md font-bold text-neutral-700 mt-1">
    / Device / Month
  </div>
                    </div>
 
  {plan.title !== "Basic" ? (
    <div className="text-md text-neutral-500 font-bold mt-1">
      Billed Annually + 18% GST
    </div>
  ) : (
    <div className="text-md text-neutral-500 font-bold mt-1">
      For 14 Days
    </div>
  )}
</div>


                    <Button 
                      variant={plan.popular ? "default" : "outline"} 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary-dark text-white' : 'text-primary hover:bg-primary hover:text-white'}  hover:scale-95 transition-transform duration-300 ease-in-out`}
                    >
                      <a href={plan.ctaLink}>{plan.ctaText}</a>
                    </Button>
                  </div>
                  <div className="p-6">
                    <h4 className="font-medium text-sm text-neutral-500 uppercase tracking-wider mb-4">Features include:</h4>
                    <ul className="space-y-3">
                      <TooltipProvider>
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            {feature.included ? (
                              <CheckIcon className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                            ) : (
                              <div className="text-neutral-300 mt-1 mr-2 h-4 w-4 flex-shrink-0">—</div>
                            )}
                            <span className={feature.included ? "" : "text-neutral-400"}>
                              {feature.name}
                              {feature.tooltip && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircleIcon className="inline-block ml-1 h-3 w-3 text-neutral-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-60">{feature.tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </span>
                          </li>
                        ))}
                      </TooltipProvider>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-neutral-600 mb-4">Need a custom plan for your organization?</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white hover:scale-95 transition-transform duration-300 ease-in-out">
              <a href="/contact">Contact our Sales Team</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-neutral-800 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">{item.question}</h3>
                <p className="text-neutral-600">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">Have more questions about our pricing?</p>
            <Button asChild
            className="hover:scale-95 transition-transform duration-300 ease-in-out"
            >
              <a href="/contact">Contact Our Sales Team</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
