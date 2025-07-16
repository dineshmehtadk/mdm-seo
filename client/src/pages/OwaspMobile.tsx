import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, CheckIcon, ExternalLinkIcon } from "lucide-react";
import { owaspRisks } from "@/lib/data";

const OwaspMobile = () => {
  return (
    <>
      <section className="bg-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              OWASP Mobile Top 10 Security Risks
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Understanding and addressing the most critical security vulnerabilities in mobile applications.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h2 className="text-xl font-bold mb-2 text-neutral-800">What is the OWASP Mobile Top 10?</h2>
              <p className="text-neutral-600">
               The OWASP Mobile Top 10 Risks is a globally recognized list of critical security vulnerabilities plaguing mobile applications. For enterprises leveraging mobile solutions like MobiHeal MDM, understanding these risks is essential to safeguarding sensitive data and ensuring compliance. This guide explores the 2025 OWASP Mobile Top 10 Risks, their impact, and actionable mitigation strategies.
              </p>
              <div className="mt-4">
                <a 
                  href="https://owasp.org/www-project-mobile-top-10/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  Visit Official OWASP Website
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-neutral-800">The Mobile Top 10 Security Risks</h2>
            
            <div className="space-y-6">
              {owaspRisks.map((risk, index) => (
                <div key={index} className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="flex items-center bg-neutral-50 p-4 border-b border-neutral-200">
                    <span className="bg-primary text-white font-bold text-lg h-8 w-8 rounded-full flex items-center justify-center mr-3">
                      {risk.id}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-800">{risk.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-neutral-600 mb-6">{risk.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="flex items-center font-semibold text-neutral-800 mb-3">
                        <AlertTriangleIcon className="text-red-500 mr-2 h-5 w-5" />
                        Security Implications
                      </h4>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1 pl-4">
                        {risk.implications.map((implication, i) => (
                          <li key={i}>{implication}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center font-semibold text-neutral-800 mb-3">
                        <CheckIcon className="text-green-500 mr-2 h-5 w-5" />
                        Mitigation Strategies
                      </h4>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1 pl-4">
                        {risk.mitigations.map((mitigation, i) => (
                          <li key={i}>{mitigation}</li>
                        ))}
                      </ul>
                    </div>
                    {/* <div className="mt-6">
                      <h4 className=" flex items-center font-semibold text-neutral-800 mb-3 ">Example</h4>
                      <p className="text-neutral-600">{risk.example}</p>

                      </div> */}
                    
                    {/* {risk.relatedResource && (
                      <div className="mt-6 pt-6 border-t border-neutral-100">
                        <a 
                          href={risk.relatedResource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                        >
                          {risk.relatedResource.title}
                          <ExternalLinkIcon className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">How Mobiheal Addresses OWASP Mobile Top 10</h2>
            <p className="text-neutral-600 mb-6">
              Our MDM solution includes comprehensive security features designed to help organizations address these critical mobile security risks:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>End-to-end encryption for all data in transit and at rest</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Adopt Secure Development Lifecycles (SDLC)</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Integrate security testing into DevOps workflows.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Advanced authentication and authorization controls</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Continuous security monitoring and threat detection</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Security policy enforcement across all managed devices</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Regular Penetration Testing</span>
              </li>
               <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Simulate attacks using frameworks like MITRE ATT&CK.</span>
              </li>

                <li className="flex items-start">
                <CheckIcon className="text-green-500 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                <span>Regular Penetration Testing</span>
              </li>
            </ul>

          
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/features">
                  Explore Our Security Features
                </Link>
              </Button>
            </div>

            
          </div>

           <div className="max-w-4xl mx-auto mt-16 bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800 text-center">Conclusion</h2>
            <p className="text-neutral-600 mb-6 text-center">
            The OWASP Mobile Top 10 Risks highlight critical areas where mobile apps are vulnerable. By leveraging MobiHeal MDM, enterprises can automate compliance, enforce encryption, and mitigate these risks effectively
            </p>
            

          
            {/* <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/features">
                 Request a demo
                </Link>
              </Button>
            </div> */}

            
          </div>


        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800">
            Need help securing your mobile device fleet?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Our security experts can help you implement robust mobile security measures to protect your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Security Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
              <Link href="/resources">View More Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default OwaspMobile;
