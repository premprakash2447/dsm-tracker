import React from "react";
import "./Registration.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signup } from "../../../services/userServices";

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
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await signup(data);

      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.response.data.message);
      }
    }
  };

  return (
    <div className="reg_form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            Register
          </Typography>
          <TextField
            margin="normal"
            name="name"
            {...register("name")}
            placeholder="Enter your name"
            variant="outlined"
            type="text"
            label="Name"
          />
          {errors.name && <em className="form_error">{errors.name.message}</em>}
          <TextField
            margin="normal"
            name="email"
            {...register("email")}
            placeholder="Enter your email"
            variant="outlined"
            type="email"
            label="Email"
          />
          {errors.email && (
            <em className="form_error">{errors.email.message}</em>
          )}
          <TextField
            margin="normal"
            name="password"
            {...register("password")}
            placeholder="Enter your password"
            variant="outlined"
            type="password"
            label="Password"
          />
          {errors.password && (
            <em className="form_error">{errors.password.message}</em>
          )}
          <TextField
            margin="normal"
            name="cpassword"
            {...register("confirmPassword")}
            placeholder="Enter confirm password"
            variant="outlined"
            type="password"
            label="Confirm Password"
          />
          {errors.confirmPassword && (
            <em className="form_error">{errors.confirmPassword.message}</em>
          )}
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
          <Button sx={{ marginTop: 3 }} href="/login">
            Back to Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Registration;
