

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { saveAs } from "file-saver";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { whitepaperData } from "@/lib/data";
import { useLocation, useRouter } from "wouter";
import { useEffect } from "react";
import BlogSEO from "../common/BlogSEO";

interface WhitepaperProps {
  id: string;
  title: string;
  heroSubtitle: string;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  highlights: string[];
  pdfUrl:string;
  downloadForm?: {
    enabled: boolean;
     
  };
}

const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().min(1, "Required"),
  users: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const WhitepaperDetails = ({
  id,
  title,
  seoTitle,
  seoDescription,
  heroSubtitle,
  heroImage,
  highlights,
  downloadForm,
  pdfUrl,
}: WhitepaperProps) => {
  const content = whitepaperData.find((w) => w.id === id);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      users: "",
    },
  });

  // const handleDownload = async (pdfUrl: string, data: FormValues) => {
  //   try {
  //     const response = await fetch(pdfUrl);
  //     const blob = await response.blob();
  //     saveAs(blob, "Whitepaper.pdf");
  //   } catch (err) {
  //     console.error("Download failed", err);
  //   }
  // };
 

const [location] = useLocation();

useEffect(() => {
  const queryString = location.split("?")[1];
  const params = new URLSearchParams(queryString);
  const scrollToForm = params.get("scrollToForm");

  if (scrollToForm === "true") {
    const scroll = () => {
      const el = document.getElementById("download-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Delay scroll until after the DOM is painted
    const raf = requestAnimationFrame(() => {
      setTimeout(scroll, 300);
    });

    return () => cancelAnimationFrame(raf);
  }
}, [location]);



  const handleDownload = (fileUrl: string, title: string) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.setAttribute("download", title);
  a.setAttribute("target", "_blank");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

  return (
    <>
       <BlogSEO
      title={`${seoTitle}`}
      description={seoDescription}
    />
        {/* Hero Section */}
 <section className="relative bg-gradient text-white py-12 px-4 sm:py-10 sm:px-6 overflow-hidden">
  {/* Background SVG */}
  <div className="absolute inset-0 pointer-events-none">
    <svg width="100%" height="100%" className="opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-grad)" />
    </svg>
  </div>

  {/* Content */}
  <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 relative z-10">
    {/* Text */}
    <div className="text-center md:text-left max-w-xl w-full">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 break-words">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed mb-6">
        {heroSubtitle}
      </p>
      <Button
        onClick={() =>
          document.getElementById("download-form")?.scrollIntoView({ behavior: "smooth" })
        }
        className="mt-4 sm:mt-6 px-6 py-3 text-lg font-semibold bg-white text-primary hover:bg-blue-100 shadow-lg rounded-lg transition"
      >
        Download Whitepaper
      </Button>
    </div>

    {/* Image */}
    <div className="w-full max-w-sm sm:max-w-md flex justify-center">
      <img
        src={heroImage}
        alt="Whitepaper Hero"
        className="rounded-2xl shadow-xl object-cover aspect-[4/3] w-full border-4 border-white/20 max-h-[300px] sm:max-h-[420px]"
      />
    </div>
  </div>
</section>



      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-14 text-neutral-900 tracking-tight">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-4 bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-200"
              >
                <CheckCircle2 className="text-primary w-8 h-8 mb-2" />
                <p className="text-neutral-800 text-lg leading-snug font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Form Section */}
      {downloadForm?.enabled && pdfUrl && (
        <section id="download-form" className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container max-w-3xl mx-auto px-4">
            <aside className="relative bg-white/60 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-3xl p-10 mx-auto max-w-lg flex flex-col items-center">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-200/40 to-blue-100/10 blur-xl -z-10" />
              <h4 className="text-3xl font-bold mb-4 text-neutral-900 text-center drop-shadow-sm">
                Get the Full Whitepaper
              </h4>
              <p className="text-neutral-700 mb-8 text-base text-center">
                Fill out this form to instantly download the whitepaper.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) =>
                    handleDownload(pdfUrl,title)
                  )}
                  className="space-y-5 w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="firstName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name*</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="First Name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="lastName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name*</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Last Name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Email Address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Phone Number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="company"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Company Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="users"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. of Users</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Number of Users" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full text-lg font-semibold bg-gradient transition-colors duration-200 shadow-md rounded-lg">
                    Download Now
                  </Button>
                </form>
              </Form>
            </aside>
          </div>
        </section>
      )}
    </>
  );
};

export default WhitepaperDetails;
