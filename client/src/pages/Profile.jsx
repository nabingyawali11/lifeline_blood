import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Icons = {
    User: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    Mail: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7 8.914M3 8l7-8.914M3 8h18M21 8l-7 8.914M21 8l-7-8.914" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    Phone: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    ),
    Droplet: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 00-3.86.517L5.594 15.12a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 001.414 3.414h16.828a2 2 0 001.414-3.414l-2.387-2.387zM12 2C9.243 2 7 4.243 7 7c0 4 5 13 5 13s5-9 5-13c0-2.757-2.243-5-5-5z" />
        </svg>
    ),
    Calendar: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    Camera: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Shield: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    Info: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Alert: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    Home: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    Heart: () => (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
    ),
    Activity: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    Settings: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
};

const getFirstName = (fullName, email) => {
    if (fullName) return fullName.split(' ')[0];
    return email?.split('@')[0] || 'User';
};

const BLOOD_FACTS = {
    'A+': 'Patients with A+ can receive blood from A+, A-, O+, and O- donors.',
    'A-': 'A- is considered a universal type for platelets and plasma.',
    'B+': 'B+ is found in approximately 9% of the population.',
    'B-': 'B- is one of the rarest blood types, found in only 2% of the population.',
    'O+': 'O+ is the most common blood type, making it vital for hospital supplies.',
    'O-': 'O- is the universal donor type, crucial for emergency transfusions.',
    'AB+': 'AB+ is the universal recipient for red blood cells.',
    'AB-': 'AB- is the rarest blood type in the world.',
};

const Profile = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = storedUser.role === 'admin';

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState(
        storedUser.email ? localStorage.getItem(`userProfilePic_${storedUser.email}`) : null
    );
    const [isAvailable, setIsAvailable] = useState(true);
    const [toggling, setToggling] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [justUploaded, setJustUploaded] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!storedUser.email || isAdmin) { setLoading(false); return; }
            try {
                const res = await fetch(`${API_URL}/users/email/${storedUser.email}`);
                if (res.ok) {
                    const data = await res.json();
                    setProfileData(data);
                    setIsAvailable(data.donor?.isAvailable ?? true);
                }
            } catch (err) {
                console.error('Could not fetch profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [API_URL, storedUser.email]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast.error('Please select an image file under 5MB.'); return; }
        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
            if (storedUser.email) {
                localStorage.setItem(`userProfilePic_${storedUser.email}`, reader.result);
            }
            setUploading(false);
            setJustUploaded(true);
            setTimeout(() => setJustUploaded(false), 3000);
        };
        reader.readAsDataURL(file);
    };

    const handleToggleAvailability = async () => {
        if (!profileData?.user?.email) return;
        setToggling(true);
        try {
            const res = await fetch(`${API_URL}/users/email/${profileData.user.email}/availability`, { method: 'PATCH' });
            if (res.ok) {
                const data = await res.json();
                setIsAvailable(data.isAvailable);
            }
        } catch (err) {
            console.error('Toggle error:', err);
        } finally {
            setToggling(false);
        }
    };

    const fullName = profileData?.user?.fullName;
    const bloodGroup = profileData?.user?.bloodGroup;
    const firstName = getFirstName(fullName, storedUser.email);
    const joinDate = profileData?.user?.createdAt
        ? new Date(profileData.user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    const initials = (fullName || storedUser.email || 'U')
        .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-24 pb-12">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="relative group">
                                <div
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer shadow-sm border border-gray-200 transition-colors group-hover:bg-gray-200"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {uploading ? (
                                        <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                    ) : profilePic ? (
                                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl md:text-4xl font-semibold text-gray-500 tracking-tight select-none">
                                            {initials}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow border border-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer hover:bg-gray-50 hover:text-gray-900"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Icons.Camera />
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </div>

                            <div className="text-center md:text-left pt-2">
                                {loading ? (
                                    <div className="space-y-3">
                                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
                                        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
                                    </div>
                                ) : (
                                    <>
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                            {fullName || (isAdmin ? 'System Administrator' : storedUser.email)}
                                        </h1>
                                        <p className="text-gray-500 font-medium mt-1">{storedUser.email}</p>

                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                                            {bloodGroup && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    Blood Type {bloodGroup}
                                                </span>
                                            )}
                                            {isAdmin && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                    Administrator
                                                </span>
                                            )}
                                            {joinDate && (
                                                <span className="inline-flex items-center text-sm text-gray-500">
                                                    <span className="mr-1.5"><Icons.Calendar /></span>
                                                    Joined {joinDate}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {!isAdmin && profileData?.donor && (
                            <div className="flex flex-col items-center md:items-end md:justify-start mt-4 md:mt-0">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center md:items-end w-full md:w-auto">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                        Donor Status
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                                            {isAvailable ? 'Available to Donate' : 'Currently Unavailable'}
                                        </span>
                                        <button
                                            onClick={handleToggleAvailability}
                                            disabled={toggling}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${isAvailable ? 'bg-green-600' : 'bg-gray-300'
                                                } ${toggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            role="switch"
                                            aria-checked={isAvailable}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAvailable ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {!isAdmin && bloodGroup && (
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4 items-start">
                                <div className="text-blue-600 flex-shrink-0 mt-0.5">
                                    <Icons.Info />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Type {bloodGroup} Information</h4>
                                    <p className="text-sm text-blue-800">{BLOOD_FACTS[bloodGroup]}</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
                                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                    <Icons.User />
                                    Profile Details
                                </h3>
                            </div>

                            <div className="px-6 py-5">
                                {loading ? (
                                    <div className="space-y-6">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                                            </div>
                                        ))}
                                    </div>
                                ) : isAdmin ? (
                                    <dl className="divide-y divide-gray-100">
                                        <InfoBlock label="Role" value="System Administrator" />
                                        <InfoBlock label="Email Address" value={storedUser.email} />
                                        <InfoBlock label="Access Level" value="Full System Access" />
                                        <InfoBlock label="Status" value="Active" />
                                    </dl>
                                ) : profileData ? (
                                    <dl className="divide-y divide-gray-100">
                                        <InfoBlock label="Full Name" value={profileData.user.fullName} />
                                        <InfoBlock label="Email Address" value={profileData.user.email} />
                                        <InfoBlock label="Phone Number" value={profileData.user.contactNo} />
                                        <InfoBlock label="Blood Group" value={profileData.user.bloodGroup} />
                                        <InfoBlock label="Age" value={profileData.user.age ? `${profileData.user.age} Years` : 'Not specified'} />
                                    </dl>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400 mb-4">
                                            <Icons.User />
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900">No data found</h3>
                                        <p className="mt-1 text-sm text-gray-500">Could not retrieve your profile information.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <Icons.Activity />
                                    Quick Actions
                                </h3>
                            </div>
                            <div className="p-4 space-y-3">
                                <ActionLink to="/request" label="Request Blood" description="Log an urgent requirement" icon={<Icons.Alert />} isPrimary color="red" />
                                <ActionLink to="/events" label="Donation Events" description="View upcoming local drives" icon={<Icons.Calendar />} color="indigo" />
                                {isAdmin && (
                                    <ActionLink to="/dashboard" label="Admin Dashboard" description="Manage users and events" icon={<Icons.Shield />} color="gray" />
                                )}
                            </div>
                        </div>

                        <div className="bg-indigo-600 rounded-xl shadow-sm overflow-hidden text-white">
                            <div className="p-6">
                                <h4 className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-2">
                                    Impact Summary
                                </h4>
                                <p className="text-xl font-bold mb-3">
                                    {isAdmin ? 'System Operational' : 'Ready to Save Lives'}
                                </p>
                                <p className="text-indigo-100 text-sm leading-relaxed">
                                    {isAdmin
                                        ? 'Platform connectivity is stable. You are actively managing donor and patient connections.'
                                        : 'Your availability ensures that local hospitals and patients have immediate access to life-saving blood.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoBlock = ({ label, value }) => (
    <div className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-sm font-medium text-gray-900 sm:text-right">{value || '-'}</dd>
    </div>
);

const ActionLink = ({ to, label, description, icon, isPrimary, color }) => {
    const colorClasses = {
        red: isPrimary ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100',
        indigo: isPrimary ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
        gray: isPrimary ? 'bg-gray-800 hover:bg-gray-900 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200',
    };

    const iconColors = {
        red: isPrimary ? 'text-red-200' : 'text-red-600',
        indigo: isPrimary ? 'text-indigo-200' : 'text-indigo-600',
        gray: isPrimary ? 'text-gray-400' : 'text-gray-500',
    };

    return (
        <Link
            to={to}
            className={`flex items-start p-3 w-full rounded-lg transition-colors duration-200 ${colorClasses[color]}`}
        >
            <div className={`flex-shrink-0 mt-0.5 ${iconColors[color]}`}>
                {icon}
            </div>
            <div className="ml-3 flex-1 text-left">
                <p className={`text-sm font-medium ${isPrimary ? 'text-white' : 'text-gray-900'}`}>{label}</p>
                <p className={`text-xs mt-0.5 ${isPrimary ? 'text-[rgba(255,255,255,0.8)]' : 'text-gray-500'}`}>{description}</p>
            </div>
        </Link>
    );
};

export default Profile;
