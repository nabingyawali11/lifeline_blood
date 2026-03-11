import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Icons = {
  Mail: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Message: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  )
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-4 md:px-6 relative overflow-hidden font-sans animation-fade-in text-slate-900">

      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-60 -mt-60 -mr-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-40 -mb-40 -ml-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Let's Start a <span className="text-red-600">Conversation.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Whether you have a technical question, partnership proposal, or just want to say hello, we're here to listen and help.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: CONTACT INFO */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">

            <div className="group bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/30 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-200 group-hover:bg-slate-900 transition-colors">
                  <Icons.Mail />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">Email Support</h4>
                  <p className="text-slate-500 font-medium text-sm mb-4">Our team is typically responsive within 24 hours.</p>
                  <a href="mailto:support@lifeline.com" className="text-red-600 font-bold hover:underline tracking-tight">support@lifeline.com</a>
                </div>
              </div>
            </div>

            <div className="group bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-slate-200 group-hover:bg-red-600 transition-colors">
                  <Icons.Phone />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">Call Center</h4>
                  <p className="text-slate-500 font-medium text-sm mb-4">Available for emergencies and urgent coordination.</p>
                  <a href="tel:+9779860526614" className="text-slate-900 font-bold hover:underline tracking-tight">+977 9860526614</a>
                </div>
              </div>
            </div>

            <div className="group bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/30 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Icons.MapPin />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">Headquarters</h4>
                  <p className="text-slate-500 font-medium text-sm mb-3 leading-relaxed truncate">Central Medical Plaza, Kathmandu, Nepal</p>
                  <button className="text-red-600 font-bold hover:underline text-sm uppercase tracking-widest">Open in Maps</button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">

              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                  <Icons.Message />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Send us a message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Your Name</label>
                    <input
                      type="text" placeholder="John Doe" required
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-500 transition-all outline-none font-medium placeholder:text-slate-300"
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Email Address</label>
                    <input
                      type="email" placeholder="john@example.com" required
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-500 transition-all outline-none font-medium placeholder:text-slate-300"
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Subject</label>
                  <input
                    type="text" placeholder="How can we help?" required
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-500 transition-all outline-none font-medium placeholder:text-slate-300"
                    value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Message</label>
                  <textarea
                    placeholder="Tell us more about your inquiry..." required
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-500 transition-all outline-none font-medium h-48 resize-none placeholder:text-slate-300"
                    value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full bg-red-600 text-white p-6 rounded-2xl font-black text-sm tracking-[0.2em] shadow-xl shadow-red-100 hover:bg-slate-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {loading ? "SENDING..." : (
                    <>
                      DELIVER MESSAGE
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;