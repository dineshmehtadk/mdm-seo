import { Routes, Route } from "react-router";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import UseCases from "@/pages/UseCases";
import Pricing from "@/pages/Pricing";
import Resources from "@/pages/Resources";
import Blog from "@/pages/Blog";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import Whitepapers from "@/pages/whitepapers/Whitepapers";
import OwaspMobile from "@/pages/OwaspMobile";
import FAQ from "@/pages/FAQ";
import Partners from "@/pages/Partners";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import BlogDetailPage from "./pages/BlogDetailPage";
import WhitepaperDetailPage from "./pages/whitepapers/[slug]";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import CookiesPolicy from "./pages/CookiesPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import AcceptableUsePolicy from "./pages/AcceptableUsePolicy.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import ScrollToTop from "./components/common/ScrollToTop.tsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<TermsOfService />} />
      {/* <Route path="/features" component={Features} />
      <Route path="/use-cases" component={UseCases} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/resources" component={Resources} />
      <Route path="/blog" component={Blog} />
      <Route path="/blogs/category/:category" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/category/:category" component={CaseStudies} />
      <Route path="/case-studies/:slug" component={CaseStudyDetail} />

      <Route path="/whitepapers" component={Whitepapers} />
      <Route path="/whitepapers/category/:category" component={Whitepapers} />
      <Route path="/whitepapers/:slug" component={WhitepaperDetailPage} />

      <Route path="/owasp-mobile" component={OwaspMobile} />
      <Route path="/faq" component={FAQ} />
      <Route path="/partners" component={Partners} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} /> */}
      {/* <Route path="/blog-deatails" component={BlogDetailPage}/> */}

      {/* <Route path="/whitepapers/:slug" component={WhitepaperDetailPage} /> */}
      {/* <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookies-policy" component={CookiesPolicy} /> */}
      <Route path="/terms-services" element={<TermsOfService />} />
      {/* <Route path="/acceptable-policy" component={AcceptableUsePolicy} />
      <Route path="/about-us" component={AboutUs}/> */}

      <Route element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
