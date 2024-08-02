import React from "react";
import "./Login.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { login } from "../../../services/userServices";

//Yup Schema Validation
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const Login = () => {
  const location = useLocation();
  console.log("Login location", location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await login(data);
      const { state } = location;
      window.location = state ? state.from : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="login_form">
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
            Login
          </Typography>
          <TextField
            name="email"
            {...register("email")}
            placeholder="Email"
            variant="outlined"
            type="email"
            label="Email"
          />
          <p>{errors.email?.message}</p>

          <TextField
            name="password"
            {...register("password")}
            placeholder="Password"
            variant="outlined"
            type="password"
            label="Password"
          />
          <p>{errors.password?.message}</p>
          <Button
            sx={{ borderRadius: 3 }}
            type="submit"
            variant="contained"
            color="warning"
          >
            Sign-In
          </Button>

          <Button sx={{ marginTop: 3 }} href="/register" endIcon={<SendIcon />}>
            Don't have an Account? Register Here
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
