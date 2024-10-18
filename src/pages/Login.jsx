import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password validation
    if (password.length < 8) {
      setError("Password must be at least of 8 characters.");
      setEmail("");
      setPassword("");
      return;
    }
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (error) {
      setError("Login failed. Please check your Email or Password");
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 relative">
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center p-8 background-gradient z-10 w-full lg:h-screen lg:w-auto">
        <div className="w-full max-w-md space-y-8 bg-blue-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-800 text-center">
            Login
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="py-4">
                <label>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-blue-100 background-gradient focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:h-full bg-cover bg-center right-backgroundImg"></div>
    </div>
  );
};

export default Login;
