// lib/whitepapersData.ts
import wp1 from "@/assets/whitepaper/wp1.png";
import wp2 from "@/assets/whitepaper/wp2.png";
import wp3 from "@/assets/whitepaper/wp3.png";
import wp4 from "@/assets/whitepaper/wp4.jpg";
export const whitepapers = [
  {
    id: "mobile-security",
    slug: "unlocking-business-potential",
    title: "Unlocking Business Potential: How Mobile Device Management Solutions Transform Operations",
    heroSubtitle: "Discover how Mobile Device Management solutions optimize operations, enhance security, and drive cost-efficiency.",
    heroImage: wp1,
    type: "Whitepaper",
    // ✅ SEO Fields
    seoTitle:"Unlocking Business Potential: How MDM Solutions Transform Operations | MobiHeal MDM",
    seoDescription:"Explore how MDM solutions can transform your business operations by enhancing security, ensuring compliance, and reducing costs. Learn about the benefits of MDM in various industries.",
    // ✅ Highlights
    highlights: [
      "Secure corporate and personal mobile devices",
      "Ensure compliance with GDPR, HIPAA, and PCI DSS",
      "Cut IT and mobility costs by up to 50%",
      "Improve employee productivity and BYOD flexibility",
      "Seamlessly integrate with IT infrastructure",
      "Future-proof your mobile security posture"
    ],
   pdfUrl: "/assets/whitepapers/pdf/Unlocking_business_potential.pdf",
    downloadForm: {
      enabled: true
    }
  },
  {
  id: "mobile-device-security-guide",
  slug: "comprehensive-guide-mobile-device-security",
  title: "Comprehensive Guide to Mobile Device Security",
  heroSubtitle: "A deep dive into securing enterprise mobility across BFSI, defence, and education through advanced MDM strategies.",
  heroImage: wp2, // Replace with the actual imported image reference
  type: "Whitepaper",
  // ✅ SEO Fields
  seoTitle:": Comprehensive Guide to Mobile Device Security | MobiHeal MDM",
  seoDescription:"Explore our Comprehensive Guide to Mobile Device Security. Learn best practices, strategies, and solutions to secure enterprise mobile devices efficiently.",
  highlights: [
    "Combat phishing, malware, and device theft threats",
    "Ensure GDPR, HIPAA, and industry-specific compliance",
    "Deploy secure MDM with Zero-Touch and QR enrollment",
    "Implement Kiosk Mode and geo-fencing for control",
    "Secure BYOD with containerization and policy enforcement",
    "Empower IT with real-time compliance monitoring"
  ],
   pdfUrl: "/assets/whitepapers/pdf/Comprehensive Guide to Mobile Device Security.pdf",
  downloadForm: {
    enabled: true
  }
},
{
  id: "byod-best-practices",
  slug: "best-practices-byod-enterprises",
  title: "Best Practices for BYOD Implementation in Enterprises",
  heroSubtitle: "Learn how to securely manage personal devices at work while boosting employee productivity and ensuring compliance.",
  heroImage: wp3, // Replace with actual import or image reference
  type: "Whitepaper",
  // ✅ SEO Fields
  seoTitle:"Best Practices for BYOD Implementation in Enterprises | MobiHeal MDM",
  seoDescription:"Discover proven strategies for secure BYOD implementation in enterprises. Learn how MobiHeal MDM ensures compliance, enhances productivity, and mitigates risks.",
  highlights: [
    "Mitigate BYOD security risks like data leakage and malware",
    "Achieve compliance with GDPR, HIPAA, and PCI-DSS",
    "Leverage Work Profile containerization for data separation",
    "Enforce MFA and biometric authentication for access control",
    "Educate users through phishing simulations and awareness programs",
    "Streamline audits with automated MDM reporting"
  ],
   pdfUrl: "/assets/whitepapers/pdf/byod.pdf",
  downloadForm: {
    enabled: true
  }
},
{
  id: "advanced-mdm-enterprise",
  slug: "mobiheal-advanced-mdm-enterprise",
  title: "Empowering Modern Enterprises: MobiHeal’s Advanced MDM for Security, Efficiency & Growth",
  heroSubtitle: "Discover how MobiHeal’s unified MDM solution fortifies enterprise mobility, reduces costs, and future-proofs your digital ecosystem.",
  heroImage: wp4, // Replace with the actual image reference
  type: "Whitepaper",
  // ✅ SEO Fields
  seoTitle:"Advanced Mobile Device Management with MobiHeal: Secure, Scalable & Future-Ready | MobiHeal MDM",
  seoDescription:"Discover how MobiHeal’s next-gen Mobile Device Management solution fortifies security, optimizes costs, ensures compliance, and accelerates mobile workforce productivity for SMEs and enterprises alike.",
  highlights: [
    "Combat zero-day threats with Zero-Trust enforcement",
    "Automate device provisioning and reduce IT workload",
    "Achieve 200% ROI by streamlining device operations",
    "Ensure GDPR, HIPAA, and CCPA compliance with real-time auditing",
    "Boost employee productivity through self-service and insights",
    "Scale effortlessly with cloud-native, edge-ready infrastructure"
  ],
  pdfUrl: "/assets/whitepapers/pdf/Empowering_modern_enterprises.pdf",
  downloadForm: {
    enabled: true
  }
}



];
