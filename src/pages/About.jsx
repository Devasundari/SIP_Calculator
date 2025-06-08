import React from "react";
import { Box, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "40px 20px" }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#0c304d",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <strong>About CalcMySIP.com</strong>
      </Typography>

      {/* About Content */}
      <Box sx={{ lineHeight: "1.8", color: "#0c304d" }}>
        <Typography variant="body1" gutterBottom>
          At <strong>CalcMySIP.com</strong>, we believe financial planning should start with clarity — not complexity.
          That’s why we’ve built a simple, no-fuss SIP Calculator to help you get started on your investment planning journey.
        </Typography>
        <Typography variant="body1" gutterBottom>
          A <strong>Systematic Investment Plan (SIP)</strong> allows you to invest a fixed amount regularly into mutual funds.
          It’s a smart and disciplined way to build long-term wealth. But before you invest, it’s important to understand how much to invest and what to expect in return —
          and that’s exactly where <strong>CalcMySIP.com</strong> comes in.
        </Typography>
        <Typography variant="body1" gutterBottom>
          With our intuitive SIP calculator, you can:
        </Typography>

        {/* List of Benefits */}
        <Box component="ul" sx={{ paddingLeft: "20px", marginBottom: "20px" }}>
          <Typography component="li" variant="body1" gutterBottom>
            Estimate the future value of your monthly investments
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            Visualize how your money grows over time
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            Plan your financial goals with confidence
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            See the power of consistency in building wealth
          </Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          Whether you’re a student starting early, a young professional building your future, or someone planning ahead for retirement —
          <strong> CalcMySIP.com</strong> helps you make informed, goal-based decisions with ease.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>No signups. No distractions. Just simple, smart SIP calculations.</strong>
        </Typography>

        {/* How It Works */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mt: 4 }}>
          How It Works
        </Typography>

        <Typography variant="body1" gutterBottom>
          Using <strong>CalcMySIP.com</strong> is as easy as 1-2-3:
        </Typography>

        <Box component="ol" sx={{ paddingLeft: "20px", marginBottom: "20px" }}>
          <Typography component="li" variant="body1" gutterBottom>
            <strong>Enter Monthly Investment</strong> – How much would you like to invest every month?
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            <strong>Select Investment Duration</strong> – Choose the number of years you plan to stay invested.
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            <strong>Set Expected Return Rate</strong> – Input the average annual return rate (typically 10–15% for mutual funds).
          </Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          💡 <em>Our calculator instantly shows you the estimated maturity amount and the total wealth you could build over time.</em>
        </Typography>

        <Typography variant="body1" gutterBottom>
          That’s it — no complex forms, no financial jargon. Just a quick and easy way to plan your SIP investment.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
