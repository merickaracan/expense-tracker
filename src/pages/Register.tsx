import {useNavigate} from "react-router-dom";
import {useState} from "react";
import React from "react";
import axios from "axios";

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const validPassword = (password: string): boolean => {
        return(
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password)
        );
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    

    if (!name || !email || !password || !confirmPassword){
        setError("Check information");
        return;
    }

    if (!validPassword(password)){
        setError("The password does not match the requirements.")
        return;
    }

    if (password != confirmPassword){
        setError("The passwords do not match.")
        return;
    }

    try{
        const result = await axios.post("https://meric-trackerknex.mhkb1d.easypanel.host/api/auth/signup", {
            name,
            email,
            password,
        });

        console.log(result);

        if (result.status == 201){
            console.log("signup successful");
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("user", JSON.stringify(result.data.token));
            localStorage.setItem("userName", name);
            alert("Sign up successful");
            navigate("/login");
        }
      }catch (err){
            setError("Sign up failed");
        }
    };

    return(
        <div className="flex items-center justify-center h-screen bg-blue-300">
        <div className="bg-blue-200 p-10 rounded-lg shadow-lg w-96 text-center">
          <div className="flex justify-center mb-5">
          </div>
          <p className="mt-2 text-lg font-medium">Sign up</p>
          {error && <p className="text-red-600">{error}</p>}
  
          <form className="mt-4 space-y-4" onSubmit={handleRegister}>

            <div className="text-left">
              <label className="block font-medium">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="text-left">
              <label className="block font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="text-left">
              <label className="block font-medium">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="text-left">
              <label className="block font-medium">Confirm password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>
  
          <p className="mt-4 text-sm">
            Back to login?{" "}
            <a href="/" className="text-blue-600 font-semibold underline">
              Go Back
            </a>
          </p>
        </div>
      </div>
    );
}

export default Register;