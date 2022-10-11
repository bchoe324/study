import { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState(0);
  const [selCoin, setSelCoin] = useState({});
  const onChange = (event) => setUsd(event.target.value);
  const onSelect = (event) => {
    if (event.target.value === "select") {
      return;
    }
    setSelCoin(coins.find((coin) => coin.name === event.target.value));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=100")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          <option value="select">Select Coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.name}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      {/* () => { return [returnValue] } */}
      {/* () => returnValue */}
      <hr />
      <h2>USD to Coin</h2>
      <input value={usd} onChange={onChange} type="number" /> USD =
      <input
        value={
          Object.keys(selCoin).length !== 0
            ? Math.floor(usd / selCoin.quotes.USD.price)
            : ""
        }
        onChange={() => {
          onChange();
          onSelect();
        }}
        type="number"
        disabled
      />{" "}
      <span onChange={onSelect}>
        {Object.keys(selCoin).lenght !== 0 ? selCoin.symbol : ""}
      </span>
    </div>
  );
}

export default CoinTracker;
