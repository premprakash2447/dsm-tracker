import React from "react";
import "./Registration.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Yup Schema Validation
const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmPassword: yup
    .string()
    .required("No password provided.")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //handling submission data, like sending it to an api etc
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="reg_form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="form_text_input"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && <em className="form_error">{errors.name.message}</em>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form_text_input"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <em className="form_error">{errors.email.message}</em>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form_text_input"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <em className="form_error">{errors.password.message}</em>
          )}
        </div>

        <div>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            id="cpassword"
            className="form_text_input"
            type="password"
            placeholder="Enter confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <em className="form_error">{errors.confirmPassword.message}</em>
          )}
        </div>
        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
