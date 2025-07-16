import { Button } from "@/components/ui/button";
import PricingCard from "@/components/common/PricingCard";
import { Link } from "wouter";

const PricingSection = () => {
  // const pricingPlans = [
  //   {
  //     title: "Basic",
  //     description: "For small teams and startups",
  //     price: "$4",
  //     ctaText: "Get Started",
  //     ctaLink: "#",
  //     popular: false,
  //     features: [
  //       { name: "Up to 100 devices", included: true },
  //       { name: "Basic app management", included: true },
  //       { name: "Remote lock & wipe", included: true },
  //       { name: "Email support", included: true },
  //       { name: "Kiosk mode", included: false },
  //       { name: "Advanced security controls", included: false },
  //       { name: "24/7 priority support", included: false }
  //     ]
  //   },
  //   {
  //     title: "Essential",
  //     description: "For growing businesses",
  //     price: "$8",
  //     ctaText: "Get Started",
  //     ctaLink: "#",
  //     popular: true,
  //     features: [
  //       { name: "Up to 500 devices", included: true },
  //       { name: "Advanced app management", included: true },
  //       { name: "Remote lock & wipe", included: true },
  //       { name: "Kiosk mode", included: true },
  //       { name: "Basic security controls", included: true },
  //       { name: "Email & phone support", included: true },
  //       { name: "Advanced analytics", included: false }
  //     ]
  //   },
  //   {
  //     title: "Professional",
  //     description: "For enterprises & large teams",
  //     price: "$12",
  //     ctaText: "Contact Sales",
  //     ctaLink: "#",
  //     popular: false,
  //     features: [
  //       { name: "Unlimited devices", included: true },
  //       { name: "Complete app management", included: true },
  //       { name: "Advanced security controls", included: true },
  //       { name: "Custom kiosk configurations", included: true },
  //       { name: "Advanced analytics & reporting", included: true },
  //       { name: "24/7 priority support", included: true },
  //       { name: "Dedicated account manager", included: true }
  //     ]
  //   }
  // ];
   const pricingPlans = [
  {
    title: "Basic",
    description: "(MDM & MAM)",
    subDescription: "All MDM features for two devices",
    price: "Free",
    //annualPrice: "Free",
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
    price: "₹99 ",
   // annualPrice: "Billed Annually + 18% GST",
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
    price: "₹149 ",
    //annualPrice: "Billed Annually + 18% GST",
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

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Simple, Transparent Pricing</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Choose the plan that fits your organization's needs with our straightforward pricing structure.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="lg:w-1/3">
              <PricingCard
                title={plan.title}
                description={plan.description}
                price={plan.price}
                ctaText={plan.ctaText}
                ctaLink={plan.ctaLink}
                popular={plan.popular}
                features={plan.features}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">Need a custom plan for your organization?</p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:scale-95 transition-transform duration-200" >
            <Link to="/contact" className="flex items-center justify-center">
              Contact our Sales Team
            </Link>
          
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
