import "./App.css";
import { useState } from "react";

function App() {
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [date, setDate] = useState();
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);

  // get target currency
  const getTargetCurrency = async (event) => {
    console.log(sourceCurrency);
    event.preventDefault();
    // api url
    const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=5c1ca022aae046d39992f94bd487b4d6`;

    // fetch data
    try {
      const responce = await fetch(url);
      const data = await responce.json();
      const rates = data.rates;

      if (
        !rates.hasOwnProperty(sourceCurrency) ||
        !rates.hasOwnProperty(targetCurrency)
      ) {
        throw new Error("Invalid source or target currency");
      }

      //convet the ccorrency
      const sourceRate = rates[sourceCurrency];
      const targetRate = rates[targetCurrency];

      const convertedAmount =
        (targetRate / sourceRate) * amountInSourceCurrency;

      setAmountInTargetCurrency(convertedAmount.toFixed(2));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={getTargetCurrency}>
        <div>
          <label htmlFor={sourceCurrency}>sourceCurrency</label>
          <input
            required
            onChange={(event) =>
              setSourceCurrency(event.target.value.toUpperCase())
            }
            type="text"
            name={sourceCurrency}
            id={sourceCurrency}
          />
        </div>

        <div>
          <label htmlFor={targetCurrency}>targetCurrency</label>
          <input
            required
            onChange={(event) => {
              setTargetCurrency(event.target.value.toUpperCase());
            }}
            type="text"
            name={targetCurrency}
            id={targetCurrency}
          />
        </div>
        <div>
          <label htmlFor={amountInSourceCurrency}>amountInSourceCurrency</label>
          <input
            required
            onChange={(event) => {
              setAmountInSourceCurrency(event.target.value);
            }}
            type="number"
            name={amountInSourceCurrency}
            id={amountInSourceCurrency}
          />
        </div>
        <div>
          <label htmlFor={date}>Date</label>
          <input
            required
            onChange={(event) => setDate(event.target.value)}
            type="date"
            name={date}
            id={date}
          />
        </div>

        <button>amountInTargetCurrency</button>
      </form>
      {/* answer */}
      <h3>{amountInTargetCurrency}</h3>
    </div>
  );
}

export default App;
