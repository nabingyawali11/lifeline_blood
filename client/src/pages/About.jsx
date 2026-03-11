import React from 'react';

const Icons = {
  Heart: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h2l1-2 2 4 1-2h2" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4-9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  )
};

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* HERO SECTION - Warm & Welcoming */}
      <section className="relative pt-44 pb-12 bg-gradient-to-b from-orange-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            Neighbors saving <br className="hidden md:block" />
            <span className="text-red-600 underline decoration-red-100 underline-offset-8">neighbors.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium italic">
            "LifeLine isn't just technology. It's the hands that reach out when the night is at its darkest."
          </p>
        </div>
      </section>

      {/* THE HUMAN CORE */}
      <section className="pt-12 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              Kindness is our <br />
              only <span className="text-red-600">algorithm.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              We believe that in a crisis, you shouldn't have to navigate a complex system.
              You should find a friend. LifeLine was built to make sure that help is
              as simple as a heartbeat—fast, reliable, and always close by.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="text-red-600 mb-4"><Icons.Heart /></div>
                <h4 className="font-bold text-lg mb-2 text-slate-900">Care First</h4>
                <p className="text-slate-500 text-sm">Every line of code we write is dedicated to the person waiting for a second chance.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="text-blue-600 mb-4"><Icons.Users /></div>
                <h4 className="font-bold text-lg mb-2 text-slate-900">Community Built</h4>
                <p className="text-slate-500 text-sm">We are a network of real people, verified by real humans, for real emergencies.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-red-600 rounded-[4rem] rotate-6 scale-95 opacity-5 blur-2xl"></div>
            <div className="bg-white p-12 md:p-16 rounded-[4rem] border-2 border-red-50 shadow-2xl shadow-red-100/50 relative z-10">
              <h3 className="text-3xl font-black text-slate-900 mb-8 leading-tight">
                "Because the person who can save a life today lives just around your corner."
              </h3>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed italic">
                We've removed the noise. No more city-wide alerts that get ignored.
                We only notify the people who are close enough to actually be there in time.
                Pure efficiency driven by pure empathy.
              </p>
              <div className="h-px w-20 bg-red-200 mb-8"></div>
              <p className="font-bold text-slate-900 text-xl tracking-tight">The LifeLine Community</p>
              <p className="text-red-600 font-bold text-sm uppercase tracking-widest mt-1">Our Collective Purpose</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE TRUTH SECTION */}
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.1),transparent)]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight">
            A lifeline within <br />
            <span className="text-red-500">arm's reach.</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="text-center">
              <p className="text-5xl font-black mb-2 tracking-tighter">10km</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Neighborhood Reach</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black mb-2 tracking-tighter">Real</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Verified People</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black mb-2 tracking-tighter">Free</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Forever for All</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL INVITATION */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Will you be the <br />
              one who <span className="text-red-600">responds?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
              Joining LifeLine takes minutes. But for someone in your neighborhood,
              those minutes could mean a lifetime of more memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/register" className="px-14 py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-red-200 transform hover:scale-105 active:scale-95">
                Join the Lifeline
              </a>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;