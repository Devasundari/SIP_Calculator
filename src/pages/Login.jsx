// src/components/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Login successful!");
      navigate("/sip-calculator");
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate("/sip-calculator");
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 380, margin: "auto", mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Login!
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            required
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login with Google"}
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginForm;
