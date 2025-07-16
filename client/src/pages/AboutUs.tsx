import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import about from "@/assets/about/Cover-Cyber-Security-1-1600x600.jpg"
import about_animation1 from "@/assets/about/Animation - 1750941799599.json"
import about_animation2 from "@/assets/about/Animation - 1750942525054.json"
import Lottie from "lottie-react";
export default function AboutUsPage() {
  return (
    <main className="bg-gradient-to-b from-white via-blue-50 to-white text-gray-800 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 to-blue-800 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-cover bg-center opacity-10" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Redefining Cybersecurity for a Safer Digital World</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
          At <strong>Mobisec Technologies</strong>, we don't just secure data — we safeguard the future.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Story</h2>
        <div>
          <p className="text-lg leading-relaxed text-gray-700">
          Mobisec Technologies is a cutting-edge cybersecurity startup at the forefront of safeguarding the digital landscape. Founded by a visionary leader whose extensive expertise in cybersecurity has shaped the very core of our mission. With a rich background spanning more than two decades, our founder has been at the forefront of the ever-evolving cybersecurity landscape, navigating through challenges, and anticipating the needs of the digital era.
        </p>
         {/* Lottie Animation */}
                  {/* <div className="md:w-1/2 flex justify-center items-center">
                    <Lottie animationData={about_animation2} loop={true} className="w-full max-w-md md:max-w-lg h-auto" />
                  </div> */}
        </div>
       
      </section>

      {/* Incubation & Alliances */}
      <section className="py-20 px-6 bg-gradient-to-r from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Roots: Incubation & Alliances</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Incubated at <strong>IIT Delhi</strong> and affiliated with <strong>NCoE, DSCI</strong>, Mobisec Technologies thrives at the nexus of academic innovation and industry impact. These partnerships empower us to stay ahead, driving real-world cybersecurity solutions from concept to deployment.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img src={about} alt="IIT Delhi and DSCI" className=" rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-blue-900 text-center">Vision & Mission</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-blue-600">
            <h3 className="text-2xl font-semibold mb-4">🌐 Our Vision</h3>
            <p className="text-lg text-gray-700">
              To create a digitally secure future for individuals, businesses, and nations — anticipating and eliminating threats before they surface.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-500">
            <h3 className="text-2xl font-semibold mb-4">🛡️ Our Mission</h3>
            <p className="text-lg text-gray-700">
              To deliver adaptive, robust, and intelligent cybersecurity solutions that proactively secure digital infrastructures and empower confident innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 px-14 bg-gradient-to-tr from-blue-50 flex to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-blue-900">Innovation at Our Core</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            At Mobisec, we don’t follow trends — we create them. Our team of forward-thinkers thrives on disruption, continuously pushing the envelope to craft next-gen cybersecurity solutions.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Collaborative, agile teams working at the speed of innovation</li>
            <li>Breakthrough research and scalable implementations</li>
            <li>A culture built around curiosity, creativity, and client success</li>
          </ul>
        </div>
                  {/* Lottie Animation */}
                  <div className="md:w-1/2 flex justify-center items-center">
                    <Lottie animationData={about_animation1} loop={true} className="w-full max-w-md md:max-w-lg h-auto" />
                  </div>
      </section>

      {/* Strategic Alliances */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-blue-900">Strategic Alliances</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Collaboration is at the heart of everything we do. We join forces with academic institutions, global tech leaders, and policy makers to enhance our insights, accelerate innovation, and shape the future of digital resilience.
        </p>
      </section>

      {/* Our Commitment */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Promise</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            You place your trust in us — and we take that seriously. Our promise is simple: to deliver tailor-made, proactive cybersecurity frameworks that adapt, scale, and outperform expectations.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-900">Get in Touch</h2>
        <p className="text-lg mb-10 text-gray-700">
          Join us on our mission to build a secure, resilient digital world. Let’s collaborate to secure the future.
        </p>
        <div className="bg-white shadow-xl rounded-xl p-8 inline-block text-left">
          <p className="flex items-center gap-2 mb-4">
            <MapPin className="text-blue-600" size={20} />
            F-200, FF, Phase-1, New Palam Vihar, Sector 110, Gurugram, Haryana 122017, India
          </p>
          <p className="flex items-center gap-2 mb-4">
            <Phone className="text-blue-600" size={20} />
            +91-11-6926-8029
          </p>
          <p className="flex items-center gap-2">
            <Mail className="text-blue-600" size={20} />
            <a href="mailto:contact@mobisec.in" className="text-blue-700 hover:underline">contact@mobisec.in</a>
          </p>
        </div>
      </section>
    </main>
  );
}