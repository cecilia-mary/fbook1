"use client";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
const handleLogin = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  
  const userData = {
    name: "Flipbook User",
    email: email,
    password: password,
  };

  localStorage.setItem("user", JSON.stringify(userData));

  router.push("/home");
};

  const slides = [
    [
      { title: "Create Flipbooks", text: "Turn your PDFs into stunning digital flipbooks." },
      { title: "Customize Easily", text: "Add titles, themes, and effects in a few clicks." },
      { title: "Share Anywhere", text: "Send your flipbook links to anyone instantly." },
    ],
    [
      { title: "Fast Uploads", text: "Upload files in seconds and preview instantly." },
      { title: "Smooth Animation", text: "Enjoy realistic page-turn effects." },
      { title: "Modern UI", text: "A clean and simple design for better reading." },
    ],
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl flex overflow-hidden">

        <div className="w-1/2 bg-gradient-to-br from-green-200 to-green-300 flex flex-col items-center text-black p-6">
          <div className="w-40 h-40 mt-6 mb-4 flex items-center justify-center">
            <img src="/image/logo.png" alt="Flipbook Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Welcome to Flipbook Creator</h2>

          <div className="flex flex-col items-start w-full px-6">
            {slides[currentIndex].map((feature, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-black">{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          <p className="mt-6 text-sm text-black">Loved by creators worldwide </p>
        </div>

        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Login to Continue</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Access your flipbooks and continue creating magic 
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
            </div>
    
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

        
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
                Remember me
              </label>
              <button type="button" className="text-green-600 font-medium hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90 transition"
            >
              Login
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-600 font-medium hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
