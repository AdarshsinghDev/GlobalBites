import React, { useState } from "react";
import axios from "axios";
import Logo from "../../components/ui/Logo";
const Profile = () => {
  const [fullname, setFullname] = useState(
    localStorage.getItem("storedFullname")
  );
  const [email, setEmail] = useState(localStorage.getItem("storedEmail"));
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        "https://globalbites-production.up.railway.app/api/auth/update-profile",
        { fullname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        localStorage.setItem("storedFullname", fullname);
        setLoading(false);
        alert("Profile Update successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 text-gray-800 px-4 py-8">
      {/* Decorative food elements */}
      <div className="fixed top-35 lg:top-10 left-10 opacity-40 text-2xl lg:text-8xl">
        🍽️
      </div>
      <div className="fixed top-20 right-20 opacity-40 text-2xl lg:text-6xl">
        🥗
      </div>
      <div className="fixed bottom-20 left-20 opacity-40 text-2xl lg:text-7xl">
        🍕
      </div>
      <div className="fixed bottom-10 right-10 opacity-40 text-2xl lg:text-5xl">
        🍔
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl z-[20] md:text-4xl font-bold bg-gradient-to-r from-green-600 to-orange-300 bg-clip-text text-transparent mb-2">
            Chef Profile
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Enhanced Banner Header with food pattern */}
          <div className="relative bg-gradient-to-r from-green-600 via-lime-500 to-amber-400 lg:h-52 h-36 flex items-center justify-center">
            {/* Subtle food pattern overlay */}
            <Logo logoStyle={"text-xl"} />
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-4 left-8 text-2xl">🌿</div>
              <div className="absolute top-8 right-12 text-2xl">🍃</div>
              <div className="absolute top-12 left-1/3 text-xl">🥕</div>
              <div className="absolute top-6 right-1/3 text-xl">🌶️</div>
              <div className="absolute bottom-8 left-12 text-2xl">🍅</div>
              <div className="absolute bottom-4 right-8 text-2xl">🧄</div>
            </div>

            {/* Profile image with enhanced styling */}
            <div className="absolute -bottom-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-md opacity-50 scale-80"></div>
                <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="Profile"
                  className="relative rounded-full border-4 border-white lg:w-28 lg:h-28 w-20 h-20   object-cover shadow-xl"
                />
                <div className="absolute text-xl -bottom-1 -right-1 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                  👨‍🍳
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Info */}
          <div className="pt-20 pb-12 px-8 md:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {fullname}
              </h2>
              <div className="flex gap-1 items-center justify-center text-gray-600 mb-4">
                <div className="p-1 rounded-full text-2xl">📧</div>
                <p className="">{email}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 inline-flex">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Professional Chef
              </div>
            </div>

            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 lg:gap-8 gap-2">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">👤</span>
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullname"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-white border-2 min-h-[50px] border-gray-200 py-4 px-5 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-green-50/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">📧</span>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="chef@fooddelivery.com"
                      readOnly
                      className="w-full cursor-not-allowed  min-h-[50px] bg-gray-50 border-2 border-gray-200 py-4 px-5 rounded-2xl text-gray-500 shadow-sm"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        Read Only
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">📱</span>
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="9876543210"
                      className="w-full bg-white border-2  min-h-[50px] border-gray-200 py-4 px-5 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-green-50/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-lg">📍</span>
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ballia, Uttar Pradesh"
                      className="w-full bg-white border-2  min-h-[50px] border-gray-200 py-4 px-5 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-green-50/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Section */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-3xl p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Ready to Update?
                    </h3>
                    <p className="text-gray-600">
                      Save your changes to keep your chef profile up to date
                    </p>
                  </div>

                  <button className="group relative px-4 py-2 lg:px-8 lg:py-4 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold text-lg hover:from-green-700 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
                    <span className="flex items-center gap-1 justify-center ">
                      {loading ? (
                        <>
                          <div className="text-center  flex items-center justify-center">
                            <div className="animate-spin h-7 w-7 border-4  border-t-transparent rounded-full">
                              {" "}
                            </div>
                            <p className="text-xl">&nbsp; Saving...</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-xl">👨‍🍳</span>
                          Save Profile
                          <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">
                            →
                          </span>{" "}
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </form>

            {/* Additional Food-themed Footer */}
            <div className="mt-12 text-center">
              <div className="flex items-center justify-center gap-4 text-2xl opacity-70">
                <span>🍽️</span>
                <span>•</span>
                <span>🥗</span>
                <span>•</span>
                <span>🍕</span>
                <span>•</span>
                <span>🍔</span>
                <span>•</span>
                <span>🍜</span>
              </div>
              <p className="text-gray-500 text-sm mt-3">
                Crafting delicious experiences, one dish at a time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
