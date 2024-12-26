import { useState, useEffect } from 'react';

const useTNVED_p = (type) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type) {
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/TestPost?input=${type}`;

        try {
          const response = await fetch(url, {
            method: "POST", // Ensure the method matches the API
            headers: {
              "Accept": "*/*", // As seen in the Swagger documentation
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
          setHsCode(response.status);
        }
      }
    };

    fetchHsCode();
  }, [type]);

  return hsCode;
};

export default useTNVED_p;
