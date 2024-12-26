import { useState, useEffect } from 'react';

const useTNVED_p = (type) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type) {
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=${type}`;

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Accept": "*/*", // As seen in the Swagger documentation
            },
          });

          if (!response.ok) {
            // Set hsCode with response status when the response is not ok
            setHsCode(`Error: (Status: ${response.status})`);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.text();
          if (!data) {
            throw new Error("Empty response from server");
          }
          const strippedData = data.replace(/"/g, '');
          setHsCode(strippedData);
        } catch (error) {
          console.error("Error fetching HS Code:", error);
          // Fallback to type with status 500
          setHsCode(error);
        }
      }
    };

    fetchHsCode();
  }, [type]);

  return hsCode;
};

export default useTNVED_p;
