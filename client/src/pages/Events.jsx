import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const Icons = {
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Location: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Verified: () => (
    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
};

// Haversine formula for client-side distance calculation
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    title: '', date: '', location: '', description: '', imageUrl: '', contact: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Could not fetch events:', err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchEvents();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (err) => {
          console.warn("Location permission denied or unavailable.");
        }
      );
    }
  }, [fetchEvents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `${API_URL}/admin/events/${editingId}` : `${API_URL}/admin/events`;

    try {
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(editingId ? 'Event updated successfully' : 'Event published successfully');
        setEditingId(null);
        setIsFormOpen(false);
        setFormData({ title: '', date: '', location: '', description: '', imageUrl: '', contact: '' });
        fetchEvents();
      } else {
        toast.error("Failed to save event");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Event deleted");
        fetchEvents();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete event");
    }
  };

  // Process events with distances and sort them
  const processedEvents = events.map(ev => {
    if (userLocation && ev.lat && ev.lon) {
      const distance = getDistance(userLocation.lat, userLocation.lon, ev.lat, ev.lon);
      return { ...ev, distance };
    }
    return { ...ev, distance: Infinity };
  }).sort((a, b) => a.distance - b.distance);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-4 md:px-6 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* HERO HEADER */}
        <div className="flex flex-col items-center mb-16 text-center">

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Connecting <span className="text-red-500">Kindness.</span> <br className="hidden md:block" />
            Discover Events.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            {userLocation
              ? "We've found life-saving donation events closest to your current location."
              : "Join life-saving donation events organized by verified health centers and community leaders."
            }
          </p>

          {isAdmin && (
            <button
              onClick={() => {
                setIsFormOpen(!isFormOpen);
                if (!isFormOpen) {
                  setEditingId(null);
                  setFormData({ title: '', date: '', location: '', description: '', imageUrl: '', contact: '' });
                }
              }}
              className={`p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 mb-8 ${isFormOpen ? 'bg-slate-900 text-white rotate-45' : 'bg-red-600 text-white'}`}
              title={isFormOpen ? "Close Form" : "Add New Event"}
            >
              <Icons.Plus />
            </button>
          )}
        </div>

        {/* ADMIN CONTROL PANEL */}
        {isAdmin && (isFormOpen || editingId) && (
          <div className="max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/30 border border-slate-100 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>

              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg">
                    <Icons.Plus />
                  </div>
                  {editingId ? 'Edit Event' : 'Add Event'}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Main Title</label>
                    <input
                      type="text" placeholder="e.g. Hope Hospital Blood Drive"
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-red-500 transition-all outline-none font-bold text-slate-700"
                      value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Event Date</label>
                    <input
                      type="date"
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-red-500 transition-all outline-none font-bold text-slate-700"
                      value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Maps Location Link</label>
                    <input
                      type="url" placeholder="https://maps.google.com/..."
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                      value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Coordinator Contact</label>
                    <input
                      type="text" placeholder="Phone or email"
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                      value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Feature Image URL</label>
                    <input
                      type="url" placeholder="https://..."
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-red-500 transition-all outline-none font-medium text-xs"
                      value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Brief Narrative</label>
                  <textarea
                    placeholder="Describe the clinical necessity or community story..."
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-red-500 transition-all outline-none font-medium h-28 resize-none"
                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-red-600 text-white p-5 rounded-2xl font-black hover:bg-slate-900 transition-all shadow-xl shadow-red-200/40 flex items-center justify-center gap-2 tracking-widest text-xs">
                    {editingId ? 'COMMIT CHANGES' : 'AUTHORIZE EVENT'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setIsFormOpen(false); setFormData({ title: '', date: '', location: '', description: '', imageUrl: '', contact: '' }); }}
                      className="px-8 bg-slate-100 text-slate-500 py-5 rounded-2xl font-bold hover:bg-slate-200 transition-all text-xs tracking-widest"
                    >
                      ABORT
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}


        {/* MAIN FEED */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-10 h-10 border-2 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
          </div>
        ) : processedEvents.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[4rem] border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
              <Icons.Calendar />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">No Active Events</h3>
            <p className="text-slate-400 font-medium max-w-sm mx-auto">Check back soon for upcoming donation events in your area.</p>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {processedEvents.map(ev => (
              <div key={ev._id} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-red-100/30 border border-slate-100 flex flex-col transition-all duration-500 hover:-translate-y-3">

                {/* Visual Header */}
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={ev.imageUrl || 'https://images.unsplash.com/photo-1615461066841-6116ecaaba7d?q=80&w=2000&auto=format&fit=crop'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Event"
                  />

                  {/* Glassmorphism Date Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/40 text-center">
                      <p className="text-red-600 text-[10px] font-black uppercase tracking-tighter leading-none">{new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                      <p className="text-slate-900 text-xl font-black leading-none mt-1">{new Date(ev.date).toLocaleDateString('en-US', { day: 'numeric' })}</p>
                    </div>
                  </div>

                  {/* Distance Badge */}
                  {ev.distance !== Infinity && (
                    <div className="absolute bottom-6 right-6 z-20">
                      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2 shadow-2xl">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{ev.distance.toFixed(1)} km away</span>
                      </div>
                    </div>
                  )}

                  {/* Verified Indicator */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                      <Icons.Verified />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified Event</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pb-10 flex flex-col grow">
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">
                      {ev.title}
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-red-50 text-red-600 rounded-lg shrink-0 mt-0.5"><Icons.Calendar /></div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduling</p>
                          <p className="text-sm font-bold text-slate-600 truncate">
                            {new Date(ev.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {ev.contact && (
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 bg-slate-50 text-slate-600 rounded-lg shrink-0 mt-0.5"><Icons.Phone /></div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coordinator</p>
                            <p className="text-sm font-bold text-slate-600">{ev.contact}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium line-clamp-3">
                      {ev.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4 pt-6 border-t border-slate-50 mt-auto">
                    <a href={ev.location} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-red-600 transition-all shadow-xl shadow-slate-200 tracking-widest">
                      <Icons.Location />
                      NAVIGATE TO VENUE
                    </a>

                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingId(ev._id); setFormData(ev); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="flex-1 py-3 px-2 bg-slate-50 text-slate-400 rounded-xl font-black text-[9px] flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all tracking-widest"
                        >
                          <Icons.Edit /> MODIFY
                        </button>
                        <button
                          onClick={() => deleteEvent(ev._id)}
                          className="flex-1 py-3 px-2 bg-red-50 text-red-400 rounded-xl font-black text-[9px] flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all tracking-widest"
                        >
                          <Icons.Trash /> TERMINATE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;