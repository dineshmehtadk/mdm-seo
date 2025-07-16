import React from "react";

const CookiesPolicy = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-sans min-h-screen py-16 px-4 sm:px-8 md:px-12 lg:px-20 max-w-6xl mx-auto shadow-lg rounded-xl my-8">
      <style >{`
        .text-primary {
          color: #03a9fc; /* Your primary color */
        }
        .text-secondary {
          color: #0285c7; /* Your secondary color */
        }
        .border-primary-light {
          border-color: rgba(3, 169, 252, 0.3); /* Lighter primary for borders */
        }
        .text-blue-600 {
          color: #03a9fc; /* Overriding Tailwind's default blue for links to your primary */
        }
        .hover\:text-blue-800:hover {
          color: #0285c7; /* Overriding Tailwind's default blue hover for links to your secondary */
        }
      `}</style>
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">Cookies Policy</h1>
        <p className="text-md text-gray-600">Last updated: <span className="font-semibold">November 14, 2023</span></p>
      </header>

      <article className="space-y-10 leading-relaxed text-lg text-gray-700">
        <section className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <p className="mb-4">
            This Cookies Policy explains what Cookies are and how we use them. You should read this policy so you can understand what type of cookies we use, or the information we collect using Cookies and how that information is used.
          </p>
          <p className="mb-4">
            Cookies do not typically contain any information that personally identifies a user, but personal information that we store about you may be linked to the information stored in and obtained from cookies. For further information on how we use, store, and keep your personal data secure, see our Privacy Policy.
          </p>
          <p>
            We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies we use.
          </p>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2">Interpretation and Definitions</h2>

          <h3 className="text-2xl font-semibold text-secondary mb-3">Interpretation</h3>
          <p className="mb-6">
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h3 className="text-2xl font-semibold text-secondary mb-3">Definitions</h3>
          <p className="mb-4">For the purposes of this Cookies Policy:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Cookies Policy) refers to <em>Mobisec Technologies Pvt. Ltd</em>, F-200, FF, Phase-1, New Palam Vihar, Sec-110, Gurugram, Haryana-122017, India.</li>
            <li><strong>Cookies</strong> means small files that are placed on your computer, mobile device or any other device by a website, containing details of your Browse history on that website among its many uses.</li>
            <li><strong>Website</strong> refers to Mobiheal website, accessible from <a href="https://mobiheal.in" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">https://mobiheal.in</a></li>
            <li><strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the website, as applicable.</li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2">The Use of the Cookies</h2>

          <h3 className="text-2xl font-semibold text-secondary mb-3">Type of Cookies We Use</h3>
          <p className="mb-4">Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when you go offline, while Session Cookies are deleted as soon as you close your web browser.</p>
          <p className="mb-4">We use both session and persistent Cookies for the purposes set out below:</p>
          <ul className="list-disc list-inside space-y-4 pl-4">
            <li>
              <strong>Necessary / Essential Cookies</strong><br/>
              <span className="font-semibold">Type:</span> Session Cookies<br/>
              <span className="font-semibold">Administered by:</span> Us<br/>
              <span className="font-semibold">Purpose:</span> These Cookies are essential to provide you with services available through the Website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that you have asked for cannot be provided, and we only use these Cookies to provide you with those services.
            </li>
            <li>
              <strong>Functionality Cookies</strong><br/>
              <span className="font-semibold">Type:</span> Persistent Cookies<br/>
              <span className="font-semibold">Administered by:</span> Us<br/>
              <span className="font-semibold">Purpose:</span> These Cookies allow us to remember choices you make when you use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid you having to re-enter your preferences every time you use the Website.
            </li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2">Your Choices Regarding Cookies</h2>
          <p className="mb-4">If you prefer to avoid the use of Cookies on the Website, first you must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. you may use this option for preventing the use of Cookies at any time.</p>
          <p className="mb-4">If you do not accept Our Cookies, you may experience some inconvenience in your use of the Website and some features may not function properly.</p>
          <p className="mb-4">If you'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">http://support.microsoft.com/kb/278835</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
            <li>For any other web browser, please visit your web browser's official web pages.</li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2">More Information about Cookies</h2>
          <p>You can learn more about cookies: <a href="https://www.privacypolicies.com/blog/cookies-what-do-they-do/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">Cookies: What Do They Do?</a>.</p>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2">Contact Us</h2>
          <p className="mb-4">If you have any questions about this Cookies Policy, you can contact us:</p>
          <ul className="list-disc list-inside pl-4">
            <li>By phone : <a href="tel:+91-11-6926-8029" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">+91-11-6926-8029</a></li>
            <li>By email: <a href="mailto:contact@mobisec.in" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">contact@mobisec.in</a></li>
          </ul>
        </section>
      </article>
    </div>
  );
};

export default CookiesPolicy;