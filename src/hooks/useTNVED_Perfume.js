import { useState, useEffect } from 'react';

const useTNVED_p = (type) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type) {
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=${type}`;

        try {
          const response = await fetch(url, {
            method: "POST", // Ensure the API accepts POST with query params
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.text();
          const strippedData = data.replace(/"/g, '');
          setHsCode(strippedData);
        } catch (error) {
          console.error("Error fetching HS Code:", error);
          // Fallback to type if the request fails
          setHsCode(error);
        }
      }
    };

    fetchHsCode();
  }, [type]);

  return hsCode;
};

export default useTNVED_p;
