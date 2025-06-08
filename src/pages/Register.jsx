// src/components/Register.js
import React, { useState } from 'react';
import { useUser } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // updated import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { name, setName, email, setEmail, password, setPassword } = useUser();
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email.includes("@") || !email.includes(".")) return false;
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) return false;
    let hasUpper = false;
    let hasLower = false;
    let hasDigit = false;
    let hasSpecial = false;

    for (let char of password) {
      if (char >= 'A' && char <= 'Z') hasUpper = true;
      else if (char >= 'a' && char <= 'z') hasLower = true;
      else if (char >= '0' && char <= '9') hasDigit = true;
      else if (char === '@' || char === '_' || char === '$') hasSpecial = true;
    }

    return hasUpper && hasLower && hasDigit && hasSpecial;
  };

  const handleEmailBlur = () => {
    setEmailError(!validateEmail(email));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setRepeatPasswordError(password !== repeatPassword);

    if (!name || !email || !password || !repeatPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isEmailValid || !isPasswordValid || password !== repeatPassword) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful!");
      navigate('/login');
    } catch (error) {
      toast.error("Error during registration: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Optional: Update context
      setName(user.displayName || "");
      setEmail(user.email || "");

      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed: " + error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Paper elevation={3} sx={{ padding: 3, width: "400px", margin: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Register!
        </Typography>
        <Typography variant="body2" gutterBottom>
          Kindly fill this form to register...
        </Typography>

        <form onSubmit={handleRegister} noValidate>
          <TextField
            required
            fullWidth
            margin="normal"
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            required
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            error={emailError}
            helperText={emailError ? "Please enter a valid email address." : ""}
            autoComplete="off"
          />

          <TextField
            required
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            onBlur={() => setPasswordError(!validatePassword(password))}
            helperText={
              passwordError
                ? "Password must be 8-16 chars with uppercase, lowercase, digit and @ _ $"
                : ""
            }
            autoComplete="new-password"
          />

          <TextField
            required
            fullWidth
            margin="normal"
            type="password"
            label="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            error={repeatPasswordError}
            helperText={repeatPasswordError ? "Passwords do not match." : ""}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
         <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            OR    
          </Typography>
          {/* Google Sign-Up Button */}
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleGoogleSignUp}
          >
            Sign up with Google
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </form>
      </Paper>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default Register;
