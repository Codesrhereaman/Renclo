import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Edit2, 
  LogOut, 
  X,
  Save,
  User,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context api/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!editData.fullName.trim()) {
      setError('Full name cannot be empty');
      return;
    }

    if (!editData.phone.trim()) {
      setError('Phone number cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      updateProfile({
        fullName: editData.fullName,
        phone: editData.phone,
      });

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Backdrop - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Profile Card Modal */}
      <div
        className={`fixed md:absolute bottom-0 md:bottom-auto md:top-full right-0 md:right-0 w-full md:w-96 bg-white rounded-t-3xl md:rounded-xl shadow-2xl z-50 max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 md:opacity-100 md:visible' : 'translate-y-full md:opacity-0 md:invisible md:pointer-events-none'
        }`}
      >
        {/* Header Bar */}
        <div className="md:hidden h-1 bg-gray-300 rounded-full mx-auto mt-2 w-10" />

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex justify-between items-center md:bg-white md:border-b md:border-gray-100">
          <h2 className="text-lg font-bold text-white md:text-gray-900">My Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 md:hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-white md:text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-70px)] pb-4">
          <div className="px-6 py-6 space-y-5">
            {/* Avatar Section */}
            <div className="flex flex-col items-center pb-4 border-b border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-3">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            {/* Messages */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex gap-2">
                <div className="text-green-600 font-bold flex-shrink-0">✓</div>
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {!isEditing ? (
              <>
                {/* View Mode */}
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">PHONE</p>
                      <p className="text-sm text-gray-900 font-medium">{user.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  {/* Auth Method */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">AUTH METHOD</p>
                      <span className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold mt-1">
                        {user.authMethod || 'Email'}
                      </span>
                    </div>
                  </div>

                  {/* Account Created */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">JOINED</p>
                      <p className="text-sm text-gray-900 font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setError('');
                      }}
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-200 transition font-semibold text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Edit Mode */}
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  {/* Full Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleEditChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm font-medium"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Display (Read-only) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed text-sm font-medium"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleEditChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm font-medium"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({
                          fullName: user.fullName,
                          phone: user.phone || '',
                        });
                        setError('');
                      }}
                      className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition font-semibold text-sm"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
