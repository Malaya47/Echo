import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((s) => s),
      };

      await axios.post(`${BASE_URL}/signup`, payload, {
        withCredentials: true,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-xl bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-4xl font-bold text-center text-primary mb-6">
          Create Account
        </h2>

        {error && <div className="alert alert-error text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                minLength="4"
                maxLength="50"
                required
                className="input input-bordered w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                maxLength="50"
                className="input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              name="emailId"
              required
              className="input input-bordered w-full"
              value={formData.emailId}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              name="password"
              minLength="8"
              required
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must include uppercase, lowercase, number & symbol
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Age</label>
              <input
                type="number"
                name="age"
                min="18"
                max="100"
                className="input input-bordered w-full"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label font-medium">Gender</label>
              <select
                name="gender"
                className="select select-bordered w-full"
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label font-medium">Profile Photo URL</label>
            <input
              type="url"
              name="photoUrl"
              className="input input-bordered w-full"
              placeholder="Optional"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-medium">About</label>
            <textarea
              name="about"
              rows="3"
              className="textarea textarea-bordered w-full"
              placeholder="Tell us about yourself..."
              value={formData.about}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              className="input input-bordered w-full"
              placeholder="e.g. JavaScript, React, MongoDB"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full text-white text-lg"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
