import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import slide1  from "../../assets/ClinetImages/clients.png";
import slide2  from "../../assets/ClinetImages/clients-5.png";
import slide3  from "../../assets/ClinetImages/clients-1.png";
import slide4  from "../../assets/ClinetImages/clients-2.png";
import slide5  from "../../assets/ClinetImages/clients-3.png";
import slide6  from "../../assets/ClinetImages/clients-4.png";
import slide7  from "../../assets/ClinetImages/clients-6.png";
import slide8 from "../../assets/ClinetImages/clients-7.png";
import slide9 from "../../assets/ClinetImages/clients-8.png";
import slide10 from "../../assets/ClinetImages/clients-9.png";
import slide11 from "../../assets/ClinetImages/clients-10.png"
import slide12 from "../../assets/ic_teceze.png";
import slide13 from "../../assets/ic_wesee.png";
import slide14 from "../../assets/mrotek.png";
import slide15 from "../../assets/ncat.png"
import Autoplay from "embla-carousel-autoplay";

const ClientsBanner = () => {
  

  const images = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
   slide10,
   slide11,
  // slide12,
  // slide13,
  // slide14,
  // slide15
]

  

 return (
    // <section className="py-8 bg-neutral-50 border-y border-neutral-100">
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    //     <p className="text-center text-neutral-500 mb-6 text-sm font-medium">
    //       TRUSTED BY LEADING COMPANIES
    //     </p>

    //     <div>
    //       <Carousel
    //         opts={{
    //           loop: true,
    //           align: "start",
    //           slidesToScroll: 1,
    //         }}
    //         plugins={[
    //           Autoplay({
    //             delay: 2000, // <-- slide every 2 seconds
    //             stopOnInteraction: false, // keep sliding even on hover/click
    //           }),
    //         ]}
    //         className="w-full  "
    //       >
    //         <CarouselContent>
    //           {images.map((src, index) => (
    //             <CarouselItem
    //               key={index}
    //               className="basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/6"
    //             >
    //               <img
    //                 src={src}
    //                 alt={`Client ${index + 1}`}
    //                 className="w-full h-28 object-contain p-4 opacity-70"
    //               />
    //             </CarouselItem>
    //           ))}
    //         </CarouselContent>

    //         {/* No Previous/Next buttons */}
    //       </Carousel>
    //     </div>
    //   </div>
    // </section>
    <section className="py-8 bg-neutral-50 border-y border-neutral-100">
  <div className=" ">
    <p className="text-center text-neutral-500 mb-6 text-sm font-medium">
      TRUSTED BY LEADING COMPANIES
    </p>

    <div className="overflow-hidden relative">
      <div className="flex animate-scroll whitespace-nowrap gap-8">
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Client ${i + 1}`}
            className="h-28 w-auto object-contain "
          />
        ))}
      </div>
    </div>
  </div>
</section>

  );
};

export default ClientsBanner;



