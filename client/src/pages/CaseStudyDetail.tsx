import { useParams } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  TrendingUp,
  Shield,
  Clock,
  MapPin,
  Smartphone,
  Lock,
  Key,
  ClipboardCheck,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { caseStudyDetails } from "@/lib/caseStudyDetails";
import BlogSEO from "@/components/common/BlogSEO";

const iconMap = {
  "map-pin": MapPin,
  "shield": Shield,
  "smartphone": Smartphone,
  "lock": Lock,
  "key": Key,
  "clipboard-check": ClipboardCheck,
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const study = caseStudyDetails[slug || ""];

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link href="/case-studies">Back to Case Studies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Metadata */}
       <BlogSEO
      title={`${study.seoTitle}`}
      description={study.seoDescription}
    />
      {/* Hero Section */}
      <section className="relative bg-gradient text-white py-24 px-4 overflow-hidden shadow-lg">
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" className="opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cs-bg-grad" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#cs-bg-grad)" />
          </svg>
        </div>
        <div className="container flex mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto lg:mx-0 text-left">
            <Link href="/case-studies">
              <Button variant="ghost" className="text-white hover:text-white/90 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight text-left">
              {study.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {study.tags.map((tag, index) => (
                <span key={index} className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium shadow hover:bg-white/30 transition-all duration-150">
                  {tag}
                </span>
              ))}
            </div>
            
          </div>
          <div className="flex justify-center">
            <img
              src={study.imageSrc}
              alt="Whitepaper Hero"
              className="rounded-3xl shadow-2xl max-h-[420px] w-full object-cover border-4 border-white/30"
            />
          </div>
        </div>
      </section>

      {/* Executive Summary with Image Side-by-Side */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="items-center bg-neutral-50/80 rounded-2xl shadow-lg p-8">
            {/* Summary Text */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-neutral-800 text-left">Executive Summary</h2>
              <p className="text-lg text-neutral-600 leading-relaxed text-left">{study.summary}</p>
            </div>
            {/* Image (if present) */}
            {/* {study.imageSrc && (
              <div className="flex justify-center lg:justify-end items-center">
                <img
                  src={study.imageSrc}
                  alt="Case Study Visual"
                  className="rounded-2xl object-cover shadow-2xl border border-blue-100 max-w-xs w-full h-auto"
                  style={{ maxHeight: '320px' }}
                />
              </div>
            )} */}
          </div>
        </div>
      </section>

      {/* Client Overview + Challenges */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  ">
            {/* Client Overview */}
            <div className="bg-white/80 rounded-2xl shadow p-8">
              <h2 className="text-3xl font-bold mb-6 text-neutral-800">Client Overview</h2>
              <p className="text-lg text-neutral-700 mb-4">
                <span className="font-semibold">Industry:</span> {study.clientOverview?.industry}
              </p>
              {study.clientOverview?.keyChallenges?.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-neutral-800">Key Challenges</h3>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700">
                    {study.clientOverview.keyChallenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Challenges */}
            <div className="bg-white/80 rounded-2xl shadow p-8">
              <h2 className="text-3xl font-bold mb-6 text-neutral-800">Challenges</h2>
              <ul className="space-y-5">
                {study.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800">{challenge.title}</h3>
                      <p className="text-neutral-600">{challenge.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Image
      {study.imageSrc && (
        <section className="bg-white pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <img
              src={study.imageSrc}
              alt="Case Study Visual"
              className="rounded-2xl w-full object-cover shadow-2xl border border-blue-100"
            />
          </div>
        </section>
      )} */}

      {/* MDM Solutions */}
      <section className="py-10 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-neutral-800">MobiHeal MDM Solution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {study.solution.map((solution, index) => {
                const Icon = iconMap[solution.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-[1.02] transition-transform duration-200">
                    <div className="flex items-center mb-4">
                      {Icon && <Icon className="h-6 w-6 text-primary mr-2" />}
                      <h3 className="text-xl font-semibold text-neutral-800">{solution.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 min-w-[20px] text-primary mr-2 mt-1" />
                          <span className="text-neutral-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <h2 className="text-3xl font-bold mb-6 text-neutral-800 text-center">Results</h2>

           <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-centers "
          >
            {study.results.map((result, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow hover:shadow-lg transition-all duration-200 w-full max-w-sm">
                <div className="flex items-center mb-3">
                  <BarChart3 className="h-6 w-6 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-neutral-800 trunvc">{result.label}</h3>
                </div>
                <p className="text-2xl font-bold text-primary">{result.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Table */}
      <section className="py-10 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl font-bold mb-6 text-neutral-800 text-center">Before & After Metrics</h2>
          <div className="overflow-auto">
            <table className="min-w-full bg-white border border-blue-100 rounded-2xl overflow-hidden shadow">
              <thead className="bg-gradient text-white">
                <tr>
                  {study.metricsTable.headers.map((header, i) => (
                    <th key={i} className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {study.metricsTable.rows.map((row, i) => (
                  <tr key={i} className="border-t">
                    {row.map((cell, j) => (
                      <td key={j} className="px-6 py-4 text-sm text-neutral-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Best Practices + Industry Recognition */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Best Practices */}
            <div className="bg-white/80 rounded-2xl shadow p-8">
              <h2 className="text-3xl font-bold mb-6 text-neutral-800">Best Practices</h2>
              <ul className="space-y-3 list-disc list-inside text-neutral-700">
                {study.bestPractices.map((practice, index) => (
                  <li key={index}>{practice}</li>
                ))}
              </ul>
            </div>

            {/* Industry Recognition */}
            <div className="bg-white/80 rounded-2xl shadow p-8">
              <h2 className="text-3xl font-bold mb-6 text-neutral-800">Industry Recognition</h2>
              <ul className="space-y-4 text-neutral-700">
                {study.industryRecognition.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 min-w-[20px] text-primary mr-2 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-6xl shadow border-neutral-200">
          <h2 className="text-3xl font-bold mb-4 text-neutral-800">Conclusion</h2>
          <p className=" text-neutral-700 leading-relaxed">
            {study.conclusion}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-gradient text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Ready to Secure Your Mobile Infrastructure?</h2>
          <p className="text-lg mb-8">Explore how MobiHeal MDM can protect your organization against evolving mobile threats.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary text-white hover:bg-blue-100 shadow" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/10 font-bold" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetail;
