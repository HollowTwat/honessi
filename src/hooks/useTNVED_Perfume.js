import { useState, useEffect } from 'react';

const useTNVED_p = (type) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type) {
        const url = 'https://honessi-production.up.railway.app/api/TelegramHonessy/TestPost?input=test'

        const response = await fetch(url, {
            method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
        });
        const data = await response.text()
        const strippedData = data.replace(/"/g, '');
        setHsCode(strippedData);
      }
    };

    fetchHsCode();
  }
  , [type]);

  return hsCode;
};

export default useTNVED_p;
