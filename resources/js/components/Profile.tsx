import React, { useEffect, useState } from 'react';
import ProfileForm, { ProfileData } from './fragments/ProfileForm';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { token } = useAuth();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchProfile();
    }, [token]);

    const handleSave = async (data: ProfileData) => {
        setLoading(true);
        setSuccess(false);
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            setSuccess(true);
            setProfile(data);
            setTimeout(() => setSuccess(false), 2000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-xl mx-auto">
                <div className="flex justify-center mb-6">
                  {profile && profile.profilePath ? (
                    <img
                      src={profile.profilePath}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-gray-100"
                      onError={e => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=User&background=ddd&color=555')}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 border-4 border-white shadow-lg">
                      <span>
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c3.866 0 7 1.343 7 3v2H5v-2c0-1.657 3.134-3 7-3zm0-2a4 4 0 100-8 4 4 0 000 8z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center font-semibold">
                        Profile updated successfully!
                    </div>
                )}
                {profile && (
                    <ProfileForm initial={profile} onSave={handleSave} loading={loading} />
                )}
                {!profile && (
                    <div className="text-center text-gray-400">Loading profile...</div>
                )}
            </div>
        </div>
    );
};

export default Profile;