const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=5c1ca022aae046d39992f94bd487b4d6`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Check the data is valid
    if (!data || response.status !== 200) {
      throw new Error("Unable to fetch exchange rates");
    }

    const rates = data.rates;

    // Check if the entered sourceCurrency and targetCurrency are available
    if (
      !rates.hasOwnProperty(sourceCurrency) ||
      !rates.hasOwnProperty(targetCurrency)
    ) {
      throw new Error(
        "The entered sourceCurrency and targetCurrency are not available"
      );
    }

    // Perform the conversion
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetValue = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json({ amountInTargetCurrency: targetValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Port
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
