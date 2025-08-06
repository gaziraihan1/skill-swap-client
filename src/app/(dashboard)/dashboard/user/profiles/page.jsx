'use client';

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Image from 'next/image';

const Skeleton = ({ className }) => (
  <div
    className={`bg-gray-300 animate-pulse rounded ${className}`}
    aria-hidden="true"
  />
);

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState({});
  const [originalProfile, setOriginalProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (user?.email && !editing) {
      setLoading(true);
      axiosSecure.get(`/users/${user.email}`).then(res => {
        const profileData = res.data || {};
        setProfile(profileData);
        setOriginalProfile(profileData);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [user, editing]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = profile.photo;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await res.json();
        if (!data.secure_url) throw new Error('Image upload failed');
        imageUrl = data.secure_url;

        await updateUser({ photoURL: imageUrl });
      }

      const updatedProfile = {
        ...profile,
        photo: imageUrl,
      };

      const { _id, ...sanitizedProfile } = updatedProfile;

      await axiosSecure.put(`/users/${user.email}`, sanitizedProfile);
      await axiosSecure.patch(`/offers?userEmail=${user?.email}`, { userPhoto: imageUrl, userName: profile.name });

      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
      setEditing(false);
      setImageFile(null);
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Failed to update profile. See console for details.');
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <p className="text-center py-10">Loading user...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {loading ? (
        <form className="space-y-6">
          <div className="flex flex-col gap-2 items-start">
            <Skeleton className="w-[100px] h-[100px] rounded-full" />
          </div>
          <Skeleton className="w-full h-10 rounded" />
          <Skeleton className="w-full h-24 rounded" />
          <div className="flex gap-4">
            <Skeleton className="w-24 h-10 rounded" />
            <Skeleton className="w-24 h-10 rounded" />
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2 items-start">
            <label className="block text-sm font-medium">Profile Picture</label>

            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full h-25 w-25 object-cover border"
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-full border bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!editing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!editing}
            />
          </div>

          {editing && (
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={uploading}
              >
                {uploading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="border px-4 py-2 rounded"
                onClick={() => {
                  setProfile(originalProfile);
                  setEditing(false);
                  setImageFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      )}

      {!editing && !loading && (
        <button
          type="button"
          className="bg-gray-700 text-white px-4 py-2 rounded mt-6"
          onClick={() => setEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
