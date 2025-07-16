import { Button } from "@/components/ui/button";
import { navigate } from "wouter/use-browser-location";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient  text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Mobile Fleet?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Start protecting your corporate data and managing your devices more efficiently today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-neutral-100 hover:scale-95 transition-transform duration-200"
              onClick={() => navigate("/contact")}>
            
              Start Free Trial
            </Button>
           
            <a href="https://calendly.com/mobiheal-demo/booking" target="_blank" rel="noopener noreferrer">
             <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:scale-95 transition-transform duration-200">
              Request Demo
            </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
