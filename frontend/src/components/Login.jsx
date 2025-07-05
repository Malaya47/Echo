import React from "react";

const Login = () => {
  return (
    <div className="mt-4">
      <section className="text-center mb-5">
        <h2 className="text-3xl">Welcome to Echo!</h2>
      </section>

      <section className="flex justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </section>
    </div>
  );
};

export default Login;
