import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { partners, clients } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

const Partners = () => {
  const certifications = [
    { name: "ISO 27001: 2022", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
    { name: "ISO 9001:2015", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
    { name: "MSME", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
    { name: "GeM OEM", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
  ];

  return (
    <>
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our Partners & Clients
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Trusted by leading organizations across industries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:pt-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-800 text-center">
              Strategic Partners
            </h2>
            <div className="mb-16 space-y-8">
              {Array.from({ length: Math.ceil(partners.length / 3) }).map((_, rowIndex) => {
                const rowItems = partners.slice(rowIndex * 3, rowIndex * 3 + 3);
                const isIncompleteRow = rowItems.length < 3;

                return (
                  <div
                    key={rowIndex}
                    className={`grid gap-8 ${isIncompleteRow
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-' + rowItems.length + ' justify-center'
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`}
                  >
                    {rowItems.map((partner, index) => (
                      <div
                        key={index}
                        className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-center h-20 mb-6">
                          <img
                            src={partner.imageSrc}
                            alt={partner.name}
                            className="max-h-28 object-contain"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-neutral-800">{partner.name}</h3>
                        <p className="text-neutral-600 mb-4">{partner.description}</p>
                        <div className="flex items-center text-sm text-neutral-500">
                          <span className="mr-2 px-2 py-1 bg-neutral-100 rounded-full">
                            {partner.partnerType}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-800 text-center">
                Featured Clients
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                {clients.map((client, index) => (
                  <div key={index} className="flex items-center justify-center p-6 bg-white">
                    <img
                      src={client.imageSrc}
                      alt={client.name}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="text-center mb-12">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
                  <Link href="/testimonials">
                    View Client Testimonials
                  </Link>
                </Button>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Improved Certifications Section */}

      <section className="py-16 px-4 bg-neutral-50">
        <div className="bg-white rounded-3xl p-10 border border-neutral-200 shadow-md text-center max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-6">
            Industry Certifications & Compliance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-medium px-5 py-3 rounded-xl border border-blue-200 shadow-sm transition-all duration-200 text-sm sm:text-base"
              >
                {cert.icon}
                <span>{cert.name}</span>
              </div>
            ))}
          </div>

          <p className="text-neutral-600 max-w-2xl mx-auto text-base sm:text-lg">
            Our MDM solution adheres to internationally recognized standards,
            ensuring enterprise-grade security and operational excellence.
          </p>
        </div>
      </section>


      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-800">
                  Become a Partner
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Join our partner program to empower your customers with next-gen device management, while ensuring competitive benefits, comprehensive training, and dedicated support for you.
                  For collaboration inquiries, contact us
                </p>
              </div>
              <div className="text-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Apply to Become a Partner</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;