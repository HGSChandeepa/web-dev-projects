import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  // the states for the feilds
  const [date, Setdate] = useState();
  const [sourceCurrency, setsourceCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);

  //onsubmit
  const getTheTargetAmount = async (event) => {
    console.log(date, sourceCurrency, targetCurrency, amountInSourceCurrency);
    event.preventDefault();

    //send the data
    try {
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      const { amountInTargetCurrency } = responce.data;
      setamountInTargetCurrency(amountInTargetCurrency);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={getTheTargetAmount}>
        <div>
          <label htmlFor={date}>Date</label>
          <input
            required
            onChange={(e) => Setdate(e.target.value)}
            type="date"
            name={date}
            id={date}
          />
        </div>

        <div>
          <label htmlFor={sourceCurrency}>Source Currency</label>
          <input
            required
            onChange={(e) => setsourceCurrency(e.target.value.toUpperCase())}
            type="text"
            name={sourceCurrency}
            id={sourceCurrency}
          />
        </div>

        <div>
          <label htmlFor={targetCurrency}>Target Currency</label>
          <input
            required
            onChange={(e) => settargetCurrency(e.target.value.toUpperCase())}
            type="text"
            name={targetCurrency}
            id={targetCurrency}
          />
        </div>
        <div>
          <label htmlFor={amountInSourceCurrency}>
            Amount in source currency
          </label>
          <input
            required
            onChange={(e) => setamountInSourceCurrency(e.target.value)}
            type="number"
            name={amountInSourceCurrency}
            id={amountInSourceCurrency}
          />
        </div>

        <button>Get the target Curreny</button>
      </form>
      <h3>{amountInTargetCurrency}</h3>
    </div>
  );
}

export default App;
