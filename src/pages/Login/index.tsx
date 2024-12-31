import React from "react";
import { useForm } from "react-hook-form";

const LoginPage: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`form-input ${errors.email ? "has-error" : ""}`}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`form-input ${errors.password ? "has-error" : ""}`}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
