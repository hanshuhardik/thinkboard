import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "./lib/axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  if(localStorage.getItem("id"!=null)){
    navigate("/home")
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!isLogin) {
      console.log("signUp Data:", {
        name:formData.name,
        email: formData.email,
        password: formData.password,
      });
      const username=formData.name;
      const email=formData.email;
      const password=formData.password;
      try {
      const user=await api.post("/users/create",
        { username,email,password});
        toast.success("User created Successfully🎉")
        console.log(user)
        localStorage.setItem("id",user.data.user)
        setTimeout(()=>{
             navigate("/home")
        },5000)
       
    } catch (error) {
        console.log(error);
      if(error.response?.status==429){
        toast.error("Slow down! You're creating notes too fast",{
          duration:2000
        } )
    }}} else {
        const email=formData.email;
      const password=formData.password;
      try {
     const res= await api.post("/users/login",
        { email,password});
        if (res.data && res.data.user.id) {
    toast.success("User login Successfully 🎉");

    // Save immediately
    localStorage.setItem("id", res.data.user.id);

    // Then navigate
    navigate("/home");
  } else {
    toast.error("Login failed: user id missing");
  }
    } catch (error) {
        console.log(error);
        if(error.response?.status==400){
          toast.error("Invalid credentials")
        }
      if(error.response?.status==429){
        toast.error("Slow down! You're creating notes too fast",{
          duration:2000
        } )
    }}
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="link link-primary"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
