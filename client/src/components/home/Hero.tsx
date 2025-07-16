

import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import heroAnimation from "../../assets/Animation .json"; // Your downloaded Lottie JSON
import { navigate } from "wouter/use-browser-location";
import hero from "@/assets/hero.png"

const Hero = () => {
  return (
    <section className="relative overflow-hidden text-white py-16 md:py-24 bg-gradient">
      {/* Optional dark overlay for contrast */}
      {/* <div className="absolute inset-0 bg-black/30 z-0" /> */}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Enterprise Mobile Device Management for Modern Businesses
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
             Secure, manage, and monitor your corporate and BYO devices to protect enterprise data while enhancing productivity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button   size="lg" className="bg-white text-primary hover:bg-neutral-100"
              onClick={()=>navigate("/contact")}
              >
                Get Started
              </Button>
              <a href="https://calendly.com/mobiheal-demo/booking" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Book Demo
              </Button>
              </a>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="md:w-1/2 flex justify-center items-center">
            {/* <Lottie animationData={heroAnimation} loop={true} className="w-full max-w-md md:max-w-lg h-auto" /> */}
            <img src={hero} alt="Hero" className="w-full max-w-md md:max-w-lg " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
