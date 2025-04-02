import { useState, useEffect } from "react";
import "./App.css"; // 스타일 적용을 위한 CSS 파일

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState(1);
  
  useEffect(() => {
    // 데이터 로딩 시 로딩 상태 표시
    setLoading(true);
    
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        // 데이터를 가격 기준으로 정렬 (선택사항)
        const sortedCoins = json.sort((a, b) => 
          b.quotes.USD.price - a.quotes.USD.price
        );
        setCoins(sortedCoins);
        setLoading(false);
        // 첫 번째 코인을 기본값으로 설정
        if (sortedCoins.length > 0) {
          setSelectedCoin(sortedCoins[0]);
        }
      })
      .catch(error => {
        console.error("코인 데이터를 가져오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, []);

  const handleCoinChange = (event) => {
    const coinId = event.target.value;
    const selected = coins.find(coin => coin.id === coinId);
    setSelectedCoin(selected);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="coin-app">
      <header className="app-header">
        <h1>코인 시세 조회  {loading ? "" : `(${coins.length})`}</h1>
      </header>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>코인 정보를 불러오는 중입니다...</p>
        </div>
      ) : (
        <div className="content">
          <div className="select-container">
            <label htmlFor="coin-select">코인 선택:</label>
            <select 
              id="coin-select"
              onChange={handleCoinChange}
              value={selectedCoin?.id || ""}
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>

          {selectedCoin && (
            <div className="coin-details">
              <div className="coin-info">
                <h2>{selectedCoin.name} ({selectedCoin.symbol})</h2>
                <p className="price">현재 가격: ${selectedCoin.quotes.USD.price.toFixed(6)} USD</p>
                <p>시가총액: ${selectedCoin.quotes.USD.market_cap.toLocaleString()} USD</p>
                <p className={`change ${selectedCoin.quotes.USD.percent_change_24h >= 0 ? 'positive' : 'negative'}`}>
                  24시간 변동: {selectedCoin.quotes.USD.percent_change_24h}%
                </p>
              </div>

              <div className="converter">
                <h3>변환 계산</h3>
                <div className="converter-inputs">
                  <div>
                    <label htmlFor="usd-amount">USD 금액:</label>
                    <input
                      id="usd-amount"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      min="0"
                    />
                  </div>
                  <div className="equal">=</div>
                  <div>
                    <label>{selectedCoin.symbol} 개수:</label>
                    <input
                      type="text"
                      value={(amount / selectedCoin.quotes.USD.price).toFixed(6)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="coin-list">
            <h3>상위 5개 코인</h3>
            <table>
              <thead>
                <tr>
                  <th>코인</th>
                  <th>기호</th>
                  <th>가격 (USD)</th>
                  <th>24시간 변동</th>
                </tr>
              </thead>
              <tbody>
                {coins.slice(0, 5).map((coin) => (
                  <tr key={coin.id}>
                    <td>{coin.name}</td>
                    <td>{coin.symbol}</td>
                    <td>${coin.quotes.USD.price.toFixed(2)}</td>
                    <td className={coin.quotes.USD.percent_change_24h >= 0 ? 'positive' : 'negative'}>
                      {coin.quotes.USD.percent_change_24h}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <footer>
        <p>데이터 제공: Coinpaprika API</p>
      </footer>
    </div>
  );
}

export default App;