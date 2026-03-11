import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = storedUser.role === 'admin';

    useEffect(() => {
        if (!isAdmin) return;
        fetchUnverifiedDonors();
    }, [isAdmin]);

    const fetchUnverifiedDonors = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/unverified-donors`);
            const data = await res.json();
            setDonors(data);
        } catch (error) {
            console.error('Failed to fetch unverified donors:', error);
        } finally {
            setLoading(false);
        }
    };

    const verifyDonor = async (donorId) => {
        try {
            const res = await fetch(`${API_URL}/admin/verify-donor/${donorId}`, {
                method: 'PATCH'
            });
            if (res.ok) {
                toast.success('Donor successfully verified!');
                setDonors(donors.filter(d => d._id !== donorId));
            } else {
                toast.error('Error verifying donor');
            }
        } catch (error) {
            console.error('Error verifying donor:', error);
            toast.error('Could not verify donor');
        }
    };

    const rejectDonor = async (donorId) => {
        if (!window.confirm("Are you sure you want to decline this registration? This will delete the user's account data.")) return;
        try {
            const res = await fetch(`${API_URL}/admin/reject-donor/${donorId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                toast.success('Registration declined and removed.');
                setDonors(donors.filter(d => d._id !== donorId));
            } else {
                toast.error('Error rejecting donor');
            }
        } catch (error) {
            console.error('Error rejecting donor:', error);
            toast.error('Could not reject donor');
        }
    };

    const openImage = (base64Str) => {
        const win = window.open();
        win.document.write(`<iframe src="${base64Str}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-xl font-bold text-gray-500">Access Denied. Admins only.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Admin Dashboard</h1>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Pending Donor Verifications</h2>
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {donors.length} Pending
                        </span>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500 font-medium">Loading donors...</div>
                    ) : donors.length === 0 ? (
                        <div className="p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
                            <p className="mt-1 text-sm text-gray-500">There are no pending donor verifications.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {donors.map(donor => (
                                <li key={donor._id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-gray-900">{donor.fullName}</h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                Type {donor.bloodGroup}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 grid sm:grid-cols-2 gap-2">
                                            <p><strong className="font-semibold text-gray-700">Phone:</strong> {donor.phoneNumber}</p>
                                            <p><strong className="font-semibold text-gray-700">Coordinates:</strong> {donor.lat.toFixed(4)}, {donor.lon.toFixed(4)}</p>
                                        </div>
                                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                            <button
                                                onClick={() => verifyDonor(donor._id)}
                                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Approve & Verify
                                            </button>
                                            <button
                                                onClick={() => rejectDonor(donor._id)}
                                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-64 h-64 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 relative">
                                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow">
                                            {donor.proofType || 'Proof Document'}
                                        </div>
                                        {donor.proofDocument ? (
                                            donor.proofDocument.startsWith('data:application/pdf') ? (
                                                <embed src={donor.proofDocument} type="application/pdf" className="w-full h-full" />
                                            ) : (
                                                <div onClick={() => openImage(donor.proofDocument)} className="w-full h-full block cursor-pointer group hover:bg-black">
                                                    <img src={donor.proofDocument} alt="Proof" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">View Full</span>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            <span className="text-sm text-gray-400 font-medium">No Document Uploaded</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
