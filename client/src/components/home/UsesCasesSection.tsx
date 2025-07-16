import { useState } from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon } from "lucide-react";
import  byod from "@/assets/useCases/kiosk_mode_720.jpg";
import corporate from "@/assets/useCases/kiosk_mode_720.jpg";
import kisok from "@/assets/useCases/kiosk_mode_720.jpg";

const UseCasesSection = () => {
  const [activeTab, setActiveTab] = useState("kiosk");

  const useCases = {
    kiosk: {
      title: "Kiosk Mode Management",
      description: "Transform standard devices into dedicated-purpose terminals with our advanced kiosk mode. Perfect for customer-facing applications in retail, hospitality, healthcare, and financial services.",
      features: [
        "Single or multi-app configurations for different use cases",
        "Custom branding and UI restriction options",
        "Remote troubleshooting and device maintenance",
        "Scheduled content updates and device reboots"
      ],
      image: kisok,
      link: "/use-cases#kiosk"
    },
    corporate: {
      title: "Corporate-Owned Device Management",
      description: "Take complete control of company-owned devices with full management capabilities for maximum security and productivity.",
      features: [
        "Zero-touch enrollment for faster deployment",
        "Comprehensive policy enforcement and compliance",
        "Advanced security controls and monitoring",
        "Complete device lifecycle management"
      ],
      image: corporate,
      link: "/use-cases#corporate"
    },
    byod: {
      title: "Bring Your Own Device (BYOD)",
      description: "Enable secure use of personal devices in the workplace with our privacy-focused work profile solution.",
      features: [
        "Separate work and personal data with containerization",
        "Protect employee privacy while securing corporate data",
        "Selective remote wipe options for work data only",
        "Simple enrollment process via QR code or email"
      ],
      image: byod,
      link: "/use-cases#byod"
    }
  };

  const activeCase = useCases[activeTab as keyof typeof useCases];

  return (
    <section id="usecases" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Tailored for Your Business Needs</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
MobiHeal MDM solution adapts to multiple deployment scenarios across various industries.
          </p>
        </div>

        <Tabs defaultValue="kiosk" className="w-full" onValueChange={setActiveTab}>
          <div className="mb-8 flex justify-center">
            <TabsList className="bg-neutral-100">
              <TabsTrigger value="kiosk">Kiosk Mode</TabsTrigger>
              <TabsTrigger value="corporate">Corporate-Owned</TabsTrigger>
              <TabsTrigger value="byod">BYOD</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0 animate-fade-in transition-opacity duration-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-neutral-800">{activeCase.title}</h3>
                <p className="text-neutral-600 mb-6">
                  {activeCase.description}
                </p>
                <ul className="space-y-3">
                  {activeCase.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="text-green-500 mt-1 mr-2 h-4 w-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href={activeCase.link} className="inline-flex items-center text-primary hover:text-primary-dark font-medium">
                    Learn more about {activeCase.title}
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
              <div className="md:w-1/2">
                <div
                  className="rounded-lg shadow-lg overflow-hidden"
                  style={{
                    height: "450px",
                    backgroundImage: `url('${activeCase.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UseCasesSection;
