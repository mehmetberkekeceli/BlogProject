import React, { useEffect, useState } from "react";
import axios from "axios";

const BinanceAPIExample = () => {
  const [btcusdtPrice, setBtcusdtPrice] = useState(null);

  useEffect(() => {
    const getBtcusdtPrice = async () => {
      const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
      );
      setBtcusdtPrice(response.data.price);
    };
    getBtcusdtPrice();
  }, []);

  return (
    <div>
      {btcusdtPrice ? (
        <p>Canlı BTC/USDT fiyatı: {btcusdtPrice}</p>
      ) : (
        <p>Fiyat yükleniyor...</p>
      )}
    </div>
  );
};

export default BinanceAPIExample;