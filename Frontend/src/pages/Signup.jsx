// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = e =>
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/signup", form);
//       if (res.data.success) {
//         navigate("/home");
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black to-yellow-500 px-4 py-8">
//       <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 space-y-6">
//         <h1 className="text-3xl font-extrabold text-center text-gray-800">Create Account</h1>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             type="text"
//             placeholder="Full Name"
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//             required
//           />
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//             required
//           />
//           <input
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-yellow-500 to-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-yellow-600 font-medium hover:underline">
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }





















// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function Signup() {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Normally you'd send this data to your backend
//     const newUser = { name };
//     setUser(newUser); // set user in context
//     navigate("/"); // redirect to homepage
//   };

//   return (
//     <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//       <input
//         type="text"
//         placeholder="Your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full mb-4 px-3 py-2 border rounded"
//         required
//       />
//       <button
//         type="submit"
//         className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
//       >
//         Sign Up
//       </button>
//     </form>
//   );
// }















import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ✅ useAuth for setting user

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ Get setUser from AuthContext

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);

      if (res.data.success) {
        // ✅ Set user in context
        setUser({ name: form.name });

        // ✅ Redirect after signup
        navigate("/home");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black to-yellow-500 px-4 py-8">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Create Account</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
