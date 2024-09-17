import { useState, useEffect } from 'react';

const useTNVED_s = (type, materials, sex) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type && materials && sex) {
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=${type},${materials},${sex}`

        // Simulate a delay to mimic an API call
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
        setHsCode(strippedData); // Static value for debugging // Static value for debugging
      }
    };

    fetchHsCode();
  }
  , [type, materials, sex]);

  return hsCode;
};

export default useTNVED_s;
