import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { navigate } from "wouter/use-browser-location";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-3xl text-primary mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="9" r="3" />
                <path d="M12 12v6" />
                <path d="M9.5 9a2.5 2.5 0 0 1 5 0" />
              </svg> */}
              {/* <span className="text-xl font-semibold text-neutral-800">SecureMDM</span> */}
             
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <DesktopNavigation currentPath={location} />
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="font-medium">
              Sign In
            </Button>
<a href="https://calendly.com/mobiheal-demo/booking" target="_blank" rel="noopener noreferrer">
  <Button className="font-medium">
    Request Demo
  </Button>
</a>

          </div>

          {/* Mobile Menu */}
          <MobileNavigation currentPath={location} />
        </div>
      </div>
    </header>
  );
};

interface NavigationProps {
  currentPath: string;
}

const DesktopNavigation = ({ currentPath }: NavigationProps) => {
    return (
    <>
      {/* Features */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer">
          <span>Features</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => navigate("/features#data-encryption")}>
            Data Encryption
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/features#work-profile")}>
            Work Profile Container
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/features#remote-lock")}>
            Remote Lock & Wipe
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/features#app-management")}>
            App Management
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/features")}>
            View All Features
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Use Cases */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer">
          <span>Use Cases</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => navigate("/use-cases#kiosk")}>
            Kiosk Mode Management
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/use-cases#corporate")}>
            Corporate-Owned Devices
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/use-cases#byod")}>
            BYOD Management
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Pricing */}
      <Link
        href="/pricing"
        className={`text-neutral-700 hover:text-primary ${currentPath === "/pricing" ? "text-primary" : ""}`}
      >
        Pricing
      </Link>

      {/* Resources */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer">
          <span>Resources</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => navigate("/blog")}>
            Blog
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/case-studies")}>
            Case Studies
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/whitepapers")}>
            Whitepapers
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/owasp-mobile")}>
            OWASP Mobile Top 10
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* FAQs */}
      <Link
        href="/faq"
        className={`text-neutral-700 hover:text-primary ${currentPath === "/faq" ? "text-primary" : ""}`}
      >
        FAQs
      </Link>

      {/* Partners */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer">
          <span>Partners</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => navigate("/partners")}>
            Partners & Clients
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/testimonials")}>
            Testimonials
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Contact */}
      <Link
        href="/contact"
        className={`text-neutral-700 hover:text-primary ${currentPath === "/contact" ? "text-primary" : ""}`}
      >
        Contact
      </Link>
    </>
  );
};

// const MobileNavigation = ({ currentPath }: NavigationProps) => {
//   return (
//     <div className="md:hidden">
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <Menu className="h-6 w-6" />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//           <nav className="flex flex-col gap-4 mt-6">
//             <Link href="/features" className={`py-2 hover:text-primary ${currentPath.includes("/features") ? "text-primary" : ""}`}>
//               Features
//             </Link>
//             <Link href="/use-cases" className={`py-2 hover:text-primary ${currentPath.includes("/use-cases") ? "text-primary" : ""}`}>
//               Use Cases
//             </Link>
//             <Link href="/pricing" className={`py-2 hover:text-primary ${currentPath === "/pricing" ? "text-primary" : ""}`}>
//               Pricing
//             </Link>
//             <Link href="/resources" className={`py-2 hover:text-primary ${currentPath.includes("/resources") ? "text-primary" : ""}`}>
//               Resources
//             </Link>
//             <Link href="/faq" className={`py-2 hover:text-primary ${currentPath === "/faq" ? "text-primary" : ""}`}>
//               FAQs
//             </Link>
//             <Link href="/partners" className={`py-2 hover:text-primary ${currentPath.includes("/partners") ? "text-primary" : ""}`}>
//               Partners
//             </Link>
//             <Link href="/contact" className={`py-2 hover:text-primary ${currentPath === "/contact" ? "text-primary" : ""}`}>
//               Contact
//             </Link>
//             <div className="flex flex-col gap-3 mt-4">
//               <Button variant="outline" className="w-full">
//                 Sign In
//               </Button>
//               <Button className="w-full">
//                 Request Demo
//               </Button>
//             </div>
//           </nav>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };
const MobileNavigation = ({ currentPath }: NavigationProps) => {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false); // Close the sheet
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4 mt-6">
              <button onClick={() => handleNavigate("/")} className={`text-left py-2 hover:text-primary ${currentPath.includes("/") ? "text-primary" : ""}`}>
              Home
            </button>
            <button onClick={() => handleNavigate("/features")} className={`text-left py-2 hover:text-primary ${currentPath.includes("/features") ? "text-primary" : ""}`}>
              Features
            </button>
            <button onClick={() => handleNavigate("/use-cases")} className={`text-left py-2 hover:text-primary ${currentPath.includes("/use-cases") ? "text-primary" : ""}`}>
              Use Cases
            </button>
            <button onClick={() => handleNavigate("/pricing")} className={`text-left py-2 hover:text-primary ${currentPath === "/pricing" ? "text-primary" : ""}`}>
              Pricing
            </button>
            <button onClick={() => handleNavigate("/resources")} className={`text-left py-2 hover:text-primary ${currentPath.includes("/resources") ? "text-primary" : ""}`}>
              Resources
            </button>
            <button onClick={() => handleNavigate("/faq")} className={`text-left py-2 hover:text-primary ${currentPath === "/faq" ? "text-primary" : ""}`}>
              FAQs
            </button>
            <button onClick={() => handleNavigate("/partners")} className={`text-left py-2 hover:text-primary ${currentPath.includes("/partners") ? "text-primary" : ""}`}>
              Partners
            </button>
            <button onClick={() => handleNavigate("/contact")} className={`text-left py-2 hover:text-primary ${currentPath === "/contact" ? "text-primary" : ""}`}>
              Contact
            </button>

            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full">
                Request Demo
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Header;
