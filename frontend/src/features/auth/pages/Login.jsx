import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useLoginMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfile } from "../authSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      dispatch(setProfile(res?.user));
      toast.success(res?.data?.message || "Login successful!", {
        position: "bottom-right",
      });
      const role = res?.user?.role;
      switch (role) {
        case "director":
        case "admin":
          navigate("/director", { replace: true });
          break;
        case "secretary":
          navigate("/", { replace: true });
          break;
            case "approvedlawyer":
          navigate("/approvedlawyer", { replace: true });
          break;
        case "lawyer":
          navigate("/lawyer", { replace: true });
          break;
        default:
          navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Invalid email or password!",
        { position: "bottom-right" }
      );
    }
  };

 return (
  <div
    className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden 
               bg-gradient-to-br from-slate-200 to-slate-300"
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10 select-none pointer-events-none 
                    flex items-center justify-center text-[120px] font-extrabold 
                    text-slate-700 tracking-widest">
      E!E!E@
    </div>

    {/* Login Card */}
    <div className="relative bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl 
                    w-full max-w-md border border-slate-200">
      
      <h1 className="text-3xl font-extrabold text-center mb-2 text-slate-700">
        Welcome Back
      </h1>

      <p className="text-center text-slate-600 mb-8 text-sm">
        Please login to your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-slate-700 font-medium mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl bg-slate-50 
                       focus:outline-none focus:ring-2 focus:ring-slate-700 transition-all"
          />
        </div>

        {/* Password */}
       <div>
  <label
    htmlFor="password"
    className="block text-slate-700 font-medium mb-1"
  >
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border rounded-xl bg-slate-50 
                 focus:outline-none focus:ring-2 focus:ring-slate-700 transition-all"
    />

    {/* Icon Toggle */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 focus:outline-none"
    >
      {showPassword ? (
        <FiEyeOff className="w-5 h-5" />
      ) : (
        <FiEye className="w-5 h-5" />
      )}
    </button>
  </div>
</div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white py-3 rounded-xl text-lg font-medium shadow-md transition-all ${
            isLoading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-700 hover:bg-slate-800 hover:shadow-lg"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Extra Links */}
        <div className="text-center text-sm mt-4 text-slate-600">
          <p>
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-slate-700 hover:underline font-semibold"
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
);

};

export default Login;
