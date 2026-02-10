import { useState, useEffect } from "react";
import { initUserProfileAnimations } from "../animations/userProfileAnimations";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Save,
  X,
  LogOut,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context api/AuthContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure DOM is ready before initializing animations
    const timer = setTimeout(() => {
      initUserProfileAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, [user]);

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Please log in first
            </h2>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!editData.fullName.trim()) {
      setError("Full name cannot be empty");
      return;
    }

    if (!editData.phone.trim()) {
      setError("Phone number cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      updateProfile({
        fullName: editData.fullName,
        phone: editData.phone,
      });

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-8 py-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-purple-600">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {user.fullName}
                  </h1>
                  <p className="text-purple-100">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8">
              {/* Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700 font-medium">{success}</p>
                </div>
              )}

              {!isEditing ? (
                <>
                  {/* View Mode */}
                  <div className="space-y-6">
                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            Phone
                          </p>
                        </div>
                        <p className="text-lg text-gray-900 font-medium">
                          {user.phone || "Not provided"}
                        </p>
                      </div>

                      {/* Auth Method */}
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-5 h-5 text-gray-400" />
                          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            Auth Method
                          </p>
                        </div>
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {user.authMethod || "Email"}
                        </span>
                      </div>

                      {/* Join Date */}
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            Joined
                          </p>
                        </div>
                        <p className="text-lg text-gray-900 font-medium">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>

                      {/* Email */}
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            Email
                          </p>
                        </div>
                        <p className="text-base text-gray-900 font-medium break-all">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setError("");
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        <Edit2 className="w-5 h-5" />
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-lg hover:bg-red-200 transition font-semibold"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Edit Mode */}
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={editData.fullName}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-base"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address (Cannot be changed)
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed text-base"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-base"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditData({
                            fullName: user.fullName,
                            phone: user.phone || "",
                          });
                          setError("");
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                      >
                        <X className="w-5 h-5" />
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                Your profile information is securely stored and can be updated
                at any time. Your email address cannot be changed for security
                reasons.
              </p>
              <p>
                If you need to change your password, please use the "Forgot
                Password" feature from the login page.
              </p>
              <p>
                For any account-related issues or support, please contact our
                support team.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
