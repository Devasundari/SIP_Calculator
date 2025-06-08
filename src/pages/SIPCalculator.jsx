import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  TextField,
  MenuItem,
  Button,
  FormControl,
  Grid,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SIPCalculator = () => {
  const [duration, setDuration] = useState(1); // Duration in years
  const [regularAmount, setRegularAmount] = useState(1000);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [rate, setRate] = useState(12);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturn, setEstimatedReturn] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);

  function handleCalculate(e) {
    e.preventDefault();

    const P = parseFloat(regularAmount);
    const n = parseInt(duration); // Duration in years
    const annualRate = parseFloat(rate);

    let frequencyPerYear;
    if (paymentFrequency === "monthly") frequencyPerYear = 12;
    else if (paymentFrequency === "quarterly") frequencyPerYear = 4;
    else frequencyPerYear = 1; // yearly

    const r = annualRate / 100 / frequencyPerYear;
    const totalPeriods = n * frequencyPerYear; // Total periods based on years

    // SIP Future Value formula
    const fv = P * ((Math.pow(1 + r, totalPeriods) - 1) / r) * (1 + r);

    const investedAmount = P * totalPeriods;
    const returns = fv - investedAmount;

    setMaturityAmount(fv.toFixed(2));
    setTotalInvestment(investedAmount.toFixed(2));
    setEstimatedReturn(returns.toFixed(2));
  }

  const pieData = {
    labels: ["Total Investment", "Estimated Return"],
    datasets: [
      {
        data: [
          totalInvestment || 1000, // Default value if input is empty
          estimatedReturn || 500, // Default value if input is empty
        ],
        backgroundColor: ["#4caf50", "#ff9800"],
        hoverBackgroundColor: ["#388e3c", "#f57c00"],
      },
    ],
  };

  return (
    <Box sx={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0c304d", textAlign: "center" }}
      >
        SIP Calculator
      </Typography>

      <Grid container spacing={4} columns={12}>
        {/* Input Fields */}
        <Grid
          sx={{
            gridColumn: { xs: "1 / -1", md: "1 / 7" }, // Full width on small screens, half width on medium+
          }}
        >
          <Box component="form" noValidate autoComplete="off">
            {/* Duration in Years */}
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                Duration (in years)
              </Typography>
              <Slider
                value={duration}
                onChange={(e, value) => setDuration(value)}
                aria-label="Duration Slider"
                valueLabelDisplay="auto"
                min={1}
                max={30} // Maximum duration in years
                sx={{ marginTop: "10px" }}
              />
              <Typography variant="body2" sx={{ marginTop: "10px" }}>
                Selected Duration: {duration} years
              </Typography>
            </FormControl>

            {/* Regular Amount */}
            <TextField
              fullWidth
              label="Regular Amount (₹)"
              type="number"
              value={regularAmount}
              onChange={(e) => setRegularAmount(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />

            {/* Payment Frequency */}
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                select
                label="Payment Frequency"
                value={paymentFrequency}
                onChange={(e) => setPaymentFrequency(e.target.value)}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </TextField>
            </FormControl>

            {/* Rate of Return */}
            <TextField
              fullWidth
              label="Rate of Return (% per year)"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />

            {/* Calculate Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCalculate}
              sx={{ padding: "10px", fontWeight: "bold" }}
            >
              Calculate
            </Button>
          </Box>
        </Grid>

        {/* Results */}
        <Grid
          sx={{
            gridColumn: { xs: "1 / -1", md: "7 / -1" }, // Full width on small screens, half width on medium+
          }}
        >
          <Box
            sx={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#0c304d" }}
            >
              Results
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Total Invested Amount:</strong> ₹{totalInvestment || 1000}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Estimated Return:</strong> ₹{estimatedReturn || 500}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Maturity Amount:</strong> ₹{maturityAmount || 1500}
            </Typography>

            {/* Pie Chart */}
            <Box sx={{ marginTop: "20px" }}>
              <Pie data={pieData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SIPCalculator;