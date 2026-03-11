import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Icons = {
  Droplet: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C9.243 2 7 4.243 7 7c0 4 5 13 5 13s5-9 5-13c0-2.757-2.243-5-5-5z" />
    </svg>
  ),
  Location: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Hospital: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const BloodRequest = () => {
  const [selectedType, setSelectedType] = useState('');
  const [urgency, setUrgency] = useState('NORMAL');
  const [radius, setRadius] = useState(10);
  const [formData, setFormData] = useState({
    hospitalName: '',
    patientName: '',
    contactNumber: '',
    additionalInfo: ''
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType) {
      toast.error('Please select a blood type');
      return;
    }
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Sending emergency alerts to nearby donors...',
        success: 'Alerts sent successfully! Donors will contact you soon.',
        error: 'Failed to send alerts. Please try again.',
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Create <span className="text-red-600">Blood Request</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Fill in the details below to broadcast an emergency alert to verified donors in your immediate vicinity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION: Blood Type Selection */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-8 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              Target Blood Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`py-4 md:py-6 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl transition-all duration-200 border-2 ${selectedType === type
                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200 scale-105'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-red-200 hover:bg-red-50/30'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION: Patient & Hospital Info */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-8 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              Medical Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Icons.Hospital /> Hospital / Clinic
                </label>
                <input
                  type="text"
                  required
                  placeholder="Hospital"
                  className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Icons.User /> Patient Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Icons.Phone /> Contact Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Phone number for donors"
                  className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Icons.Clock /> Urgency Level
                </label>
                <select
                  className={`w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-600 outline-none transition-all font-bold ${urgency === 'CRITICAL' ? 'text-red-600' : urgency === 'URGENT' ? 'text-amber-600' : 'text-slate-600'
                    }`}
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="NORMAL">NORMAL (Next 24-48 Hours)</option>
                  <option value="URGENT">URGENT (Next 4-12 Hours)</option>
                  <option value="CRITICAL">CRITICAL (ASAP)</option>
                </select>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                Additional Requirements
              </label>
              <textarea
                placeholder="Any specific instructions for donors..."
                rows="3"
                className="w-full p-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-600 outline-none transition-all resize-none"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              ></textarea>
            </div>
          </div>

          {/* SECTION: Radius & Submission */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-8 border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Icons.Location /> Broadcast Radius
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your request will be broadcasted to all verified donors within a fixed <span className="font-bold text-red-600">10km</span> radius of your current location to ensure rapid response times.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <button
                  type="submit"
                  className="w-full md:px-12 py-4 md:py-5 bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:bg-slate-900 transition-all duration-300 transform active:scale-95 shadow-xl shadow-red-200 flex items-center justify-center gap-3 group"
                >
                  BROADCAST ALERT
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-8 text-center bg-red-50 border border-red-100 p-4 rounded-2xl">
          <p className="text-red-700 text-sm font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            All alerts are sent securely to verified donors only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodRequest;