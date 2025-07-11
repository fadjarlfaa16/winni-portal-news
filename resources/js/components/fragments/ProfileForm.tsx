import React, { useState } from 'react';

export interface ProfileData {
    fullname: string;
    profilePath: string;
    domicile: string;
    birth: string;
}

interface ProfileFormProps {
    initial: ProfileData;
    onSave: (data: ProfileData) => void;
    loading?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initial, onSave, loading }) => {
    const [form, setForm] = useState<ProfileData>(initial);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-xl shadow p-6 space-y-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Link (URL)</label>
                <input
                    type="url"
                    name="profilePath"
                    value={form.profilePath}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourprofile.com"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Domicile</label>
                <input
                    type="text"
                    name="domicile"
                    value={form.domicile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your domicile/city"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Birth Date</label>
                <input
                    type="date"
                    name="birth"
                    value={form.birth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Save Profile'}
            </button>
        </form>
    );
};

export default ProfileForm; 