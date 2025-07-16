import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/common/FeatureCard";
import { 
  LockKeyhole, 
  FolderLock, 
  TowerControl, 
  AppWindow, 
  Smartphone, 
  LayoutDashboard,
  Shield,
  UserCheck,
  BellRing,
  Map,
  FlaskConical,
  BarChart3
} from "lucide-react";

const Features = () => {
  const features = [
    {
      id: "data-encryption",
      icon: <LockKeyhole />,
      title: "Data Encryption",
      description: "End-to-end encryption for all corporate employee devices, ensuring information remains protected."
    },
    {
      id: "work-profile",
      icon: <FolderLock />,
      title: "Work Profile Container",
      description: "Separate work and personal data with secure containerization, providing privacy for BYOD scenarios."
    },
    {
      id: "remote-lock",
      icon: <TowerControl />,
      title: "Remote Lock & Wipe",
      description: "Instantly lock or wipe lost/stolen devices to prevent unauthorized access to company data."
    },
    {
      id: "app-management",
      icon: <AppWindow />,
      title: "App Management",
      description: "Deploy, update, and remove applications remotely across your entire device fleet from a central console."
    },
    {
      id: "kiosk-mode",
      icon: <Smartphone />,
      title: "Kiosk Mode",
      description: "Lock devices to specific applications for customer-facing or special-purpose deployments."
    },
    {
      id: "unified-dashboard",
      icon: <LayoutDashboard />,
      title: "Unified Dashboard",
      description: "Manage all devices from a single, intuitive dashboard with real-time compliance monitoring."
    },
    {
      id: "compliance-management",
      icon: <Shield />,
      title: "Compliance Management",
      description: "Enforce security policies and ensure devices meet organizational compliance requirements."
    },
    {
      id: "identity-management",
      icon: <UserCheck />,
      title: "Identity Management",
      description: "Integrate with your existing identity providers for seamless authentication and authorization."
    },
    {
      id: "real-time-alerts",
      icon: <BellRing />,
      title: "Real-time Alerts",
      description: "Get instant notifications about security incidents, policy violations, and other critical events."
    },
    {
      id: "geo-fencing",
      icon: <Map />,
      title: "Geo-fencing",
      description: "Create virtual boundaries to trigger actions when devices enter or exit specific locations."
    },
    {
      id: "security-testing",
      icon: <FlaskConical />,
      title: "Security Testing",
      description: "Automated vulnerability scanning and security assessment for all managed devices."
    },
    {
      id: "analytics-reporting",
      icon: <BarChart3 />,
      title: "Analytics & Reporting",
      description: "Comprehensive reporting and analytics to track device usage, compliance, and security metrics."
    }
  ];

  return (
    <>
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Comprehensive MDM Features
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Our enterprise-grade MDM solution offers a full suite of features to help you manage, secure, and optimize your mobile device fleet.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {features.map((feature) => (
  <Link href={`/features#${feature.id}`} key={feature.id}>
    <div id={feature.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <FeatureCard
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    </div>
  </Link>
))}

          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-neutral-600 mb-6">
              Want to see how our MDM solution can help your organization?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com/mobiheal-demo/booking" target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                Request a Demo
              </Button>
              </a>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
