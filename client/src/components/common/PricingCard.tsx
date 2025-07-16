import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
  features: PricingFeature[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  ctaText,
  ctaLink,
  popular = false,
  features,
}) => {
  return (
    <div className={`bg-white h-full border  border-neutral-200 rounded-xl ${popular ? 'shadow-md hover:shadow-lg border-primary scale-105' : 'shadow-sm hover:shadow-md hover:border-primary scale-95'} transition-shadow relative`}>
      {popular && (
        <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
          <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium inline-block">
            Most Popular
          </span>
        </div>
      )}
      <div className="p-6 border-b border-neutral-100">
        <h3 className="text-xl font-bold text-neutral-800 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
       
        <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                       <div className="text-2xl font-bold text-neutral-800">
    {title === "Basic" ? "Free" : price}
  </div>
  <div className="text-md font-bold text-neutral-700 mt-1">
    / Device / Month
  </div>
                    </div>
 
  {title !== "Basic" ? (
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
          variant={popular ? "default" : "outline"} 
          className={`w-full ${popular ? 'bg-primary hover:bg-primary-dark hover:scale-95 transition-transform duration-200 text-white' : 'text-primary hover:bg-primary hover:text-white hover:scale-95 transition-transform duration-200'}`}
          asChild
        >
          <a href={ctaLink}>{ctaText}</a>
        </Button>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <>
                  <CheckIcon className="text-green-500 mt-1 mr-2 h-4 w-4" />
                  <span>{feature.name}</span>
                </>
              ) : (
                <>
                  <XIcon className="text-neutral-400 mt-1 mr-2 h-4 w-4" />
                  <span className="text-neutral-400">{feature.name}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
