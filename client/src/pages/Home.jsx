import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();

  // Register State
  const [regData, setRegData] = useState({
    fullName: '', age: '', contactNo: '', bloodGroup: '', email: '', password: '', lat: null, lon: null, proofDocument: '', proofType: ''
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setRegData({ ...regData, lat: position.coords.latitude, lon: position.coords.longitude });
        toast.success("Location captured!");
      });
    } else {
      toast.error("Geolocation not supported.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setRegData({ ...regData, proofDocument: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regData.lat || !regData.lon) {
      toast.error('Location is required.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData),
      });
      if (response.ok) {
        toast.success('Registration successful! Please wait for admin verification.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed.');
      }
    } catch (err) {
      toast.error('Could not connect to server.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[75vh]">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-10">
            Donating blood <br />
            just got <span className="text-red-600 underline decoration-red-100 underline-offset-8">smarter.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Connecting you to the heartbeat of your community. Local, verified, and faster than ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#join"
              className="w-full sm:w-auto px-12 py-5 bg-red-600 text-white rounded-2xl font-black text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-red-200 transform active:scale-95"
            >
              Become a Donor
            </a>
            <Link
              to="/request"
              className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-sm transform active:scale-95"
            >
              Request Help
            </Link>
          </div>
        </div>
      </section>

      {/* JOIN MISSION SECTION */}
      <section id="join" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left side: Value props */}
            <div className="pt-12">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Join the <span className="text-red-600">Mission</span> to <br /> Save Lives.
              </h2>
              <p className="text-lg text-slate-500 font-medium mb-12 max-w-md">
                A single donation can transform the future for up to three families. Join our network of heroes and be the difference someone is waiting for today.
              </p>

              <div className="space-y-8">
                {[
                  { title: "Nearby Alerts", desc: "Get notified immediately when someone in your area needs your specific blood type." },
                  { title: "Verified Safety", desc: "We verify every donor profile to ensure a 100% safe and reliable community." },
                  { title: "Fast Response", desc: "Access live event locations and contact coordinators directly without any delays." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-red-600 font-black shrink-0">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Forms */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity pointer-events-none"></div>

              <div className="mb-10 text-center relative z-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Registration</h3>
                <p className="text-slate-500 text-sm font-medium mt-2">Already have an account? <Link to="/login" className="text-red-600 font-bold hover:underline">Sign In</Link></p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6 relative z-10 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text" placeholder="Full Name"
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all outline-none"
                      value={regData.fullName} onChange={(e) => setRegData({ ...regData, fullName: e.target.value })} required
                    />
                    <select
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all outline-none cursor-pointer"
                      value={regData.bloodGroup} onChange={(e) => setRegData({ ...regData, bloodGroup: e.target.value })} required
                    >
                      <option value="">Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number" placeholder="Age"
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all outline-none"
                      value={regData.age} onChange={(e) => setRegData({ ...regData, age: e.target.value })} required
                    />
                    <input
                      type="text" placeholder="Phone Number"
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all outline-none"
                      value={regData.contactNo} onChange={(e) => setRegData({ ...regData, contactNo: e.target.value })} required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="email" placeholder="Email Address"
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all outline-none"
                    value={regData.email} onChange={(e) => setRegData({ ...regData, email: e.target.value })} required
                  />
                  <input
                    type="password" placeholder="Create Password"
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all outline-none"
                    value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} required
                  />
                </div>

                <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                  <div className="flex flex-col gap-1 px-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Verification</p>
                    <select
                      className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none py-2 cursor-pointer"
                      onChange={(e) => setRegData({ ...regData, proofType: e.target.value })} required
                    >
                      <option value="">Select Proof Type</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Hospital Form">Medical Report</option>
                    </select>
                  </div>
                  <input
                    type="file" onChange={handleFileUpload} required
                    className="w-full text-[10px] text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-900 file:text-white file:text-[10px] file:font-black transition-all cursor-pointer"
                  />
                </div>

                <div className="pt-2 space-y-4">
                  <button
                    type="button" onClick={getLocation}
                    className={`w-full p-5 rounded-2xl font-black text-xs tracking-widest transition-all transform active:scale-[0.98] ${regData.lat ? 'bg-green-50 text-green-600 border border-green-100 shadow-lg shadow-green-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {regData.lat ? "📍 LOCATION SECURED" : "SHARE LOCATION"}
                  </button>

                  <button type="submit" className="w-full bg-red-600 text-white p-6 rounded-2xl font-black text-xs tracking-[0.2em] transform active:scale-[0.98] hover:bg-slate-900 transition-all shadow-xl shadow-red-100 hover:shadow-slate-200">
                    AUTHORIZE REGISTRATION
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;