import React, { useState } from "react";
import { useUserContext } from "../../context/CreateContext";

const Settings = () => {
  const { userContextData } = useUserContext();
  const email = userContextData.email;
  const fullname = userContextData.fullname;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleLogout = () => {
    localStorage.clear("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 text-gray-800 p-4">
      {/* Decorative food elements */}
      <div className="fixed top-8 left-8 opacity-10 text-6xl">⚙️</div>
      <div className="fixed top-16 right-16 opacity-10 text-5xl">🍽️</div>
      <div className="fixed bottom-20 left-16 opacity-10 text-7xl">🥗</div>
      <div className="fixed bottom-8 right-8 opacity-10 text-6xl">👨‍🍳</div>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-green-600 bg-clip-text text-transparent mb-2">
            Kitchen Settings
          </h1>
          <p className="text-gray-600 lg:text-lg">
            Manage your culinary experience
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-green-500 p-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/80?img=5"
                  alt="Profile"
                  className="rounded-full border-4 border-white w-20 h-20 object-cover shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                  ⚙️
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {fullname}
                </h2>
                <p className="text-orange-100 text-lg">{email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  <span className="text-white text-sm">Account: Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-12 space-y-10">
            {/* Profile Settings Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl lg:p-8 p-4 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500 p-1 rounded-xl text-white ">
                  👤
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Edit Profile
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span>👨‍🍳</span> Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 min-h-[50px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-green-50/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder={fullname}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span>👨</span> Username
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3  min-h-[50px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-green-50/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="@chef_master"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span>📝</span> Bio
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-green-50/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="Tell us about your culinary journey..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span>🖼️</span> Profile Picture
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-3 min-h-[70px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-white file:cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Account Security Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl lg:p-8 p-4 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500 p-1 rounded-xl text-white text-xl">
                  🔒
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Account Security
                </h3>
              </div>

              <div className="space-y-6">
                {/* Change Email */}
                <div className="bg-white rounded-xl lg:p-5 p-3 shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between lg:flex-row flex-col lg:gap-0 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📧</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Change Email
                        </h4>
                        <p className="text-sm text-gray-600">
                          Update and verify your email address
                        </p>
                      </div>
                    </div>
                    <button className="px-4 lg:py-2 py-1  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md">
                      Update
                    </button>
                  </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔑</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Change Password
                        </h4>
                        <p className="text-sm text-gray-600">
                          Reset or change your password
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="password"
                      className="w-full px-4 py-3 min-h-[50px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 transition-all duration-300"
                      placeholder="Current Password"
                    />
                    <input
                      type="password"
                      className="w-full px-4 py-3 min-h-[50px] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 transition-all duration-300"
                      placeholder="New Password"
                    />
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔐</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-600">
                          Secure login using OTP or authenticator apps
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* App Preferences Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl lg:p-8 p-4 border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500 p-1 rounded-xl text-white text-xl">
                  🎨
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  App Preferences
                </h3>
              </div>

              <div className="space-y-6">
                {/* Dark Mode */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {isDarkMode ? "🌙" : "☀️"}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Dark Mode / Theme
                        </h4>
                        <p className="text-sm text-gray-600">
                          Toggle light/dark/custom theme
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={(e) => setIsDarkMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                {/* Language */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌍</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Language
                        </h4>
                        <p className="text-sm text-gray-600">
                          Switch UI language
                        </p>
                      </div>
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-white"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Accounts */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl lg:p-8  p-4 border border-cyan-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-200 p-1 rounded-xl text-white text-xl">
                  🌐
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Social Accounts
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📘</span>
                    <span className="font-medium">Facebook</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Connect
                  </button>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📷</span>
                    <span className="font-medium">Instagram</span>
                  </div>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                    Connect
                  </button>
                </div>
              </div>
            </div>

            {/* Legal & Privacy */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl lg:p-8  p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gray-500 p-1 rounded-xl text-white text-xl">
                  📋
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Privacy & Terms
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📜</span>
                    <span className="font-medium text-gray-800">
                      Privacy Policy
                    </span>
                  </div>
                </button>
                <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <span className="font-medium text-gray-800">
                      Terms of Service
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md font-medium">
                    Cancel
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-xl hover:from-green-700 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                    Save Changes
                  </button>
                </div>

                {/* Logout & Delete */}
                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    onClick={() => handleLogout()}
                    className="px-5 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                  <button className="px-6 py-3 text-white bg-gradient-to-r from-red-600 to-red-500 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                    ⚠️ Delete Account
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-red-800">
                      Delete My Account
                    </h4>
                    <p className="text-sm text-red-600">
                      Permanently delete all user data - this action cannot be
                      undone
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-12">
              <div className="flex items-center justify-center gap-4 text-2xl opacity-30 mb-4">
                <span>🍽️</span>
                <span>•</span>
                <span>⚙️</span>
                <span>•</span>
                <span>👨‍🍳</span>
                <span>•</span>
                <span>🥗</span>
                <span>•</span>
                <span>🔒</span>
              </div>
              <p className="text-gray-500 text-sm">
                Your culinary journey, perfectly configured
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
