import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/common/FeatureCard";
import { 
  LockKeyhole, 
  FolderLock, 
  TowerControl, 
  AppWindow, 
  Smartphone, 
  LayoutDashboard 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: <LockKeyhole />,
      title: "Data Encryption",
      description: "End-to-end encryption for all corporate data on employee devices, ensuring sensitive information remains protected."
    },
    {
      id: 2,
      icon: <FolderLock />,
      title: "Work Profile Container",
      description: "Separate work and personal data with secure containerization, providing privacy for BYOD scenarios."
    },
    {
      id: 3,
      icon: <TowerControl />,
      title: "Remote Lock & Wipe",
      description: "Instantly lock or wipe lost/stolen devices to prevent unauthorized access to company data."
    },
    {
      id: 4,
      icon: <AppWindow />,
      title: "App Management",
      description: "Deploy, update, and remove applications remotely across your entire device fleet from a central console."
    },
    {
      id: 5,
      icon: <Smartphone />,
      title: "Kiosk Mode",
      description: "Lock devices to specific applications for customer-facing or special-purpose deployments."
    },
    {
      id: 6,
      icon: <LayoutDashboard />,
      title: "Unified Dashboard",
      description: "Manage all devices from a single, intuitive dashboard with real-time monitoring and reporting."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Comprehensive MDM Features</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our enterprise-grade MDM solution offers a full suite of features to help you manage, secure, and optimize your mobile device fleet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/features">
              <span>View All Features</span>
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
                className="ml-2 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
