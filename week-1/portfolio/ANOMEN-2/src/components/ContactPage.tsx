/**
 * Contact Page Component
 * Contact form with FormSubmit integration for inquiries
 */

import { useMemo } from "react";

// Form submission endpoint
const FORM_ENDPOINT = "https://formsubmit.co/jaedenivescrow@yahoo.com";

export function ContactPage() {
  const contactDetails = useMemo(
    () => [
      {
        label: "Email",
        value: "jaedenivescrow@yahoo.com",
        href: "mailto:jaedenivescrow@yahoo.com"
      }
    ],
    []
  );

  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      <div className="px-4 md:px-12 lg:px-20">
        <section className="max-w-3xl mx-auto">
          <header style={{ marginBottom: '3.5rem' }}>
            <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 mb-4" style={{ marginTop: '2rem' }}>
              Let's work together
            </p>
            <h1 className="font-heading text-3xl md:text-5xl tracking-wider uppercase">
              Contact
            </h1>
            <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-neutral-700">
              Share the vision for your next project and I'll reach out within two business
              days. Include as many details as you can - timeline, deliverables, tone, or any
              references that are inspiring you.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 lg:gap-16">
            <form
              method="POST"
              action={FORM_ENDPOINT}
              className="space-y-6 border border-black p-6 md:p-10 bg-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
            >
              <input type="hidden" name="_subject" value="New inquiry from ANOMEN" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="space-y-2">
                <label htmlFor="name" className="uppercase text-xs tracking-[0.2em] text-[#f8f5ef]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full border border-[#f8f5ef] bg-black text-[#f8f5ef] px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-[#f8f5ef] placeholder:text-[#f8f5ef]/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="uppercase text-xs tracking-[0.2em] text-[#f8f5ef]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full border border-[#f8f5ef] bg-black text-[#f8f5ef] px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-[#f8f5ef] placeholder:text-[#f8f5ef]/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="uppercase text-xs tracking-[0.2em] text-[#f8f5ef]">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Optional"
                    className="w-full border border-[#f8f5ef] bg-black text-[#f8f5ef] px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-[#f8f5ef] placeholder:text-[#f8f5ef]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="uppercase text-xs tracking-[0.2em] text-[#f8f5ef]">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project or opportunity"
                  className="w-full border border-[#f8f5ef] bg-black text-[#f8f5ef] px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-[#f8f5ef] placeholder:text-[#f8f5ef]/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="inquiry" className="uppercase text-xs tracking-[0.2em] text-[#f8f5ef]">
                  Inquiry
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  required
                  rows={6}
                  placeholder="Tell me about your project, timeline, and goals."
                  className="w-full border border-[#f8f5ef] bg-black text-[#f8f5ef] px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-[#f8f5ef] resize-none placeholder:text-[#f8f5ef]/50"
                />
              </div>

              <button
                type="submit"
                className="uppercase tracking-[0.2em] text-xs bg-[#f8f5ef] text-black px-6 py-3 hover:!bg-red-600 hover:!text-white transition-colors"
              >
                Send Inquiry
              </button>
            </form>

            <aside className="space-y-8">
              <div>
                <h2 className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-4">
                  Direct Contact
                </h2>
                <ul className="space-y-4">
                  {contactDetails.map((item) => (
                    <li key={item.label}>
                      <span className="block text-xs uppercase tracking-[0.2em] text-neutral-500">
                        {item.label}
                      </span>
                      <a
                        href={item.href}
                        className="text-sm md:text-base tracking-wide hover:text-red-600 transition-colors"
                      >
                        {item.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-4">
                  What to include
                </h2>
                <ul className="space-y-3 text-sm md:text-base tracking-wide text-neutral-700 list-disc list-inside">
                  <li>Project goals, deliverables, and desired tone or aesthetic.</li>
                  <li>Ideal timeline and any key launch dates.</li>
                  <li>Budget guidance or constraints if available.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
