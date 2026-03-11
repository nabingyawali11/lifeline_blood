import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', age: '', contactNo: '', bloodGroup: '', email: '', password: '', lat: null, lon: null, proofDocument: '', proofType: ''
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({ ...formData, lat: position.coords.latitude, lon: position.coords.longitude });
        toast.success("Location captured successfully!");
      }, () => {
        toast.error("Location access denied.");
      });
    } else {
      toast.error("Geolocation not supported.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large (max 5MB).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, proofDocument: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.lat || !formData.lon) {
      toast.error('Location is required for emergency notifications.');
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Registration successful! Please wait for admin verification.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed.');
      }
    } catch (err) {
      toast.error('Could not connect to the server.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-60 -mt-40 -mr-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-40 -mb-40 -ml-40 pointer-events-none"></div>

      <div className="max-w-xl mx-auto relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
              Create <span className="text-red-600">Lifesaver</span> Account
            </h2>
            <p className="text-slate-500 font-medium">Join our verified network of donors.</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* PERSONAL INFO SECTION */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Personal Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text" placeholder="Full Name" required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50/50 transition-all outline-none font-medium placeholder:text-slate-400"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <select
                  required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50/50 transition-all outline-none font-medium text-slate-600 cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                >
                  <option value="">Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number" placeholder="Age" min="16" max="100" required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50/50 transition-all outline-none font-medium placeholder:text-slate-400"
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                />
                <input
                  type="text" placeholder="Contact No" required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50/50 transition-all outline-none font-medium placeholder:text-slate-400"
                  onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                />
              </div>
            </div>

            {/* ACCOUNT INFO SECTION */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Account Credentials</h4>
              <input
                type="email" placeholder="Email Address" required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50/50 transition-all outline-none font-medium placeholder:text-slate-400"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="password" placeholder="Password" required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50/50 transition-all outline-none font-medium placeholder:text-slate-400"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* VERIFICATION SECTION */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Medical Verification</h4>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Proof Type</label>
                  <select
                    required className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 outline-none font-medium text-slate-700 cursor-pointer"
                    onChange={(e) => setFormData({ ...formData, proofType: e.target.value })}
                  >
                    <option value="">Select Document</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Hospital Form">Hospital Medical Form</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Upload Document (Image/PDF)</label>
                  <input
                    type="file" accept="image/*,application/pdf" required
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-slate-800 transition-all cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>

            {/* LOCATION & SUBMIT */}
            <div className="space-y-4 pt-4">
              <button
                type="button" onClick={getLocation}
                className={`w-full py-5 rounded-2xl font-black transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 tracking-widest text-xs ${formData.lat ? 'bg-green-50 text-green-600 border border-green-100 shadow-lg shadow-green-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {formData.lat ? "📍 LOCATION SECURED" : "SHARE LOCATION"}
              </button>

              <button type="submit" className="w-full bg-red-600 text-white py-6 rounded-2xl font-black text-sm tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-red-100 hover:shadow-slate-200 transform active:scale-[0.98]">
                AUTHORIZE REGISTRATION
              </button>
            </div>

            <p className="text-center text-slate-400 font-medium text-sm pt-4">
              Already a member? <a href="/login" className="text-red-500 font-black hover:underline">Log In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;