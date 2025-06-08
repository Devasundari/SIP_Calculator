import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import welcomeImage from "/assets/welcome.png"; // Adjust the path to your image
import { useNavigate } from "react-router-dom";

const Home = () => {
const navigate = useNavigate(); // Use navigate to programmatically navigate to the path

  const handleNavigate = (path) => {
    navigate(path); // Use navigate to programmatically navigate to the path
  }

  return (
    <Box sx={{ flexGrow: 1, padding: "80px 40px " }}>
      <Grid container spacing={5} alignItems="center">
        {/* Left Section: Text Content */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" component="h2" gutterBottom sx={{fontSize:'45px', color: "#0c304d"}}>
            Welcome to CalcMySip.com!
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontSize :'20px',color: "Black",textAlign:'center'}}>  
            Start by knowing how much to invest. 
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontSize :'20px',color: "Black",textAlign:'center'}}>
          Try calcmysip.com – your reliable SIP calculator.
          </Typography>
          <Box sx={{ marginTop: "20px" ,alignItems:'center',display:'flex',justifyContent:'center'}}>
            {/* Buttons for navigation */}
            <Button
              variant="contained"
              sx={{ backgroundColor: "#96ecff", color: "#0c304d",borderRadius:'20px', marginRight: "10px",fontFamily:"unset",fontSize:'17px' }}
              onClick={() => handleNavigate('/Register')}
            >
              Get Started
            </Button>
            <Button 
            variant="outlined"
              sx={{ backgroundColor: "none", color: "#0c304d",borderRadius:'20px', marginRight: "10px",fontFamily:"unset",fontSize:'17px' }}
              onClick={()=> handleNavigate('/Login')}
            >
            Sign up for SeedInvest
            </Button>
          </Box>
        </Grid>

        {/* Right Section: Image */}
        <Grid item xs={12} md={7}>
          <img
            src={welcomeImage}
            alt="Welcome to InvestWise"
            style={{ width: "100%", maxWidth: "650px", borderRadius: "8px",border:"solid" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;