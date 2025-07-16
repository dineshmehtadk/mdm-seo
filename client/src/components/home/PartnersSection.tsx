import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/common/TestimonialCard";
import slide1  from "../../assets/ClinetImages/clients-3.png";
import slide2  from "../../assets/ClinetImages/clients-1.png";
// import slide3  from "../../assets/ClinetImages/clients-10.png";
import slide4  from "../../assets/ClinetImages/clients-2.png";
import slide5  from "../../assets/ClinetImages/clients-4.png";
import slide6  from "../../assets/ClinetImages/clients-5.png";
import slide7  from "../../assets/ClinetImages/clients-6.png";
import slide8 from "../../assets/ClinetImages/clients-7.png";
import slide9 from "../../assets/ClinetImages/clients-8.png";
import slide10 from "../../assets/partnerImages/partner1.png";
import slide11 from "../../assets/partnerImages/partner2.png"
import slide12 from "../../assets/partnerImages/partner3.png";
import slide13 from "../../assets/partnerImages/partner4.png";
import slide14 from "../../assets/partnerImages/partner5.png";
import slide15 from "../../assets/partnerImages/partner6.png"
import slide16 from "../../assets/partnerImages/partner7.jpg"
import slide17 from "../../assets/partnerImages/partner7.jpg"
const PartnersSection = () => {
  const clients = [
    { id: 1, name: "Air India", logo: slide1 },
    { id: 2, name: "Chemtronics", logo: slide2 },
   // { id: 3, name: "Frux", logo: slide3 },
    { id: 4, name: "Invia", logo: slide4 },
    { id: 5, name: "ITI", logo: slide5 },
    { id: 6, name: "Navitus", logo: slide6 },
     { id: 7, name: "Sakham", logo: slide7 },
    { id: 8, name: "Adriod", logo: slide8 },
    { id: 9, name: "Sapours", logo: slide9 },
    { id: 10, name: "TabSchool", logo: slide10 },
    { id: 11, name: "TCIL", logo: slide11 },
    { id: 12, name: "Teceze", logo: slide12 },
    { id: 13, name: "WeSee", logo: slide13 },
    { id: 14, name: "Mrotek", logo: slide14 },
    { id: 15, name: "NCAT", logo: slide15 },
     { id: 16, name: "IKALL", logo: slide16 },
    // { id: 16, name: "Cybermantra", logo: slide16 },
    { id: 17, name: "Cybernet", logo: slide17 },
  ];



  const testimonials = [
    {
      quote: " We can now fully utilize eLearning potential by issuing mobile tabs to our students permanently, without any worry or hesitation of misuse. Kudos to MobiHEAL MDM for allowing us total control and visibility into students' tabs!         ",
      author: "Secretary CHMES",
      position: "CHMES",
      rating: 5
    },
    {
      quote: " MobiHEAL MDM has been instrumental in safely implementing our assistive technology initiative for use of mobile devices by visually challenged people.Heartfelt thanks to Mobisec for providing tech help for achieving our vision.",
      author: "General Manager",
      position: "Saksham NGO",
      rating: 5
    },
    {
      quote: "MobiHEAL MDM has been instrumental in managing & monitoring mobile devices for disability rehabilitation. Thanks to Mobisec, we can safely extend mobile device-based assistive tech to our beneficiaries, overcoming challenges effectively.",
      author: "NCAHT",
      position: "An AIIMS Initiative",
      rating: 4.5
    }
  ];

  return (
    <section id="partners" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Our Partners & Clients</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Trusted by leading organizations across industries.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-center p-4 ">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className=" object-contain border border-none h-32"
                />
              ) : (
                <span className="text-neutral-500 ">{client.name}</span>
              )}
            
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <h3 className="text-2xl font-bold mb-8 text-neutral-800">What Our Clients Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              rating={testimonial.rating}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:scale-95 transition-transform duration-200" asChild>
            <Link href="/testimonials">View all Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
