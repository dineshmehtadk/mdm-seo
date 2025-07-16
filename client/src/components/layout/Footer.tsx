import { Link } from "wouter";


const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-12">
          {/* Company Info */}
         

            

             <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
            
              
            </div>
            <p className="mb-6">
             Mobisec Technologies Pvt. Ltd. is a mobile security company
                offering products and services for securing mobile computing
                devices such as smartphones and tablets to help enterprises.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/mobisecin"
                className="text-neutral-400 hover:text-white text-xl"
              >
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
                  className="w-5 h-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com/mobisec_/"
                className="text-neutral-400 hover:text-white text-xl"
              >
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
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/mobisec.in"
                className="text-neutral-400 hover:text-white text-xl"
              >
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
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@mobisec4594"
                className="text-neutral-400 hover:text-white text-xl"
              >
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
                  className="w-5 h-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
              <a
              href="https://www.instagram.com/mobisec_"
              >
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
                  className="w-5 h-5 text-neutral-400 hover:text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Solutions</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features#data-encryption"
                  className="hover:text-white"
                >
                  Data Encryption
                </Link>
              </li>
              <li>
                <Link
                  href="/features#work-profile"
                  className="hover:text-white"
                >
                  Work Profile Container
                </Link>
              </li>
              <li>
                <Link
                  href="/features#remote-management"
                  className="hover:text-white"
                >
                  Remote Management
                </Link>
              </li>
              <li>
                <Link href="/features#kiosk-mode" className="hover:text-white">
                  Kiosk Mode
                </Link>
              </li>
              <li>
                <Link
                  href="/features#app-management"
                  className="hover:text-white"
                >
                  App Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white">
                  Partners
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press & Media
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/whitepapers" className="hover:text-white">
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/owasp-mobile" className="hover:text-white">
                  OWASP Mobile Top 10
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>


          {/* <div>
            <h4 className="text-white font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="https://mobiheal.in" className="hover:text-white">
                  mobiHEAL
                </Link>
              </li>
              <li>
                <Link href="https://guard.mobisec.in" className="hover:text-white">
                 mobiGUARD
                </Link>
              </li>
              <li>
                <Link href="https://scan.mobisec.in" className="hover:text-white">
                  mobiSCAN
                </Link>
              </li>
             
            </ul>
          </div> */}
        </div>

        <hr className="border-neutral-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; {new Date().getFullYear()}  Mobisec, Inc. All rights
              reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
           
            <Link href="terms-services" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies-policy" className="hover:text-white">
              Cookie Policy
            </Link>
            <a href="/acceptable-policy" className="hover:text-white">
             Acceptable Use Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
