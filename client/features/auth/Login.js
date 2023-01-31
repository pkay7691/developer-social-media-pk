import React, { useState } from "react";
import {
  Button,
  TextField,
  ButtonGroup,
  Stack,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import theme from "../../app/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../app/store";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      method: "login",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(authenticate(values, "login")).then((res) => {
        console.log(res);
        if (res.payload) {
          setError(res.payload);
        } else {
          navigate("/");
        }
      });
    },
  });

  return (
    <Stack
      as="form"
      spacing="1rem"
      width={{ base: "90%", md: "500px" }}
      margin="auto"
      height="100vh"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h4" align="center" color="primary">
        Login
      </Typography>

      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>

      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <ButtonGroup>
        <Button theme={theme} color="primary" variant="outlined" type="submit">
          Login
        </Button>
        <Button
          theme={theme}
          color="secondary"
          variant="contained"
          type="submit"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default Login;
